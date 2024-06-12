import TableView from "@/app/_ui/tracker/tracker-table";

export default async function Page() {

    function getView() {
      return {
        viewType: "month",
        viewTitle: new Date().toLocaleString('default', { month: 'short' }),
      }
    }

    const {viewTitle, viewType} = getView();

    return (
      <>
        <h1 className="text-md text-black font-semibold text-center uppercase my-3">{viewTitle}</h1>
        <TableView viewType={viewType} />
      </>
    )
}