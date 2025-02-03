export function Container({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="max-w-md mx-auto flex flex-col gap-4 w-full py-16 px-4 lg:px-0">{children}</div>
  );
}
