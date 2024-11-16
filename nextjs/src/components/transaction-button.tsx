// "use client";

// import { useCallback } from 'react';
// import {
//   Transaction,
//   TransactionButton,
//   TransactionStatus,
//   TransactionStatusLabel,
//   TransactionStatusAction,
//   TransactionToast,
//   TransactionToastIcon,
//   TransactionToastLabel,
//   TransactionToastAction,
//   type LifecycleStatus,
// } from '@coinbase/onchainkit/transaction';
// import { useToast } from "@/hooks/use-toast";
// import { Wallet } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { useAccount } from 'wagmi';
// import { baseSepolia } from 'viem/chains';

// interface CustomTransactionProps {
//   className?: string;
//   txData: {
//     to: string;
//     value: string;
//     data?: string;
//   };
// }

// export function CustomTransaction({ className, txData }: CustomTransactionProps) {
//   const { toast } = useToast();
//   const { isConnected } = useAccount();

//   const handleOnStatus = useCallback((status: LifecycleStatus) => {
//     switch (status.statusName) {
//       case 'success':
//         toast({
//           title: "Success!",
//           description: "Transaction completed successfully",
//         });
//         break;
//       case 'error':
//         toast({
//           title: "Error",
//           description: status.statusData.message || "Transaction failed",
//           variant: "destructive",
//         });
//         break;
//       case 'transactionPending':
//         toast({
//           title: "Processing",
//           description: "Transaction is being processed",
//         });
//         break;
//     }
//   }, [toast]);

//   // Early return if not connected
//   if (!isConnected) {
//     return null;
//   }

//   const calls = [{
//     to: txData.to as `0x${string}`,
//     value: BigInt(txData.value),
//     data: txData.data as `0x${string}` | undefined,
//   }];

//   return (
//     <Transaction
//       chainId={baseSepolia.id}
//       calls={calls}
//       onStatus={handleOnStatus}
//     >
//       <div className="flex flex-col space-y-4">
//         <TransactionButton 
//           type="button"
//           className={cn(
//             "bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-all w-full justify-center",
//             className
//           )}
//           aria-label="Send Transaction" 
//         >
//           <Wallet className="h-4 w-4" />
//           Send Transaction
//         </TransactionButton>

//         <div className="space-y-2">
//           <TransactionStatus>
//             <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
//               <TransactionStatusLabel className="text-sm text-slate-700 dark:text-slate-300" />
//               <TransactionStatusAction className="mt-2" />
//             </div>
//           </TransactionStatus>
          
//           <TransactionToast>
//             <div className="flex items-center gap-2">
//               <TransactionToastIcon />
//               <TransactionToastLabel />
//               <TransactionToastAction />
//             </div>
//           </TransactionToast>
//         </div>
//       </div>
//     </Transaction>
//   );
// }

// // Usage example:
// // const ExampleUsage = () => {
// //   return (
// //     <CustomTransaction 
// //       txData={{
// //         to: "0x1234567890123456789012345678901234567890",
// //         value: "1000000000000000000", // 1 ETH in wei
// //         data: "0x" // Optional contract data
// //       }}
// //     />
// //   );
// // };

// // export default ExampleUsage;