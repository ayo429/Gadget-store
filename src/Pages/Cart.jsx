import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#070708] min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-white text-2xl mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started</p>
        <Link
          to="/products"
          className="bg-[#7c5cfc] text-white px-7 py-3 rounded-xl text-sm"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
    <div className="hero-bg" />
      <div className="hero-grid" />
    <div className="bg-[#070708] min-h-screen px-4 md:px-12 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 border border-white/10 px-4 py-2 rounded-lg text-sm mb-8 hover:text-white transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl md:text-3xl text-white font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_350px] gap-8">

        {/* Cart Items */}
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#0e0e10] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl shrink-0"
              />

              {/* Info */}
              <div className="flex-1">
                <p className="text-[#7c5cfc] text-xs uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <h3 className="text-white text-sm font-semibold mb-1">{item.name}</h3>
                <p className="text-[#7c5cfc] font-bold text-sm">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-8 h-8 bg-[#1a1a1a] border border-white/10 rounded-lg text-white text-lg flex items-center justify-center hover:bg-white/10 transition"
                >-</button>
                <span className="text-white text-sm">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-8 h-8 bg-[#1a1a1a] border border-white/10 rounded-lg text-white text-lg flex items-center justify-center hover:bg-white/10 transition"
                >+</button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-3 py-1.5 text-xs hover:bg-red-500/20 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-[#0e0e10] border border-white/5 rounded-2xl p-6 h-fit">
          <h2 className="text-white text-lg font-semibold mb-6">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-3">
              <span className="text-gray-500 text-sm">{item.name} x{item.quantity}</span>
              <span className="text-white text-sm">₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}

          <div className="border-t border-white/5 mt-4 pt-4 flex justify-between">
            <span className="text-white font-semibold">Total</span>
            <span className="text-[#7c5cfc] font-bold">₦{cartTotal.toLocaleString()}</span>
          </div>

          <Link
            to="/checkout"
            className="block w-full text-center bg-[#7c5cfc] text-white py-3.5 rounded-xl text-sm font-medium mt-6 mb-3 hover:bg-[#6a4de8] transition"
          >
            Proceed to Checkout
          </Link>

          <button
            onClick={clearCart}
            className="w-full py-3 bg-transparent text-red-400 border border-red-500/20 rounded-xl text-sm hover:bg-red-500/10 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
    </>
  );
}