import TableView from "../ui/tracker/tracker-table"
import { signOut } from "@/auth";

export default async function Page() {

    function getView() {
      return {
        viewType: "month",
        viewTitle: new Date().toLocaleString('default', { month: 'short' }),
      }
    }

    const {viewTitle, viewType} = getView();

    return (
    <main className="bg-neutral-50 h-screen">
      <div className="flex h-full">
        <div className="mx-auto mt-10">
          <LogoutButton />
          <h1 className="text-md text-black font-semibold text-center uppercase my-3">{viewTitle}</h1>
          <TableView viewType={viewType} />
        </div>
      </div>
    </main>
    )
}

function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  )
}