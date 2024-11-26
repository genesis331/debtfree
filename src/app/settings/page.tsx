import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PencilIcon, Trash2Icon} from "lucide-react";
import {Switch} from "@/components/ui/switch";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col">
          <div>Settings</div>
          <div>
          <div>Edit Your Info</div>
              <div className="flex flex-col">
                  <Card>
                      <CardContent className="p-0">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Ahmad Iskandar</div>
                                  <div>Full Name</div>
                              </div>
                              <div>
                                  <Button variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>ahmad@example.com</div>
                                  <div>Email</div>
                              </div>
                              <div>
                                  <Button variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <div>
                  <Button>Change Password?</Button>
              </div>
          </div>
          <div>
              <div>Manage Linked Accounts</div>
              <div className="flex flex-col">
                  <Card>
                      <CardContent className="p-0">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Maybank</div>
                                  <div>xxxxxxxx13</div>
                              </div>
                              <div>
                                  <Button variant="ghost"><Trash2Icon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Touch n’ Go E-Wallet</div>
                                  <div>601xxxxxxxx27</div>
                              </div>
                              <div>
                                  <Button variant="ghost"><Trash2Icon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <div>
                  <Button>Add Accounts</Button>
              </div>
          </div>
          <div>
              <div>Alerts & Notification</div>
              <div>
                  <div className="flex">
                      <div className="flex-1">
                          <div>Alert</div>
                          <div>Notifications for prepayment penalties or approaching grace period expirations.</div>
                      </div>
                      <div>
                          <Switch />
                      </div>
                  </div>
              </div>
              <div>
                  <div className="flex">
                      <div className="flex-1">
                          <div>Offers & Discount Notification</div>
                          <div>Notifications for prepayment penalties or approaching grace period expirations.</div>
                      </div>
                      <div>
                          <Switch />
                      </div>
                  </div>
              </div>
          </div>
          <div>
              <div>Thresholds</div>
              <div className="flex flex-col">
                  <Card>
                      <CardContent className="p-0">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>40% of Current Assets</div>
                                  <div>Debt-to-Asset Ratio Alert</div>
                              </div>
                              <div>
                                  <Button variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>RM800</div>
                                  <div>Amount Kept from Debt Repayment</div>
                              </div>
                              <div>
                                  <Button variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <div>
              <Button>Delete Account</Button>
          </div>
      </div>
  );
}
