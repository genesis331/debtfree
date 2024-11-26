import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SendIcon} from "lucide-react";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 py-10 gap-6">
          <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col gap-4">
                  <div className="text-center text-3xl font-bold">Chat with Bei</div>
                  <div className="flex flex-col gap-4">
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex flex-col gap-1">
                                  <div>Example prompt 1</div>
                                  <div className="text-zinc-500">Analyze my spending habits and suggest budget adjustments to free up additional savings.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex flex-col gap-1">
                                  <div>Example prompt 2</div>
                                  <div className="text-zinc-500">Give me some advice on setting up emergency funds, investments, or other savings plans like education.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="shadow-none">
                          <CardContent className="px-5 py-4">
                              <div className="flex flex-col gap-1">
                                  <div>Example prompt 3</div>
                                  <div className="text-zinc-500">What are the best practices for managing personal finances?</div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
              </div>
          </div>
          <div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="text" placeholder="Enter your message here" className="h-10"/>
                  <Button type="submit" size="lg">
                      <SendIcon />
                  </Button>
              </div>
          </div>
      </div>
  );
}
