import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const actions = [
    {
      id: "send_email",
      label: "Send Email",
      params: ["to", "subject", "body"],
    },
    {
      id: "generate_doc",
      label: "Generate Document",
      params: ["template", "recipient"],
    },
    { id: "create_user", label: "Create User", params: ["username", "role"] },
  ];

  res.status(200).json(actions);
}
