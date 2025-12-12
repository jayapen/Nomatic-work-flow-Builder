# Nomatic Workflow Builder

Nomatic Workflow Builder is a visual workflow designer built with **React**, **Vite**, and **React Flow**, following a **ViewModel architecture**.

It lets you:

- Visually design workflows on a canvas using nodes and connections.
- Represent workflows as a **backend-ready JSON definition**.
- Copy this JSON and use it as the **contract for a future workflow engine**.

> ⚠️ **Note:** The backend workflow engine is **not implemented yet**.  
> This project currently focuses on the **frontend designer** and the **shape of the JSON** that a backend engine can later interpret and execute.

---

## 🎯 Goals

- Provide a simple and intuitive UI to design workflows.
- Generate a **clear, stable JSON format** that describes:
  - Trigger
  - Steps
  - Execution order (via `next` links)
- Keep the core architecture modular so:
  - The workflow builder UI can evolve independently.
  - A backend execution engine can be added later without breaking the contract.

---

## 🧱 High-Level Architecture

The app is structured into:

- `workflow/WorkflowBuilder.jsx` – Composition root for the workflow UI.
- `workflow/viewModels/useWorkflowViewModel.js` – ViewModel hook controlling state and behavior.
- `workflow/components/` – Presentation components:
  - `WorkflowNode.jsx` – Custom node with delete capabilities.
  - `WorkflowToolbar.jsx` – Top control bar (add/reset steps).
  - `WorkflowJsonPanel.jsx` – Right-side panel showing generated JSON + copy button.

```text
src/
  App.jsx
  index.css
  workflow/
    WorkflowBuilder.jsx
    /viewModels
      useWorkflowViewModel.js
    /components
      WorkflowNode.jsx
      WorkflowToolbar.jsx
      WorkflowJsonPanel.jsx
