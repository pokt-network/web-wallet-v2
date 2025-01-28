import { Footer } from "./footer";
import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
