/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BoltIcon,
  LogOutIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarImage,
} from "./avatar"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"
import { IUser } from "@/types/user.interface"
import { logoutUser } from "@/services/auth/logoutUser"
import { redirect } from "next/navigation"

interface UserMenuProps {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser | null>>;
};

export default function UserMenu({ user, setUser }: UserMenuProps) {

  const logout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      const res = await logoutUser();
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setUser(null);
        redirect('/login');
      }
    } catch (error: any) {
      toast.error(error?.response?.message || 'Something went wrong!', { id: toastId });
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto bg-white p-1">
          <Avatar>
            {user && <AvatarImage src="/images/blank-profile-picture.png" alt="Profile image" />}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user?.fullName}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/${(user?.role)?.toLowerCase()}/dashboard`}>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>
                Dashboard
              </span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/profile/${user?.id}`}>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>
                Profile
              </span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
