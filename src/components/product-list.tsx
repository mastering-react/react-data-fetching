import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};

const ProductList: FC = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const offset = (page - 1) * limit;

  const hasPreviousData = offset > 0;

  const hasNextData = offset + limit < 100;

  const {
    data: products,
    // isLoading,
    // isError,
  } = useQuery<Product[]>({
    queryKey: ["products", offset, limit],
    queryFn: ({ queryKey: [_, offset, limit] }) => {
      return fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      ).then((res) => res.json());
    },
    placeholderData: keepPreviousData,
  });

  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {products?.map((product: Product) => (
          <div key={product.id} className="bg-gray-100 p-5 rounded-lg">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <h2 className="text-base font-semibold mt-2">{product.title}</h2>
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-semibold mt-2">${product.price}</p>
              <button className="bg-emerald-500 text-sm text-emerald-50 px-4 py-2 rounded cursor-pointer hover:bg-emarald-600">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 justify-center mt-6 w-full pb-20">
        <button
          className="bg-emerald-500 text-sm text-emerald-50 px-4 py-2 rounded cursor-pointer hover:bg-emarald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goToPrevPage}
          disabled={!hasPreviousData}
        >
          Prev
        </button>

        <button
          className="bg-emerald-500 text-sm text-emerald-50 px-4 py-2 rounded cursor-pointer hover:bg-emarald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goToNextPage}
          disabled={!hasNextData}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductList;
