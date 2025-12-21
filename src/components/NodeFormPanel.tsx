"use client";

import React, { useEffect, useState } from "react";
import { WorkflowNode, AutomationAction } from "@/types/workflow";
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
  // Local form data instead of live update
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (selectedNode) setForm(selectedNode.data);
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex items-center justify-center">
        <p className="text-gray-400">No node selected</p>
      </div>
    );
  }

  const updateField = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value })); // local update only
  };

  const handleSave = () => onUpdate(selectedNode.id, form);
  const handleCancel = () => setForm(selectedNode.data);

  // ------- Render Forms Per Node Type --------
  const StartForm = () => (
    <>
      <Input
        label="Title"
        value={form.label}
        required
        onChange={(v) => updateField("label", v)}
      />
      <KeyValueList
        label="Metadata"
        items={form.metadata || []}
        onChange={(items) => updateField("metadata", items)}
      />
    </>
  );

  const TaskForm = () => (
    <>
      <Input
        label="Title"
        value={form.label}
        required
        onChange={(v) => updateField("label", v)}
      />
      <TextArea
        label="Description"
        rows={3}
        value={form.description || ""}
        onChange={(v) => updateField("description", v)}
      />
      <Input
        label="Assignee"
        value={form.assignee || ""}
        onChange={(v) => updateField("assignee", v)}
      />
      <Input
        type="date"
        label="Due Date"
        value={form.dueDate || ""}
        onChange={(v) => updateField("dueDate", v)}
      />
      <KeyValueList
        label="Custom Fields"
        items={form.customFields || []}
        onChange={(items) => updateField("customFields", items)}
      />
    </>
  );

  const ApprovalForm = () => (
    <>
      <Input
        label="Title"
        value={form.label}
        onChange={(v) => updateField("label", v)}
      />
      <Select
        label="Approver Role"
        value={form.approverRole || ""}
        options={["Manager", "HRBP", "Director", "VP", "CEO"].map((r) => ({
          label: r,
          value: r,
        }))}
        onChange={(v) => updateField("approverRole", v)}
      />
      <Input
        label="Auto Approve Threshold"
        type="number"
        value={form.autoApproveThreshold || ""}
        onChange={(v) => updateField("autoApproveThreshold", Number(v))}
      />
    </>
  );

  const AutomatedForm = () => {
    const action = automations.find((a) => a.id === form.action);

    return (
      <>
        <Input
          label="Title"
          value={form.label}
          onChange={(v) => updateField("label", v)}
        />

        <Select
          label="Action"
          value={form.action || ""}
          options={automations.map((a) => ({ value: a.id, label: a.label }))}
          onChange={(v) => updateField("action", v)}
        />

        {action && action.params.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-lg space-y-3">
            <p className="text-sm font-semibold text-gray-700">Action Params</p>
            {action.params.map((param) => (
              <Input
                key={param}
                label={param}
                value={form.actionParams?.[param] || ""}
                onChange={(v) =>
                  updateField("actionParams", {
                    ...form.actionParams,
                    [param]: v,
                  })
                }
              />
            ))}
          </div>
        )}
      </>
    );
  };

  const EndForm = () => (
    <>
      <Input
        label="Title"
        value={form.label}
        onChange={(v) => updateField("label", v)}
      />
      <TextArea
        label="End Message"
        rows={2}
        value={form.endMessage || ""}
        onChange={(v) => updateField("endMessage", v)}
      />
      <Checkbox
        label="Generate Summary"
        checked={form.summaryFlag || false}
        onChange={(v) => updateField("summaryFlag", v)}
      />
    </>
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold text-lg">Edit Node</h3>
        <button
          onClick={() => onDelete(selectedNode.id)}
          className="text-red-500 hover:bg-red-50 p-2 rounded"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {selectedNode.type === "start" && <StartForm />}
        {selectedNode.type === "task" && <TaskForm />}
        {selectedNode.type === "approval" && <ApprovalForm />}
        {selectedNode.type === "automated" && <AutomatedForm />}
        {selectedNode.type === "end" && <EndForm />}
      </div>

      {/* Save / Cancel Buttons */}
      <div className="p-4 border-t flex gap-2 bg-gray-50">
        <button
          onClick={handleCancel}
          className="flex-1 border rounded py-2 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};
