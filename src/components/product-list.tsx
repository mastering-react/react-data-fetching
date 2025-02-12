import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState, use } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const ProductList: FC = () => {
  const {
    data: products,
    // isLoading,
    // isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => {
      return fetch("https://fakestoreapi.com/products adfaasd;f").then((res) =>
        res.json()
      );
    },
  });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div className="text-red-500">Error fetching products</div>;
  // }

  return (
    <>
      {products?.map((product: Product) => (
        <div key={product.id} className="bg-gray-100 p-5 rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover"
          />
          <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-2">${product.price}</p>
        </div>
      ))}
    </>
  );
};

export default ProductList;
