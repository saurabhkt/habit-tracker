import Link from 'next/link';
import NavLinks from './nav-links';
import { signOut } from "@/auth";
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
    return (
        <div className="flex w-44 h-full flex-col bg-blue-500 py-4 px-1">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <LogoutButton />
            </div>
        </div>
    )
}

function LogoutButton() {
    const LogoutIcon = ArrowRightStartOnRectangleIcon;
    return (
        <form
            action={async ()=>{
                'use server';
                await signOut({redirectTo: "/login"});
            }}
        >
        <button className="flex w-full rounded-md grow items-center justify-center gap-2 py-2 px-3 text-sm font-medium hover:bg-white hover:text-blue-800 md:flex-none md:justify-start">
          <LogoutIcon className="w-5" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    )
  }