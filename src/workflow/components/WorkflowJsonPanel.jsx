import React, { useState } from "react";

export default function WorkflowJsonPanel({ workflowJson }) {
  const [copied, setCopied] = useState(false);

  const jsonText = JSON.stringify(workflowJson, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback – you can add better error handling if needed
      alert("Could not copy JSON to clipboard.");
    }
  };

  return (
    <div
      className="workflow-json-panel"
      style={{
        flex: 1,
        minWidth: 0,
        borderLeft: "1px solid #e5e7eb",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Workflow JSON</div>
          <div style={{ fontSize: 11, color: "#6b7280" }}>
            Backend-ready definition
          </div>
        </div>

        <button
          onClick={handleCopy}
          style={{
            fontSize: 11,
            padding: "4px 8px",
            borderRadius: 4,
            border: "1px solid #9ca3af",
            background: "#ffffff",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied ✔" : "Copy JSON"}
        </button>
      </div>

      <pre
        style={{
          flex: 1,
          margin: 0,
          padding: "8px 12px",
          fontSize: 11,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
          overflow: "auto",
          whiteSpace: "pre",
        }}
      >
        {jsonText}
      </pre>
    </div>
  );
}
