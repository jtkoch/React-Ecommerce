import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product, onAddToCart }) => {
  return (
    <div>
      <div className="lg:h-auto lg:w-auto flex-none bg-cover rounded-t overflow-hidden">
        <img src={product.media.source} alt="" title={product.name} />
      </div>
      <div className="px-10 py-5 bg-white shadow-lg rounded-b overflow-hidden">
        <h1 className="mb-2 text-xl font-bold">{product.name}</h1>
        <p className="mb-2">{product.price.formatted_with_symbol}</p>
        <p
          dangerouslySetInnerHTML={{ __html: product.description }}
          className="mb-2"
        />
        <button
          className="border-t border-grey-light pt-4 text-xs uppercase no-underline focus:outline-none w-full"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <p>Add to cart</p>
          <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default Product;
