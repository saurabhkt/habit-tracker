'use client';

import Link from "next/link";
import clsx from "clsx";
import { CalendarDaysIcon, CogIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const links = [
    { name: "Tracker", href: "/app/tracker", icon: CalendarDaysIcon },
    { name: "Settings", href: "/app/settings", icon: CogIcon },
]

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link)=>{
                const LinkIcon = link.icon;
                return (
                    <Link
                        href={link.href}
                        key={link.name}
                        className={clsx(
                            'flex rounded-md grow items-center justify-center gap-2 py-2 px-3 text-sm font-medium hover:bg-white hover:text-blue-800 md:flex-none md:justify-start',
                            {
                                'bg-white text-blue-800': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-5" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}