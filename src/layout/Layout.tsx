import { Menu } from "./Menu";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 antialiased">
      <aside className="max-h-screen bg-slate-900 p-4">
        <Menu />
      </aside>
      <main className="relative flex h-full flex-1 flex-col overflow-y-auto">
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
};