import React from "react";
import Product from "./Product/Product";

const Products = ({ products }) => {
  return (
    <main className="max-w-screen-xl mx-auto px-4">
      <div className="mx-4 flex flex-wrap py-20 my-auto items-center">
        {products.map((product) => (
          <div key="{product.id}" className="w-full flex flex-col p-4 sm:w-1/2 lg:w-1/3">
            <Product product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
