import { Suspense } from "react";
import ProductList from "./components/product-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,

      // @ts-ignore
      suspense: true,
      retry: false,
      // enabled: false,
      // refetchOnWindowFocus: false,
      // staleTime: 1000 * 30,
    },
  },
});

function App() {
  return (
    <div className="h-screen w-full py-20 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <QueryClientProvider client={queryClient}>
          <h1 className="text-2xl font-bold mb-5">Products</h1>

          <ErrorBoundary
            fallback={
              <div className="text-red-500 px-4 py-2 border border-dashed rounded">
                Something went wrong!
              </div>
            }
          >
            <Suspense fallback={<div>Loading From React Query...</div>}>
              <ProductList />
            </Suspense>
          </ErrorBoundary>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
