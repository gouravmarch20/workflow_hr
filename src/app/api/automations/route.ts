// src/app/api/automations/route.ts
import { NextResponse } from "next/server";

const actions = [
  { id: "send_email", label: "Send Email", params: ["to", "subject", "body"] },
  {
    id: "generate_doc",
    label: "Generate Document",
    params: ["template", "recipient"],
  },
  { id: "create_user", label: "Create User", params: ["username", "role"] },
];

export async function GET() {
  return NextResponse.json(actions);
}
