import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ADMIN_EMAIL = "ayoakanni175@gmail.com";

function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav" style={{ position: "relative" }}>

      {/* Logo */}
      <Link to="/" className="nav-logo">Gadget<span>store</span></Link>

      {/* Desktop links — hidden on mobile */}
      <ul className="nav-links hidden md:flex">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/deals">Deals</Link></li>
        {user && user.email === ADMIN_EMAIL && (
          <li><Link to="/admin" style={{ color: "#7c5cfc" }}>Admin</Link></li>
        )}
      </ul>

      {/* Desktop auth — hidden on mobile */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
          🛒 {cartCount > 0 && <span>({cartCount})</span>}
        </Link>
        {user ? (
          <>
            <span style={{ color: "#fff", fontSize: "13px" }}>Hi, {user.displayName}</span>
            <button onClick={logout} style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#aaa",
              padding: "7px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: "pointer",
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none", fontSize: "13px" }}>Login</Link>
            <Link to="/signup" style={{
              background: "#7c5cfc",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
            }}>Sign up</Link>
          </>
        )}
      </div>

      {/* Mobile — cart + hamburger, hidden on desktop */}
      <div className="flex md:hidden items-center gap-4">
        <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
          🛒 {cartCount > 0 && <span>({cartCount})</span>}
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTop: "none",
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 999,
        }}>
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ color: "#888", textDecoration: "none", fontSize: "14px" }}>Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} style={{ color: "#888", textDecoration: "none", fontSize: "14px" }}>Products</Link>
          <Link to="/deals" onClick={() => setMenuOpen(false)} style={{ color: "#888", textDecoration: "none", fontSize: "14px" }}>Deals</Link>
          {user && user.email === ADMIN_EMAIL && (
            <Link to="/admin" onClick={() => setMenuOpen(false)} style={{ color: "#7c5cfc", textDecoration: "none", fontSize: "14px" }}>Admin</Link>
          )}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {user ? (
              <>
                <span style={{ color: "#fff", fontSize: "13px" }}>Hi, {user.displayName}</span>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#aaa",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    padding: "10px 16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: "#7c5cfc",
                    color: "#fff",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;