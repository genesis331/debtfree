"use client"

import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SendIcon} from "lucide-react";
import {useState} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {ScrollArea} from "@/components/ui/scroll-area";

type Message = {
    content: string;
    isUser: boolean;
}

export default function Index() {
    const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Finance data: \n- Date (month)\n- Source (bank / wallet etc)\n- Total income each month\n- Total expense each month\nLoan data: \n- Loan name\n- Loan type\n- Loan term\n- Interest percentage\n- Payment per month\n- Initial amount\n- Remaining amount\n\nYou are a chatbot to answer the question from user. Read the message and determine whether finance or loan or both data are needed. \n\nReturn in this JSON schema:\n{\n\t\"loan\": boolean,\n    \"finance\": boolean\n}",
    });
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    };
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    function appendMessage(content: string, isUser: boolean) {
        setMessages([...messages, {content, isUser}]);
    }

    function generateChatBubble(message: string, isUser: boolean, index: number) {
        return (
            <div className={`flex ${isUser ? "justify-end" : ""}`} key={index}>
                <Card className={`shadow-none max-w-[80%] ${isUser ? "bg-zinc-100 border-none" : "bg-transparent"}`}>
                    <CardContent className="px-5 py-3">
                        <div className="flex flex-col gap-1">
                            <div>{message}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

  return (
      <div className="flex-1 flex flex-col px-6 pb-6 gap-6">
          {
              messages.length ? <div className="flex-1">
                  <ScrollArea className="h-full">
                      <div className="flex flex-col justify-start gap-6">
                          <div className="flex flex-col gap-2">
                              {messages.map((message, index) => generateChatBubble(message.content, message.isUser, index))}
                          </div>
                      </div>
                  </ScrollArea>
              </div> : <div className="flex-1 flex flex-col justify-center gap-6">
                  <div className="flex flex-col gap-2">
                      <div className="text-center text-3xl font-bold">Chat with Bei</div>
                      <div className="flex flex-col gap-4">
                      <Card className="shadow-none">
                              <CardContent className="px-5 py-4">
                                  <div className="flex flex-col gap-1">
                                      <div>Example prompt 1</div>
                                      <div className="text-zinc-500">Analyze my spending habits and suggest
                                          budget
                                          adjustments to free up additional savings.
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                          <Card className="shadow-none">
                              <CardContent className="px-5 py-4">
                                  <div className="flex flex-col gap-1">
                                      <div>Example prompt 2</div>
                                      <div className="text-zinc-500">Give me some advice on setting up emergency
                                          funds,
                                          investments, or other savings plans like education.
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                          <Card className="shadow-none">
                              <CardContent className="px-5 py-4">
                                  <div className="flex flex-col gap-1">
                                      <div>Example prompt 3</div>
                                      <div className="text-zinc-500">What are the best practices for managing
                                          personal
                                          finances?
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                      </div>
                  </div>
              </div>
          }
          <div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="text" placeholder="Enter your message here" className="h-10" value={currentMessage}
                         onChange={(e) => {
                             setCurrentMessage(e.target.value)
                         }}/>
                  <Button type="submit" size="lg" className="bg-blue-700 hover:bg-blue-700/80 px-4" onClick={() => {
                      appendMessage(currentMessage, true);
                      setCurrentMessage("");
                  }}>
                      <SendIcon/>
                  </Button>
              </div>
          </div>
      </div>
  );
}
