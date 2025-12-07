import { NextResponse } from "next/server";
import { AutomationAction } from "@/types/workflow";

const mockAutomations: AutomationAction[] = [
  {
    id: "send_email",
    label: "Send Email",
    params: ["to", "subject", "body"],
  },
  {
    id: "send_slack",
    label: "Send Slack Message",
    params: ["channel", "message"],
  },
  {
    id: "generate_doc",
    label: "Generate Document",
    params: ["template", "recipient"],
  },
  {
    id: "create_ticket",
    label: "Create Support Ticket",
    params: ["title", "description", "priority"],
  },
  {
    id: "update_database",
    label: "Update Database Record",
    params: ["table", "recordId", "fields"],
  },
  {
    id: "schedule_meeting",
    label: "Schedule Meeting",
    params: ["attendees", "duration", "title"],
  },
  {
    id: "send_sms",
    label: "Send SMS Notification",
    params: ["phoneNumber", "message"],
  },
  {
    id: "generate_pdf",
    label: "Generate PDF Report",
    params: ["template", "data"],
  },
  {
    id: "webhook_call",
    label: "Call Webhook",
    params: ["url", "payload"],
  },
  {
    id: "assign_task",
    label: "Auto-assign Task",
    params: ["taskId", "assignee"],
  },
];

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(mockAutomations);
}
