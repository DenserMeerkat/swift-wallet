import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import AddTransaction from "./add_transaction";
import { TransactionType, Wallet } from "@/lib/types";
import { useAppContext } from "../context/app-context";
import { format } from "timeago.js";

export default function TransactionTable() {
  const [isDomLoaded, setIsDomLoaded] = React.useState(false);
  const { wallets, transactions } = useAppContext();

  function getWalletName(id: string): string {
    return wallets.find((wallet: Wallet) => wallet.id == id)?.name ?? "unknown";
  }

  React.useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return <></>;
  }

  return (
    <Card className="mx-auto max-w-6xl border-none shadow-none">
      <div className="flex flex-col justify-between xs:flex-row">
        <CardHeader className="px-6 py-2 sm:p-6">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions across your wallets.
          </CardDescription>
        </CardHeader>
        <CardHeader className="px-6 py-2 sm:p-6">
          <AddTransaction />
        </CardHeader>
      </div>
      <CardContent>
        <div className="rounded-md border-2 bg-gradient-to-b from-muted/40 to-muted/20 p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden xs:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            {transactions.length == 0 ? (
              <div className="mx-auto p-2">No transactions found</div>
            ) : (
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="font-medium">
                        {getWalletName(transaction.walletId)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
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
                    <TableCell className="hidden xs:table-cell">
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
      </CardContent>
    </Card>
  );
}
