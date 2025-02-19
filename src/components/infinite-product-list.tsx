import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, Fragment, useEffect, useRef } from "react";

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

const InfiniteProductList: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const limit = 12;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam }) =>
        fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${pageParam}&limit=${limit}`
        ).then((res) => res.json()),
      initialPageParam: 0,
      getNextPageParam: (_lastPage, allPages) => {
        const offset = allPages.length * limit;
        return offset <= 60 ? offset : undefined;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting) {
        fetchNextPage();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((product: Product) => (
              <div key={product.id} className="bg-gray-100 p-5 rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <h2 className="text-base font-semibold mt-2">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-semibold mt-2">${product.price}</p>
                  <button className="bg-emerald-500 text-sm text-emerald-50 px-4 py-2 rounded cursor-pointer hover:bg-emarald-600">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      <div className="flex justify-center mt-6 pb-20" ref={ref}>
        {isFetchingNextPage && <p>Loading...</p>}

        {!isFetchingNextPage && !hasNextPage && <p>No more products</p>}

        {/* <button
          className="px-4 py-2 border rounded border-emerald-500 text-emerald-500 enabled:hover:bg-emerald-500 enabled:hover:text-emerald-50 text-sm transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button> */}
      </div>
    </>
  );
};

export default InfiniteProductList;
