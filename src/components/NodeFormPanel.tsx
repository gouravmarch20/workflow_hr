import React from "react";
import { WorkflowNode, AutomationAction, MetadataItem } from "@/types/workflow";
import { Input } from "./common/Input";
import { TextArea } from "./common/TextArea";
import { Select } from "./common/Select";
import { Checkbox } from "./common/Checkbox";
import { KeyValueList } from "./common/KeyValueList";
import { Trash2 } from "lucide-react";

interface NodeFormPanelProps {
  selectedNode: WorkflowNode | null;
  onUpdate: (nodeId: string, updates: Partial<any>) => void;
  onDelete: (nodeId: string) => void;
  automations: AutomationAction[];
}

export const NodeFormPanel: React.FC<NodeFormPanelProps> = ({
  selectedNode,
  onUpdate,
  onDelete,
  automations,
}) => {
  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-2">No node selected</p>
          <p className="text-xs text-gray-400">Click on a node to edit</p>
        </div>
      </div>
    );
  }

  const updateField = (field: string, value: any) => {
    onUpdate(selectedNode.id, { [field]: value });
  };

  const renderStartNodeForm = () => (
    <>
      <Input
        label="Title"
        value={selectedNode.data.label}
        onChange={(v) => updateField("label", v)}
        placeholder="e.g., New Employee Onboarding"
        required
      />
      <KeyValueList
        label="Metadata"
        items={(selectedNode.data as any).metadata || []}
        onChange={(items) => updateField("metadata", items)}
      />
    </>
  );

  const renderTaskNodeForm = () => (
    <>
      <Input
        label="Title"
        value={selectedNode.data.label}
        onChange={(v) => updateField("label", v)}
        placeholder="e.g., Collect Documents"
        required
      />
      <TextArea
        label="Description"
        value={(selectedNode.data as any).description || ""}
        onChange={(v) => updateField("description", v)}
        placeholder="Describe the task..."
        rows={3}
      />
      <Input
        label="Assignee"
        value={(selectedNode.data as any).assignee || ""}
        onChange={(v) => updateField("assignee", v)}
        placeholder="e.g., HR Manager"
      />
      <Input
        label="Due Date"
        value={(selectedNode.data as any).dueDate || ""}
        onChange={(v) => updateField("dueDate", v)}
        type="date"
      />
      <KeyValueList
        label="Custom Fields"
        items={(selectedNode.data as any).customFields || []}
        onChange={(items) => updateField("customFields", items)}
      />
    </>
  );

  const renderApprovalNodeForm = () => (
    <>
      <Input
        label="Title"
        value={selectedNode.data.label}
        onChange={(v) => updateField("label", v)}
        placeholder="e.g., Manager Approval"
        required
      />
      <Select
        label="Approver Role"
        value={(selectedNode.data as any).approverRole || ""}
        onChange={(v) => updateField("approverRole", v)}
        options={[
          { value: "Manager", label: "Manager" },
          { value: "HRBP", label: "HR Business Partner" },
          { value: "Director", label: "Director" },
          { value: "VP", label: "Vice President" },
          { value: "CEO", label: "CEO" },
        ]}
      />
      <Input
        label="Auto-Approve Threshold"
        value={String((selectedNode.data as any).autoApproveThreshold || "")}
        onChange={(v) => updateField("autoApproveThreshold", Number(v))}
        type="number"
        placeholder="e.g., 1000"
      />
    </>
  );

  const renderAutomatedNodeForm = () => {
    const selectedAction = automations.find(
      (a) => a.id === (selectedNode.data as any).action
    );

    return (
      <>
        <Input
          label="Title"
          value={selectedNode.data.label}
          onChange={(v) => updateField("label", v)}
          placeholder="e.g., Send Welcome Email"
          required
        />
        <Select
          label="Action"
          value={(selectedNode.data as any).action || ""}
          onChange={(v) => {
            updateField("action", v);
            updateField("actionParams", {});
          }}
          options={automations.map((a) => ({ value: a.id, label: a.label }))}
          required
        />
        {selectedAction && selectedAction.params.length > 0 && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              Action Parameters
            </p>
            {selectedAction.params.map((param) => (
              <Input
                key={param}
                label={param.charAt(0).toUpperCase() + param.slice(1)}
                value={
                  ((selectedNode.data as any).actionParams || {})[param] || ""
                }
                onChange={(v) => {
                  const params = {
                    ...((selectedNode.data as any).actionParams || {}),
                  };
                  params[param] = v;
                  updateField("actionParams", params);
                }}
                placeholder={`Enter ${param}`}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  const renderEndNodeForm = () => (
    <>
      <Input
        label="Title"
        value={selectedNode.data.label}
        onChange={(v) => updateField("label", v)}
        placeholder="e.g., Onboarding Complete"
        required
      />
      <TextArea
        label="End Message"
        value={(selectedNode.data as any).endMessage || ""}
        onChange={(v) => updateField("endMessage", v)}
        placeholder="Message to display when workflow completes"
        rows={2}
      />
      <Checkbox
        label="Generate Summary"
        checked={(selectedNode.data as any).summaryFlag || false}
        onChange={(v) => updateField("summaryFlag", v)}
      />
    </>
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <h3 className="font-bold text-lg text-gray-800">Edit Node</h3>
        <button
          onClick={() => onDelete(selectedNode.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Delete Node"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 font-medium">
            {selectedNode.type.toUpperCase()} NODE
          </p>
        </div>

        {selectedNode.type === "start" && renderStartNodeForm()}
        {selectedNode.type === "task" && renderTaskNodeForm()}
        {selectedNode.type === "approval" && renderApprovalNodeForm()}
        {selectedNode.type === "automated" && renderAutomatedNodeForm()}
        {selectedNode.type === "end" && renderEndNodeForm()}
      </div>
    </div>
  );
};
