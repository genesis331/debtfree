import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

export default function Index() {
  return (
      <div className="min-h-screen flex flex-col justify-center">
          <div>
              <div>
                  <div>Login</div>
                  <div>Enter your email below to login to your account</div>
              </div>
              <div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="ahmad@example.com"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" placeholder="************"/>
                  </div>
                  <div className="underline">Forgot your password?</div>
              </div>
              <div>
                  <Button>Login</Button>
              </div>
              <div>
                  <Separator />
              </div>
              <div className="flex items-center gap-1">
                  <div>Don't have an account yet?</div>
                  <div className="underline">Sign up here</div>
              </div>
          </div>
          <div>
              <div>
                  <div>Create an account</div>
              </div>
              <div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="first_name">First name</Label>
                      <Input type="text" id="first_name" placeholder="Ahmad"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="last_name">Last name</Label>
                      <Input type="text" id="last_name" placeholder="Iskandar"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="ahmad@example.com"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" placeholder="************"/>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="confirm_password">Confirm password</Label>
                      <Input type="password" id="confirm_password" placeholder="************"/>
                  </div>
              </div>
              <div>
                  <Button>Sign Up</Button>
              </div>
              <div>
                  <Separator />
              </div>
              <div className="flex items-center gap-1">
                  <div>Don't have an account yet?</div>
                  <div className="underline">Sign up here</div>
              </div>
          </div>
      </div>
  );
}
