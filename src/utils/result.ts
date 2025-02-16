export type Result<Data, Error> = { ok: true; data: Data } | { ok: false; error: Error };

type AsyncFn<Input, Output> = (input: Input) => Promise<Output>;
export function safeAsyncExecutor<Input, Output, Error>(
  fn: AsyncFn<Input, Output>
): AsyncFn<Input, Result<Output, Error | unknown>> {
  return async (input: Input): Promise<Result<Output, Error | unknown>> => {
    try {
      const data = await fn(input);

      return {
        ok: true,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  };
}
