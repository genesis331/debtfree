import {Card, CardContent} from "@/components/ui/card";
import {FilterIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col">
          <div>Refinancing Options</div>
          <div>
              <div>Recommended for you</div>
              <div className="flex flex-col">
                  <Card>
                      <CardContent className="p-0">
                          <div>
                              <div>Housing Loan</div>
                              <div>CIMB Malaysia My Second Home</div>
                          </div>
                          <div>RM1,700/mo</div>
                          <div className="flex justify-between">
                              <div>Max 35 years</div>
                              <div>from 2.15% p.a.</div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <div>
              <div className="flex justify-between">
                  <div>Popular offers</div>
                  <div>
                      <Button variant="ghost">
                          <FilterIcon /> All Loans
                      </Button>
                  </div>
              </div>
              <div className="flex flex-col">
                  <Card>
                      <CardContent className="p-0">
                          <div>
                              <div>Housing Loan</div>
                              <div>Alliance Bank Personal Loan</div>
                          </div>
                          <div>RM466.58/mo</div>
                          <div className="flex justify-between">
                              <div>Max 7 years</div>
                              <div>from 4.99% p.a.</div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div>
                              <div>Vehicle Loan</div>
                              <div>HLB Auto Loan Fixed Rate</div>
                          </div>
                          <div>RM512.57/mo</div>
                          <div className="flex justify-between">
                              <div>Max 9 years</div>
                              <div>2.80% p.a.</div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <div>View more offers</div>
          </div>
      </div>
  );
}
