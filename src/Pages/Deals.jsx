import { useEffect, useState } from "react";
import { getDeals } from "../lib/getDeals";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../Shared components/Navbar";

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const data = await getDeals();
        setDeals(data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
      setLoading(false);
    };
    fetchDeals();
  }, []);

  return (
    <>
    <Navbar/>
    <div style={{ padding: "40px 48px", background: "#070708", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", color: "#fff", marginBottom: "8px" }}>Deals</h1>
      <p style={{ color: "#555", fontSize: "14px", marginBottom: "40px" }}>
        Limited time offers — grab them before they're gone!
      </p>

      {loading ? (
        <p style={{ color: "#555" }}>Loading deals...</p>
      ) : deals.length === 0 ? (
        <p style={{ color: "#555" }}>No deals available right now. Check back later!</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}>
          {deals.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#0e0e10",
                border: "1px solid rgba(124,92,252,0.3)",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Deal badge */}
              <div style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "#7c5cfc",
                color: "#fff",
                fontSize: "10px",
                fontWeight: "700",
                padding: "4px 10px",
                borderRadius: "20px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                zIndex: 1,
              }}>
                Deal
              </div>

              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "160px", objectFit: "cover" }}
                />
              </Link>
              <div style={{ padding: "16px" }}>
                <p style={{ fontSize: "11px", color: "#7c5cfc", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "6px" }}>
                  {product.category}
                </p>
                <h3 style={{ fontSize: "14px", color: "#fff", marginBottom: "4px" }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: "12px", color: "#444", marginBottom: "16px" }}>
                  {product.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "16px", color: "#fff", fontWeight: "700" }}>
                    ₦{product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      background: "rgba(124,92,252,0.15)",
                      color: "#7c5cfc",
                      border: "1px solid rgba(124,92,252,0.3)",
                      borderRadius: "8px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}