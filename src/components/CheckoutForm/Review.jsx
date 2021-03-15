import React from "react";

const Review = ({ checkoutToken }) => {
  return (
    <div className="text-left p-5">
      <h6>Order summary</h6>
      <ul className="text-lg list-none">
        {checkoutToken.live.line_items.map((product) => (
          <li className="py-5" key={product.name}>
            <p className="text-xl">{product.name}</p>
            <p className="font-normal">Quantity: {product.quantity}</p>
            <p className="font-normal">
              {product.line_total.formatted_with_symbol}
            </p>
          </li>
        ))}
        <li className="mt-10 pt-5 border-t-2 list-none">
          <p className="text-xl">Total:</p>
          <p className="font-black">
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Review;
