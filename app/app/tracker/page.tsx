import TableView from "@/app/_ui/tracker/tracker-table";
import { fetchHabits } from "../../_lib/data"

export default async function Page() {

    function getView() {
      return {
        viewType: "month",
        viewTitle: new Date().toLocaleString('default', { month: 'short' }),
      }
    }

    const {viewTitle, viewType} = getView();
    const habits = await fetchHabits();
    
    return (
      <>
        <h1 className="text-md text-black font-semibold text-center uppercase my-3">{viewTitle}</h1>
        <TableView viewType={viewType} habits={habits} />
      </>
    )
}