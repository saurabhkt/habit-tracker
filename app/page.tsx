import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <main className="bg-neutral-50 h-screen">
      <div className="flex flex-col h-full">
        <div className="w-80 m-auto cursor-default antialiased">
          <p className="text-black text-sm font-normal text-center mb-1">a simple</p>
          <h1 className="text-black text-2xl font-semibold text-center mb-8">Habit Tracker</h1>
          <Link 
            href="/login"
            className="flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log In</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
}
