import React from "react";
import CartItem from "./CartItem/CartItem";
import { Link } from 'react-router-dom';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {

  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => {
    <h1 className="pt-10">
      <h1 className="pt-20 text-6xl text-center font-bold align-middle content-center">
        You have no items in your shopping card, 
        <Link to="/">start adding some</Link>!
      </h1>
    </h1>;
  };

  if (!cart.line_items) return "Loading...";

  const FilledCart = () => (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="mx-4 flex flex-wrap py-20 my-auto items-center">
        {cart.line_items.map((item) => (
          <div
            className="w-full flex flex-col p-4 sm:w-1/2 lg:w-1/3"
            item
            key={item.id}
          >
            <CartItem 
              item={item} 
              onUpdateCartQty={onUpdateCartQty} 
              onRemoveFromCart={onRemoveFromCart} 
            />
          </div>
        ))}
      </div>
      <div>
        <div className="flex space-x-10 pb-10">
          <h4 className="flex-1 text-s uppercase no-underline focus:outline-none">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </h4>
          <button className="rounded-full bg-red-500 text-white font-bold py-1 px-3 text-s uppercase no-underline focus:outline-none" onClick={handleEmptyCart}>
            Empty Cart
          </button>
          <Link to="/checkout">
            <button className="rounded-full bg-blue-500 text-white font-bold py-1 px-3 text-s uppercase no-underline focus:outline-none">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20">
      <h1 className="pt-20 text-6xl text-center font-bold align-middle content-center">Your Shopping Cart</h1>
      {!cart.line_items.length ? renderEmptyCart() : FilledCart()}
    </div>
  );
};

export default Cart;
