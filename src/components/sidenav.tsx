/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/sidenav.tsx
"use client";


import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
 Brain, Network, Wallet, Settings, Database, 
 BarChart3, Bot, LogOut 
} from 'lucide-react';
import {
 Sidebar, SidebarContent, SidebarHeader, 
 SidebarMenu, SidebarMenuItem, SidebarMenuButton,
 SidebarFooter, 
} from '@/components/ui/sidebar';
import { useSidebar } from '@/providers/sidebar-provider';


import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
 DropdownMenu, DropdownMenuContent, DropdownMenuItem,
 DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
 { title: 'AI Agents', href: '/dashboard', icon: Brain },
 { title: 'Network', href: '/dashboard/network', icon: Network },
 { title: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
 { title: 'Models', href: '/dashboard/models', icon: Bot },
 { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
 { title: 'Storage', href: '/dashboard/storage', icon: Database },
 { title: 'Settings', href: '/dashboard/settings', icon: Settings },
] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SideNav({ user }: { user?: any }) {
 const pathname = usePathname();
 const { state } = useSidebar();

 const handleSignOut = async () => {
   const form = document.createElement('form');
   form.method = 'post';
   form.action = '/auth/signout';
   document.body.appendChild(form);
   form.submit();
 };

 return (
   <Sidebar variant="sidebar" collapsible="icon">
     <SidebarHeader className="border-b border-border/10">
       <Link href="/" className={cn(
         "flex items-center p-3 transition-opacity hover:opacity-80",
         "group-data-[state=expanded]:pl-4",
         "group-data-[state=collapsed]:justify-center"
       )}>
         <Image
           src="/logo.png" 
           alt="Runereum"
           width={32}
           height={32}
           className="object-contain"
         />
         <h1 className="text-lg ml-3 group-data-[state=collapsed]:hidden">
           Runereum
         </h1>
       </Link>
     </SidebarHeader>

     <SidebarContent>
       <SidebarMenu>
         {navigation.map((item) => (
           <SidebarMenuItem key={item.href}>
             <Link href={item.href} passHref>
               <SidebarMenuButton
                 tooltip={item.title}
                 isActive={pathname === item.href} 
                 className={cn(
                   "w-full",
                   "group-data-[state=expanded]:pl-4",
                   "group-data-[state=collapsed]:justify-center"
                 )}
               >
                 <item.icon className="w-5 h-5" />
                 <span className="ml-3 group-data-[state=collapsed]:hidden">
                   {item.title}
                 </span>
               </SidebarMenuButton>
             </Link>
           </SidebarMenuItem>
         ))}
       </SidebarMenu>
     </SidebarContent>

     <SidebarFooter>
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button 
             variant="ghost" 
             className="w-full p-2"
             aria-label="User menu"
           >
             <Avatar className="h-8 w-8">
               <AvatarImage src={user?.avatar_url} alt="User avatar" />
               <AvatarFallback>RU</AvatarFallback>
             </Avatar>
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
           <DropdownMenuLabel>My Account</DropdownMenuLabel>
           <DropdownMenuSeparator />
           <DropdownMenuItem 
             onClick={handleSignOut}
             onKeyDown={(e) => e.key === 'Enter' && handleSignOut()}
           >
             <LogOut className="mr-2 h-4 w-4" />
             Sign out
           </DropdownMenuItem>
         </DropdownMenuContent>
       </DropdownMenu>
     </SidebarFooter>
   </Sidebar>
 );
}