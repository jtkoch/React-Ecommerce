import React from "react";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-20">
      <div className="lg:h-auto lg:w-auto flex-none bg-cover rounded-t overflow-hidden">
        <img src={item.media.source} alt="" title={item.name} />
      </div>

      <div className="px-10 py-5 bg-white shadow-lg rounded-b overflow-hidden">
        <h1 className="mb-2 text-xl font-bold">{item.name}</h1>
        <p className="mb-2">{item.line_total.formatted_with_symbol}</p>
        <p
          dangerouslySetInnerHTML={{ __html: item.description }}
          className="mb-2"
        />

        <div className="inline-flex align-middle w-full justify-evenly">
          <button className="inline focus:outline-none py-1 px-3" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)} >
            -
          </button>
          <div className="inline focus:outline-none py-1 px-3">
            {item.quantity}
          </div>
          <button className="inline focus:outline-none py-1 px-3" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)} >
            +
          </button>
          <button className="rounded-full bg-red-500 text-white font-bold py-1 px-3 block focus:outline-none" onClick={() => onRemoveFromCart(item.id)} >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
