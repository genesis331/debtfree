"use client"

import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SendIcon} from "lucide-react";
import {useEffect, useState} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {ScrollArea} from "@/components/ui/scroll-area";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import app from "@/components/firebase";

type Message = {
    content: string;
    user: number;
}

interface FinanceDoc {
    month: { seconds: number };
    sources: Array<{
        data: {
            expense: number;
            income: number;
        };
        source: string;
    }>;
}

interface DebtDoc {
    installment: number;
    interest_pct: number;
    name: string;
    principal: number;
    remaining: number;
    term_month: number;
    type: string;
}

export default function Index() {
    const apiKey: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model1 = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Finance data: \n- Date (month)\n- Source (bank / wallet etc)\n- Total income each month\n- Total expense each month\nLoan data: \n- Loan name\n- Loan type\n- Loan term\n- Interest percentage\n- Payment per month\n- Initial amount\n- Remaining amount\n\nYou are a chatbot to answer the question from user. Read the message and determine whether finance or loan or both data are needed or not needed. \n\nReturn in this JSON schema:\n{\n\t\"loan\": boolean,\n    \"finance\": boolean\n}",
    });
    const model2 = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "You are a chatbot to answer the question from user. Read the message and the provided user data, then answer the question accordingly. ",
    });
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const db = getFirestore(app);
    const [financeData, setFinanceData] = useState<FinanceDoc[]>([]);
    const [debtData, setDebtData] = useState<DebtDoc[]>([]);
    const [financeDataNeeded, setFinanceDataNeeded] = useState<boolean>(false);
    const [debtDataNeeded, setDebtDataNeeded] = useState<boolean>(false);

    const fetchFinanceData = async () => {
        const financeCollection = collection(db, "finance");
        const financeSnapshot = await getDocs(financeCollection);
        const financeData: FinanceDoc[] = financeSnapshot.docs.map((doc) =>
            doc.data() as FinanceDoc
        );
        setFinanceData(financeData);
    };

    const fetchDebtData = async () => {
        const debtCollection = collection(db, "debt");
        const debtSnapshot = await getDocs(debtCollection);
        const debtData: DebtDoc[] = debtSnapshot.docs.map((doc) =>
            doc.data() as DebtDoc
        );
        setDebtData(debtData);
    };

    useEffect(() => {
        fetchFinanceData();
        fetchDebtData();
    }, []);

    async function sendToModel(message: string) {
        const chatSession1 = model1.startChat({generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "application/json",
            }});
        const chatSession2 = model2.startChat({generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            }});
        let response: {
            finance: boolean;
            loan: boolean;
        } = {
            finance: false,
            loan: false,
        };
        setMessages((messages) => [...messages, {content: message, user: 3}]);
        await chatSession1.sendMessage(message).then(async (res) => {
            response = JSON.parse(res.response.text());
            console.log(response);
            if (response.finance !== financeDataNeeded) {
                if (!financeDataNeeded && response.finance) {
                    setMessages((messages) => [...messages, {content: "Limited finance data will be shared. ", user: 2}]);
                }
                setFinanceDataNeeded(response.finance);
                const financeDataString = financeData.map((data) => {
                    return `Month: ${new Date(data.month.seconds * 1000).toLocaleString()}\n${data.sources.map((source) => {
                        return `Source: ${source.source}\nIncome: ${source.data.income}\nExpense: ${source.data.expense}\n`;
                    }).join("\n")}`;
                }).join("\n");
                await chatSession2.sendMessage(financeDataString).then((res) => {

                });
            }
            if (response.loan !== debtDataNeeded) {
                if (!debtDataNeeded && response.loan) {
                    setMessages((messages) => [...messages, {content: "Limited debt data will be shared. ", user: 2}]);
                }
                setDebtDataNeeded(response.loan);
                const debtDataString = debtData.map((data) => {
                    return `Name: ${data.name}\nType: ${data.type}\nTerm: ${data.term_month}\nInterest: ${data.interest_pct}\nPayment: ${data.installment}\nPrincipal: ${data.principal}\nRemaining: ${data.remaining}\n`;
                }).join("\n");
                await chatSession2.sendMessage(debtDataString).then((res) => {

                });
            }
        });
        await chatSession2.sendMessage(message).then((res) => {
            const response = res.response.text();
            setMessages((messages) => [...messages, {content: response, user: 1}]);
        });
    }

    function generateChatBubble(message: string, user: number, index: number) {
        if (user === 1 || user === 3) {
            return (
                <div className={`flex ${user === 3 ? "justify-end" : ""}`} key={index}>
                    <Card className={`shadow-none max-w-[80%] ${user === 3 ? "bg-zinc-100 border-none" : "bg-transparent"}`}>
                        <CardContent className="px-5 py-3">
                            <div className="flex flex-col gap-1">
                                <div>{message}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        } else {
            return (
                <div className="flex justify-center text-zinc-500 text-sm py-1.5" key={index}>
                    {message}
                </div>
            )
        }
    }

    return (
        <div className="flex-1 flex flex-col px-6 pb-6 gap-6">
          {
              messages.length ? <div className="flex-1">
                  <ScrollArea className="h-full">
                      <div className="flex flex-col justify-start gap-6">
                          <div className="flex flex-col gap-2">
                              {messages.map((message, index) => generateChatBubble(message.content, message.user, index))}
                          </div>
                      </div>
                  </ScrollArea>
              </div> : <div className="flex-1 flex flex-col justify-center gap-6">
                  <div className="flex flex-col gap-2">
                      <div className="text-center text-3xl font-bold">Chat with Bei</div>
                      <div className="flex flex-col gap-4">
                      <Card className="shadow-none cursor-pointer hover:bg-zinc-50" onClick={() => {
                          setCurrentMessage("");
                          sendToModel("Analyze my spending habits and suggest budget adjustments to free up additional savings.");
                      }}>
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
                          <Card className="shadow-none cursor-pointer hover:bg-zinc-50" onClick={() => {
                              setCurrentMessage("");
                              sendToModel("Give me some advice on setting up emergency funds, investments, or other savings plans like education.");
                          }}>
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
                          <Card className="shadow-none cursor-pointer hover:bg-zinc-50" onClick={() => {
                              setCurrentMessage("");
                              sendToModel("What are the best practices for managing personal finances?");
                          }}>
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
                      sendToModel(currentMessage);
                      setCurrentMessage("");
                  }}>
                      <SendIcon/>
                  </Button>
              </div>
          </div>
      </div>
  );
}
