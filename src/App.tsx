import { Suspense } from "react";
import ProductList from "./components/product-list";

function App() {
  return (
    <div className="h-screen w-full py-20 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <h1 className="text-2xl font-bold mb-5">Products</h1>
        <div className="grid grid-cols-3 gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
