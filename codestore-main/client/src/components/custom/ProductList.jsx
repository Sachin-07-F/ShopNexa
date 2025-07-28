import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const ProductList = () => {
  const { products } = useSelector((state) => state.product);

  return (
    <>
      {products.length === 0 && (
        <div className="flex  justify-center items-center">
          <Loader2 className="animate-spin" size={30} />
        </div>
      )}

      <div className="w-[93vw] grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto gap-5 place-content-center my-10">
        {products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
