import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts, getProductsByCategory } from "../lib/getProducts";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../Shared components/Navbar";

const PRODUCTS_PER_PAGE = 8;

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const typeFromURL = params.get("type");

  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState(typeFromURL || "all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (typeFromURL) setFilter(typeFromURL);
  }, [typeFromURL]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  // Filter and search
  const filteredProducts = allProducts.filter((p) => {
    const matchesFilter = filter === "all" || p.category === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <>
      <div className="hero-bg" />
      <div className="hero-grid" />
      <Navbar />
      <div
        style={{
          padding: "40px 48px",
          background: "#070708",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ fontSize: "28px", color: "#fff", marginBottom: "32px" }}>
          All Products
        </h1>

        {/* Search Bar */}
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              background: "#0e0e10",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#7c5cfc")}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.08)")
            }
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#555",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
          {["all", "phone", "laptop", "others"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: filter === f ? "#7c5cfc" : "rgba(255,255,255,0.1)",
                background: filter === f ? "#7c5cfc" : "transparent",
                color: "#fff",
                cursor: "pointer",
                textTransform: "capitalize",
                fontSize: "13px",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search results count */}
        {search && (
          <p style={{ color: "#555", fontSize: "13px", marginBottom: "20px" }}>
            {filteredProducts.length} result
            {filteredProducts.length !== 1 ? "s" : ""} for "
            <span style={{ color: "#7c5cfc" }}>{search}</span>"
          </p>
        )}

        {/* Products Grid */}
        {loading ? (
          <p style={{ color: "#555" }}>Loading products...</p>
        ) : currentProducts.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: "60px" }}>
            <p style={{ fontSize: "40px", marginBottom: "16px" }}>🔍</p>
            <p style={{ color: "#555", fontSize: "14px" }}>No products found</p>
            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              style={{
                marginTop: "16px",
                background: "#7c5cfc",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 24px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              // style={{
              //   display: "grid",
              //   gridTemplateColumns: "repeat(4, 1fr)",
              //   gap: "16px",
              // }}
            >
              {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      background: "#0e0e10",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                     <Link to={`/products/${product.id}`} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    </Link>
                    <div style={{ padding: "16px" }}>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#7c5cfc",
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                          marginBottom: "6px",
                        }}
                      >
                        {product.category}
                      </p>
                      <h3
                        style={{
                          fontSize: "14px",
                          color: "#fff",
                          marginBottom: "4px",
                        }}
                      >
                        {product.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#444",
                          marginBottom: "16px",
                        }}
                      >
                        {product.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "16px",
                            color: "#fff",
                            fontWeight: "700",
                          }}
                        >
                          ₦{product.price.toLocaleString()}
                        </span>
                        <button
                          className="product-add"
                          onClick={() => addToCart(product)}
                          // style={{
                          //   background: "rgba(124,92,252,0.15)",
                          //   color: "#7c5cfc",
                          //   border: "1px solid rgba(124,92,252,0.3)",
                          //   borderRadius: "8px",
                          //   padding: "6px 14px",
                          //   fontSize: "12px",
                          //   cursor: "pointer",
                          // }}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>

              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "48px",
                }}
              >
                {/* Prev button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: currentPage === 1 ? "#333" : "#aaa",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontSize: "13px",
                  }}
                >
                  ← Prev
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "1px solid",
                        borderColor:
                          currentPage === page
                            ? "#7c5cfc"
                            : "rgba(255,255,255,0.1)",
                        background:
                          currentPage === page ? "#7c5cfc" : "transparent",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      {page}
                    </button>
                  ),
                )}

                {/* Next button */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: currentPage === totalPages ? "#333" : "#aaa",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    fontSize: "13px",
                  }}
                >
                  Next →
                </button>
              </div>
            )}

            {/* Page info */}
            <p
              style={{
                textAlign: "center",
                color: "#333",
                fontSize: "12px",
                marginTop: "16px",
              }}
            >
              Showing {startIndex + 1}–
              {Math.min(
                startIndex + PRODUCTS_PER_PAGE,
                filteredProducts.length,
              )}{" "}
              of {filteredProducts.length} products
            </p>
          </>
        )}
      </div>
    </>
  );
}
