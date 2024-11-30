"use client"

import {SendIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Index() {
    const mailSchema = {
        "personalizations": [{
            "to": [{"email": "test@example.com"}]
        }],
        "from": {"email": "test@example.com"},
        "subject": "Sending with SendGrid is Fun",
        "content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]
    }

    const sendEmail = async () => {
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SENDGRID_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mailSchema)
        })
        console.log(response)
    }

  return (
      <div className="min-h-screen flex flex-col px-6 pb-10 gap-3">
          <div className="text-3xl font-bold">Test Menu</div>
          <Button variant="outline" className="justify-start py-6 px-4 gap-4 [&_svg]:size-5" onClick={sendEmail}>
              <SendIcon className="text-blue-700"/> Send Alert Email
          </Button>
      </div>
  );
}
