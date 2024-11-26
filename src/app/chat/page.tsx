import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col">
          <div></div>
          <div>
              <div>
                  <div>Chat with Bei</div>
                  <div>
                      <Card>
                          <CardContent className="p-0">
                              <div>
                                  <div>Example prompt 1</div>
                                  <div>Analyze my spending habits and suggest budget adjustments to free up additional savings.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardContent className="p-0">
                              <div>
                                  <div>Example prompt 2</div>
                                  <div>Give me some advice on setting up emergency funds, investments, or other savings plans like education.</div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardContent className="p-0">
                              <div>
                                  <div>Example prompt 3</div>
                                  <div>What are the best practices for managing personal finances?</div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
              </div>
          </div>
          <div>
              <Input type="text" placeholder="Enter your message here"/>
          </div>
      </div>
  );
}
