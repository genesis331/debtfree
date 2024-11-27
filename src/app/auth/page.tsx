import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col justify-center px-6 pb-10 gap-6">
          <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                  <div className="text-3xl font-bold">Login</div>
                  <div className="text-gray-500">Enter your email below to login to your account</div>
              </div>
              <div className="flex flex-col gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="ahmad@example.com" className="h-10"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" placeholder="************" className="h-10"/>
                  </div>
                  <div className="underline">Forgot your password?</div>
              </div>
              <div>
                  <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Login</Button>
              </div>
              <div>
                  <Separator className="h-[3px] bg-border/40"/>
              </div>
              <div className="flex items-center gap-1">
                  <div>Don't have an account yet?</div>
                  <div className="underline">Sign up here</div>
              </div>
          </div>
          <div className="flex flex-col gap-6">
              <div className="text-3xl font-bold">Create an account</div>
              <div className="flex flex-col gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="first_name">First name</Label>
                      <Input type="text" id="first_name" placeholder="Ahmad" className="h-10"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="last_name">Last name</Label>
                      <Input type="text" id="last_name" placeholder="Iskandar" className="h-10"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="ahmad@example.com" className="h-10"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" placeholder="************" className="h-10"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="confirm_password">Confirm password</Label>
                      <Input type="password" id="confirm_password" placeholder="************" className="h-10"/>
                  </div>
              </div>
              <div>
                  <Button className="w-full font-semibold bg-blue-700 hover:bg-blue-700/80" size="lg">Sign Up</Button>
              </div>
              <div>
                  <Separator className="h-[3px] bg-border/40"/>
              </div>
              <div className="flex items-center gap-1">
                  <div>Already have an account?</div>
                  <div className="underline">Login here</div>
              </div>
          </div>
      </div>
  );
}
