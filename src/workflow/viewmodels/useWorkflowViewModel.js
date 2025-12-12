import { useState, useCallback, useMemo } from "react";
import { addEdge, useEdgesState, useNodesState, MarkerType } from "reactflow";
import { nodeTypes } from "../components/WorkflowNode";

const initialNodes = [
  {
    id: "1",
    type: "workflowNode",
    position: { x: 50, y: 10 },
    data: {
      label: "When a critical event occurred",
      action: "trigger_critical_event", // backend-friendly key
    },
  },
];

const initialEdges = [];

const nodeTypeOptions = [
  // Communication
  { value: "send_email", label: "Send Email" },
  { value: "send_sms", label: "Send SMS" },
  { value: "send_push", label: "Send Push Notification" },
  { value: "send_slack", label: "Send Slack Message" },
  { value: "send_whatsapp", label: "Send WhatsApp Message" },

  // Incident / Ticketing
  { value: "create_incident", label: "Create Incident" },
  { value: "update_ticket", label: "Update Ticket" },
  { value: "assign_engineer", label: "Assign Engineer" },

  // Logic
  { value: "wait", label: "Wait / Delay" },
  { value: "condition", label: "Condition (IF / ELSE)" },
];

function buildWorkflowJson(nodes, edges) {
  if (!nodes.length) {
    return {
      name: "Empty workflow",
      trigger: null,
      steps: [],
    };
  }

  // map: nodeId -> node
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // incoming edges count per node
  const incomingCount = new Map();
  nodes.forEach((n) => incomingCount.set(n.id, 0));
  edges.forEach((e) => {
    if (incomingCount.has(e.target)) {
      incomingCount.set(e.target, incomingCount.get(e.target) + 1);
    }
  });

  // trigger = node with no incoming edges (fallback to first)
  let triggerNode =
    nodes.find((n) => incomingCount.get(n.id) === 0) ?? nodes[0];

  // adjacency: nodeId -> [nextIds]
  const nextMap = new Map();
  nodes.forEach((n) => nextMap.set(n.id, []));
  edges.forEach((e) => {
    if (nextMap.has(e.source)) {
      nextMap.get(e.source).push(e.target);
    }
  });

  const trigger = {
    id: triggerNode.id,
    label: triggerNode.data?.label ?? "",
    action: triggerNode.data?.action ?? null,
    next: nextMap.get(triggerNode.id) ?? [],
  };

  const steps = nodes
    .filter((n) => n.id !== triggerNode.id)
    .map((n) => ({
      id: n.id,
      label: n.data?.label ?? "",
      action: n.data?.action ?? null,
      next: nextMap.get(n.id) ?? [],
    }));

  return {
    name: "Critical incident workflow",
    trigger,
    steps,
  };
}

export function useWorkflowViewModel() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [nodeCounter, setNodeCounter] = useState(2);
  const [selectedType, setSelectedType] = useState("");

  const handleAddNode = () => {
    if (!selectedType) return;

    const option = nodeTypeOptions.find((o) => o.value === selectedType);

    const label = option?.label ?? selectedType;

    const newNode = {
      id: `${nodeCounter}`,
      type: "workflowNode",
      position: {
        x: 200 + (nodeCounter - 2) * 80,
        y: 150 + (nodeCounter % 2) * 80,
      },
      data: {
        label,
        action: selectedType, // backend key
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeCounter((c) => c + 1);
  };

  const handleReset = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setNodeCounter(2);
    setSelectedType("");
  };

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const workflowJson = useMemo(
    () => buildWorkflowJson(nodes, edges),
    [nodes, edges]
  );

  return {
    // ReactFlow graph state
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    nodeTypes,
    defaultViewport: { x: 0, y: 0, zoom: 1 },

    // JSON representation
    workflowJson,

    // Toolbar VM stuff
    toolbar: {
      selectedType,
      setSelectedType,
      handleAddNode,
      handleReset,
      nodeTypeOptions,
    },
  };
}
