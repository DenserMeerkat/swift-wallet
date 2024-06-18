import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { signUpSchema } from "@/lib/schema";
import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    console.log(data);
  }

  return (
    <Card className="mx-auto max-w-sm bg-gradient-to-b from-primary/5 to-transparent dark:from-muted/40 dark:to-muted/10">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <Input
                        placeholder="Jane"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <Input
                        placeholder="Doe"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <div className="flex items-center gap-3">
                      <FormLabel>Password</FormLabel>
                      <PassReqPopover />
                    </div>
                    <PasswordInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <PasswordInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4 w-full">
                Create an account
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/?auth=signin" className="underline hover:text-primary">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

const PassReqPopover = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Info
          className={cn(
            "h-3 w-3 hover:text-primary",
            open ? "text-primary" : "text-foreground/50",
          )}
        />
      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-sm font-normal">
        <span className="text-primary">Password Requirements</span>
        <ol className="mt-2 space-y-1 text-xs">
          <li>
            <span className="text-primary">1.</span> Must contain atleast 6
            characters.
          </li>
          <li>
            <span className="text-primary">2.</span> Must contain an uppercase
            character.
          </li>
          <li>
            <span className="text-primary">3.</span> Must contain a numeric
            character.
          </li>
          <li>
            <span className="text-primary">4.</span> Must contain a special
            character.
          </li>
        </ol>
      </PopoverContent>
    </Popover>
  );
};
