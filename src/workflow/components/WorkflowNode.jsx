import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const defaultNodeStyle = {
  borderRadius: 8,
  padding: 10,
  background: "#ffffff",
  border: "1px solid #999",
  fontSize: 12,
  position: "relative",
};

export function WorkflowNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const handleDelete = (event) => {
    event.stopPropagation();
    setNodes((nodes) => nodes.filter((n) => n.id !== id));
  };

  return (
    <div
      style={{
        ...defaultNodeStyle,
        border: selected ? "2px solid #2563eb" : defaultNodeStyle.border,
        boxShadow: selected
          ? "0 0 4px rgba(37,99,235,0.6)"
          : "0 1px 2px rgba(0,0,0,0.15)",
        minWidth: 120,
      }}
    >
      {/* Handles for connections */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      {/* Delete bin button */}
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "none",
          background: "#ef4444",
          color: "#fff",
          cursor: "pointer",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Delete node"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="white"
        >
          <path d="M3 6h18v2H3V6zm2 3h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm5 2v8h2v-8H10zm4 0v8h2v-8h-2zM9 4h6l1 1h5v2H3V5h5l1-1z" />
        </svg>
      </button>

      <div>{data.label}</div>
    </div>
  );
}

// Export nodeTypes so the VM can reuse it
export const nodeTypes = {
  workflowNode: WorkflowNode,
};
