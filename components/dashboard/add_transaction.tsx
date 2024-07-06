"use client";
import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PlusCircle } from "lucide-react";
import { useAppContext } from "../context/app-context";
import { Wallet } from "@/lib/types";
import WalletCard from "./wallet_card";
import React from "react";
import { toast } from "sonner";
import { createTransaction } from "@/lib/requests";

export default function AddTransaction() {
  const [open, setOpen] = useState(false);
  const { wallets } = useAppContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={wallets.length === 0}
          variant={"outline"}
          className="border-dashed bg-muted/40 text-foreground/70 hover:border-primary hover:text-primary"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add <span className="ml-1 xs:hidden lm:block">Transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lm">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your new transaction.
          </DialogDescription>
        </DialogHeader>
        <AddTransactionForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

const AddTransactionForm = (props: any) => {
  const { wallets, transactions, updateTransactions } = useAppContext();
  const [transaction, setTransaction] = useState("income");
  const [wallet, setWallet] = useState(0);

  const addTransactionSchema = z.object({
    amount: z.number(),
  });

  const form = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
  });

  async function onSubmit(data: z.infer<typeof addTransactionSchema>) {
    const trans = {
      amount: data.amount,
      type: transaction,
      walletId: wallets[wallet].id,
    };
    const isSuccess = await createTransaction(
      wallets[wallet].id,
      trans,
      transactions,
      updateTransactions,
    );
    if (isSuccess) {
      toast.success("Success", {
        description: "Transaction Successful!",
      });
      if (transaction === "income") {
        wallets[wallet].balance += data.amount;
      } else {
        wallets[wallet].balance -= data.amount;
      }
      closeDialog();
    } else {
      toast.error("Error", {
        description: "Transaction failed",
      });
    }
  }

  const closeDialog = () => {
    form.reset();
    props.setOpen(false);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      form.setValue<"amount">("amount", Number(newValue));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue={transaction} onValueChange={setTransaction}>
          <TabsList className="w-full rounded-sm">
            <TabsTrigger value={"income"} className="w-full rounded-sm">
              Income
            </TabsTrigger>
            <TabsTrigger value={"expense"} className="w-full rounded-sm">
              Expense
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <CarouselWalletSelect
          wallet={wallet}
          setWallet={setWallet}
          wallets={wallets}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <Input
                id="amount"
                type="number"
                className="text-[24px] font-bold tracking-widest"
                {...field}
                value={field.value}
                onChange={handleAmountChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="gap-1">
          <Button variant={"secondary"} type="button" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit">Add Transaction</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

const CarouselWalletSelect = (props: any) => {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const slideIndex = api.selectedScrollSnap();
      props.setWallet(slideIndex);
    });
  }, [props, api]);
  return (
    <div className="select-none">
      <Label htmlFor="wallet">Wallet</Label>
      <Carousel setApi={setApi} className="mx-auto max-w-64 lm:max-w-80">
        <CarouselContent>
          {props.wallets.map((wallet: Wallet, index: number) => (
            <CarouselItem key={index}>
              <WalletCard {...wallet} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious type="button" />
        <CarouselNext type="button" />
      </Carousel>
    </div>
  );
};
