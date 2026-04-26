import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Shared components/Navbar";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const WHATSAPP_NUMBER = "2348124639774";

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert("Please fill in all fields");
      return;
    }

    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} — ₦${(item.price * item.quantity).toLocaleString()}`
      )
      .join("\n");

    const message = `
Hello! I'd like to place an order 🛍️

*Order Summary:*
${itemsList}

*Total:* ₦${cartTotal.toLocaleString()}

*Name:* ${name}
*Phone:* ${phone}
*Delivery Address:* ${address}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    clearCart();
    window.open(whatsappURL, "_blank");
    navigate("/");
  };

  const inputClass = "w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#7c5cfc] transition";
  const labelClass = "block text-gray-500 text-xs mb-2";

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#070708] min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-white text-2xl mb-2">Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-[#7c5cfc] text-white px-7 py-3 rounded-xl text-sm hover:bg-[#6a4de8] transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="hero-bg" />
      <div className="hero-grid" />
      <Navbar />

      <div className="bg-[#070708] min-h-screen px-4 md:px-12 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 border border-white/10 px-4 py-2 rounded-lg text-sm mb-8 hover:text-white transition"
        >
          ← Back
        </button>

        <h1 className="text-2xl md:text-3xl text-white font-bold mb-1">Checkout</h1>
        <p className="text-gray-500 text-sm mb-10">
          Fill in your details and we'll send your order via WhatsApp
        </p>

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_350px] gap-8">

          {/* Delivery Details Form */}
          <div className="bg-[#0e0e10] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-white text-base font-semibold mb-6">Delivery Details</h2>

            {/* Name */}
            <div className="mb-5">
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08012345678"
                className={inputClass}
              />
            </div>

            {/* Address */}
            <div className="mb-5">
              <label className={labelClass}>Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="12 Adeola Street, Abuja"
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#0e0e10] border border-white/5 rounded-2xl p-6 h-fit">
            <h2 className="text-white text-lg font-semibold mb-6">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                <span className="text-gray-500 text-sm">{item.name} x{item.quantity}</span>
                <span className="text-white text-sm">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}

            <div className="border-t border-white/5 mt-4 pt-4 flex justify-between">
              <span className="text-white font-semibold">Total</span>
              <span className="text-[#7c5cfc] font-bold">₦{cartTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={handleOrder}
              className="mt-6 w-full py-3.5 bg-[#25D366] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#1fb558] transition"
            >
              📲 Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}