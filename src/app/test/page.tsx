"use client"

import {SendIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Index() {
    const content = {
        "personalizations": [{
            "to": [{"email": "cheah3838@gmail.com"}]
        }],
        "from": {"email": "test@zixucheah331.net"},
        "subject": "Test Email " + new Date().toLocaleString('en-US', {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}),
        "content": [{"type": "text/plain", "value": "This is a test email. Kindly disregard. "}]
    }

    const sendEmail = async () => {
        const response = await fetch("/fetch", {
            method: "POST",
            body: JSON.stringify(content)
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
