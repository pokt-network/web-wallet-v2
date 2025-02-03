import { Button } from "./button";

export function Header(): JSX.Element {
  return (
    <div className="py-4 w-full max-w-3xl mx-auto flex items-center justify-between px-4 lg:px-0">
      <img src="/images/logo.svg" alt="logo" className="w-36" />
      <Button variant="outline">Buy POKT</Button>
    </div>
  );
}
