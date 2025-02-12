import { FC, useEffect, useState, use } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const fetchProducts = fetch("https://fakestoreapi.com/products").then((res) =>
  res.json()
);

const ProductList: FC = () => {
  const products = use(fetchProducts);

  // const [products, setProducts] = useState<Product[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setIsLoading(false);
  //       setProducts(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {products.map((product: Product) => (
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
