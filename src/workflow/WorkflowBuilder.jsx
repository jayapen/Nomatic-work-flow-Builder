import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowViewModel } from "./viewModels/useWorkflowViewModel";
import WorkflowToolbar from "./components/WorkflowToolbar";
import WorkflowJsonPanel from "./components/WorkflowJsonPanel";

export default function WorkflowBuilder() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    nodeTypes,
    defaultViewport,
    toolbar,
    workflowJson,
  } = useWorkflowViewModel();

  return (
    <div
      className="workflow-root"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <WorkflowToolbar
        selectedType={toolbar.selectedType}
        onSelectedTypeChange={toolbar.setSelectedType}
        onAddNode={toolbar.handleAddNode}
        onReset={toolbar.handleReset}
        options={toolbar.nodeTypeOptions}
      />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
        }}
      >
        <div
          className="canvas"
          style={{
            flex: 2,
            minHeight: 0,
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            defaultViewport={defaultViewport}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        <WorkflowJsonPanel workflowJson={workflowJson} />
      </div>
    </div>
  );
}
