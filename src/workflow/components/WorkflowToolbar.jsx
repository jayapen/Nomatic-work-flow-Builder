import React from "react";

export default function WorkflowToolbar({
  selectedType,
  onSelectedTypeChange,
  onAddNode,
  onReset,
  options,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <span className="toolbar-title">Nomatic Workflow Builder</span>
        <span className="toolbar-subtitle">
          Drag nodes, connect them, and design your incident workflow.
        </span>
      </div>

      <div className="toolbar-right">
        <select
          className="toolbar-select"
          value={selectedType}
          onChange={(e) => onSelectedTypeChange(e.target.value)}
        >
          <option value="">+ Add step...</option>
          {options.map((n) => (
            <option key={n.value} value={n.value}>
              {n.label}
            </option>
          ))}
        </select>

        <button className="toolbar-button" onClick={onAddNode}>
          Add Node
        </button>

        <button className="toolbar-button secondary" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
