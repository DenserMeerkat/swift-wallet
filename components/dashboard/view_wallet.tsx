import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { format } from "timeago.js";
import { Transaction, TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppContext } from "../context/app-context";

const ViewWallet = (props: any) => {
  const { transactions } = useAppContext();
  const filteredTransactions: Transaction[] = transactions.filter(
    (transaction: Transaction) => transaction.walletId == props.wallet.id,
  );
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{props.Trigger}</DialogTrigger>
      <DialogContent className="max-w-lm">
        <DialogHeader>
          <DialogTitle>{props.wallet.name}</DialogTitle>
          <DialogDescription>₹{props.wallet.balance}</DialogDescription>
        </DialogHeader>
        <div className="rounded-md border-2 bg-gradient-to-b from-muted/40 to-muted/20 p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="table-cell">Type</TableHead>
                <TableHead className="table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            {filteredTransactions.length == 0 ? (
              <div className="mx-auto p-2">No transactions found</div>
            ) : (
              <TableBody>
                {filteredTransactions.map((transaction: Transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="table-cell">
                      <Badge
                        className="text-xs"
                        variant={
                          transaction.type === TransactionType.Income
                            ? "default"
                            : "secondary"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="table-cell">
                      {format(transaction.createdAt)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right",
                        transaction.type === TransactionType.Income
                          ? "text-primary"
                          : "text-destructive",
                      )}
                    >
                      ₹{transaction.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewWallet;
