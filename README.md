# Workflow Builder & Simulator

A **visual workflow automation builder** built using **React, Next.js, TypeScript & React Flow**.  
Create workflows using drag-and-drop nodes, configure steps, simulate execution & export/import JSON.

---

## Key Features

- **Visual Canvas** – Drag & drop workflow creation using React Flow
- **5 Node Types** – Start, Task, Approval, Automated, End
- **Dynamic Forms** – Auto-render inputs based on node type with validation
- **Workflow Simulation** – Step-by-step workflow execution UI
- **Import/Export JSON** – Save workflows & load anytime
- **Mock API Integrated** – Automation + simulation endpoints
- **Type Safe** – Fully written in TypeScript
- **Clean & Scalable Architecture**

---

## Architecture Highlights

- Separation of UI, logic & workflow engine
- Reusable component system under `/common`
- Custom hooks for workflow + API control
- TypeScript interfaces for strict data contracts
- Scalable node architecture (easy to add new nodes)
- Consistent & maintainable file structure

---

## Folder Structure

root/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── src/
├── app/
│ ├── page.tsx # Main UI entry screen
│ └── api/
│ ├── automations/route.ts # API route for automation operations
│ └── simulate/route.ts # API route for workflow simulation
│
├── components/ # Reusable UI components
│ ├── Canvas.tsx # Main workflow canvas area
│ ├── SidebarPalette.tsx # Node palette on left side
│ ├── NodeFormPanel.tsx # Right panel dynamic form for nodes
│ └── SimulatorPanel.tsx # Workflow execution simulator UI
│
├── nodes/ # Node components for workflow builder
│ ├── StartNode.tsx
│ ├── TaskNode.tsx
│ ├── ApprovalNode.tsx
│ ├── AutomatedNode.tsx
│ └── EndNode.tsx
│
├── common/ # Shared small UI elements
│ ├── Input.tsx # { label,value,onChange,placeholder,required?,type }
│ ├── KeyValueList.tsx # { items,onChange,label }
│ ├── Card.tsx # { children,className }
│ ├── Checkbox.tsx # { label,checked,onChange }
│ ├── RightDrawer.tsx # { open,onClose,children,width?="350px" }
│ ├── Select.tsx # { label,value,onChange,options,required? }
│ └── TextArea.tsx # { label,value,onChange,placeholder,rows }
│
├── hooks/
│ ├── useWorkflow.ts # Handles workflow builder state logic
│ └── useApi.ts # Generic API helper hook
│
├── lib/
│ └── simulateEngine.ts # Core workflow simulation logic
│
├── types/
│ └── workflow.ts # TypeScript models/interfaces
│
└── styles/
└── globals.css
