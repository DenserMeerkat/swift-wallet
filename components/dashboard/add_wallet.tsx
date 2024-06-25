import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Card, CardContent } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { useAppContext } from "../context/app-context";
import { Button } from "../ui/button";

export const AddWalletCard = () => {
  const [open, setOpen] = React.useState(false);
  const { user, wallets } = useAppContext();

  const addWalletSchema = z.object({
    name: z
      .string()
      .min(2, "Min. 2 characters")
      .max(20, "Max. 25 characters")
      .refine((value) => {
        return wallets.every((wallet) => wallet.name !== value);
      }, "Wallet name must be unique"),
    initialBalance: z.coerce
      .number()
      .min(0, "Must be a positive number")
      .optional(),
  });

  const form = useForm<z.infer<typeof addWalletSchema>>({
    resolver: zodResolver(addWalletSchema),
  });

  function onSubmit(data: z.infer<typeof addWalletSchema>) {
    console.log(data);
  }

  const closeDialog = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Card className="group m-1 cursor-pointer border-2 border-dashed bg-gradient-to-b from-muted/20 to-primary/5 transition-colors hover:border-primary">
          <CardContent className="flex aspect-video flex-col items-center justify-center p-4">
            <CirclePlus
              strokeWidth={1.5}
              className="h-12 w-12 text-muted-foreground group-hover:text-primary"
            />
            <span className="mt-4 font-medium text-muted-foreground group-hover:text-primary">
              Add Wallet
            </span>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
          <DialogDescription>
            Create a new wallet to manage your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="relative border-2 bg-gradient-to-b from-muted/40 to-primary/10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="absolute min-w-40 max-w-52 self-start truncate rounded-br-md rounded-tl-sm border-b-2 border-r-2 bg-background p-2 font-bold text-primary">
                    <Input
                      id="name"
                      placeholder="Wallet Name"
                      {...field}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardContent className="flex aspect-video flex-col justify-end p-3">
                <div className="flex items-center justify-end gap-2 text-right text-[clamp(32px,100%,64px)] font-bold">
                  <span className="text-primary">₹</span>{" "}
                  <FormField
                    control={form.control}
                    name="initialBalance"
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          id="initialBalance"
                          className="max-w-36 text-[clamp(32px,90%,60px)]"
                          {...field}
                          value={field.value ?? 0}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <DialogFooter className="mt-4 gap-1">
              <Button variant={"secondary"} type="button" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">Create Wallet</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const AddWalletForm = () => {};
