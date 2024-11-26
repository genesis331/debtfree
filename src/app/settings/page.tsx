import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PencilIcon} from "lucide-react";
import {Switch} from "@/components/ui/switch";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col px-6 py-10 gap-6">
          <div className="text-4xl font-bold">Settings</div>
          <div className="flex flex-col gap-3.5">
              <div className="font-semibold">Edit Your Info</div>
              <div className="flex flex-col gap-4">
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Ahmad Iskandar</div>
                                  <div className="text-xs text-gray-500">Full Name</div>
                              </div>
                              <div>
                                  <Button className="[&_svg]:size-6 px-2 text-gray-500" variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>ahmad@example.com</div>
                                  <div className="text-xs text-gray-500">Email Address</div>
                              </div>
                              <div>
                                  <Button className="[&_svg]:size-6 px-2 text-gray-500" variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <div>
                  <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Change Password</Button>
              </div>
          </div>
          <div className="flex flex-col gap-3.5">
              <div className="font-semibold">Manage Linked Accounts</div>
              <div className="flex flex-col gap-4">
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Maybank</div>
                                  <div className="text-xs text-gray-500">xxxxxxxx13</div>
                              </div>
                              <div>
                                  <Button className="[&_svg]:size-6 px-2 text-gray-500" variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>Touch n’ Go E-Wallet</div>
                                  <div className="text-xs text-gray-500">601xxxxxxxx27</div>
                              </div>
                              <div>
                                  <Button className="[&_svg]:size-6 px-2 text-gray-500" variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <div>
                  <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Add Accounts</Button>
              </div>
          </div>
          <div className="flex flex-col gap-3.5">
              <div className="font-semibold">Alerts & Notification</div>
              <div className="flex flex-col gap-4">
                  <div className="flex">
                      <div className="flex-1 flex flex-col gap-1.5">
                          <div className="text-sm">Alert</div>
                          <div className="text-xs text-gray-500">Notifications for prepayment penalties or approaching grace period
                              expirations.
                          </div>
                      </div>
                      <div>
                          <Switch/>
                      </div>
                  </div>
                  <div className="flex">
                      <div className="flex-1 flex flex-col gap-1.5">
                          <div className="text-sm">Offers & Discount Notification</div>
                          <div className="text-xs text-gray-500">Notifications for prepayment penalties or approaching grace period
                              expirations.
                          </div>
                      </div>
                      <div>
                          <Switch/>
                      </div>
                  </div>
              </div>
          </div>
          <div className="flex flex-col gap-3.5">
              <div className="font-semibold">Thresholds</div>
              <div className="flex flex-col gap-4">
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>40% of Current Assets</div>
                                  <div className="text-xs text-gray-500">Debt-to-Asset Ratio Alert</div>
                              </div>
                              <div>
                                  <Button className="[&_svg]:size-6 px-2 text-gray-500" variant="ghost"><PencilIcon/></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="shadow-none">
                      <CardContent className="px-5 py-4">
                          <div className="flex items-center">
                              <div className="flex-1">
                                  <div>RM800</div>
                                  <div className="text-xs text-gray-500">Amount Kept from Debt Repayment</div>
                              </div>
                              <div>
                                  <Button className="[&_svg]:size-6 px-2 text-gray-500" variant="ghost"><PencilIcon /></Button>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
          <div>
              <Button className="w-full font-semibold border-destructive text-destructive hover:text-destructive bg-destructive/20 hover:bg-destructive/10" size="lg" variant="outline">Delete Account</Button>
          </div>
      </div>
  );
}
