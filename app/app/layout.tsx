import SideNav from "../_ui/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-neutral-50 h-screen">
            <div className="flex h-full">
                <SideNav />
                <div className="mx-auto mt-10">
                    {children}
                </div>
            </div>
        </main>
    )
}