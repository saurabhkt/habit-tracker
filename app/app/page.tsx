import TableView from "../ui/tracker-table"

export default async function Page() {
    return (
    <main className="bg-neutral-50">
      <div className="grid grid-cols-12">      
        <div className="col-start-2 col-span-10">
          <TableView viewType="month" />
        </div>
      </div>
    </main>
    )
}