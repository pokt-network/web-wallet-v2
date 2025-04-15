import { Footer } from "./footer";
import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
