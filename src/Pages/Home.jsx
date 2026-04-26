import React from "react";
import Navbar from "../Shared components/Navbar";
import { Link } from "react-router-dom";
import Products from "../Data/Products";
function Home() {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow">Premium Tech Accessories</div>
          <h1>
            Gear Up Your <em>Phone</em> &amp; <em>Laptop</em> Game
          </h1>
          <p className="hero-desc">
            Top-quality cases, chargers, stands, and more — delivered across
            Nigeria. Order in seconds via WhatsApp.
          </p>
          <div className="hero-actions flex justify-start">
            <Link to="/Products" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="hero-cards">
          <div className="hero-pill">
            <div className="hero-pill-icon">📱</div>
            <div className="hero-pill-text">
              <strong>Phone Accessories</strong>
              <span>Cases, chargers, protectors</span>
            </div>
          </div>
          <div className="hero-pill">
            <div className="hero-pill-icon">💻</div>
            <div className="hero-pill-text">
              <strong>Laptop Accessories</strong>
              <span>Stands, bags, keyboards</span>
            </div>
          </div>
          <div className="hero-pill">
            <div className="hero-pill-icon">🚚</div>
            <div className="hero-pill-text">
              <strong>Fast Delivery</strong>
              <span>Same day in Lagos</span>
            </div>
          </div>
        </div>
      </section>
      {/* STATS */}
      <div className="stats">
        <div className="stat">
          <div className="stat-number">
            500<span>+</span>
          </div>
          <div className="stat-label">Products Available</div>
        </div>
        <div className="stat">
          <div className="stat-number">
            2k<span>+</span>
          </div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat">
          <div className="stat-number">
            24<span>h</span>
          </div>
          <div className="stat-label">WhatsApp Support</div>
        </div>
      </div>
      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="section-header">
          <div>
            <div className="section-tag">Hand Picked</div>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link to="/Products" className="section-link">
            View all →
          </Link>
        </div>
        <div className="products-grid">
          {Products.map((p) => (
            <div
              className="product-card"
            >
              <div className="product-thumb">{p.icon}</div>
              <div className="product-body">
                <div className="product-type">{p.type}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-cat">{p.category}</div>
                {/* <div className="product-footer">
                  <span className="product-price">
                    ₦{p.price.toLocaleString()}
                  </span>
                  <button className="product-add">Add to cart</button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* PROMO BANNER */}
      <div className="banner-wrap">
        <div className="banner">
          <div>
            <div className="banner-badge">Limited Time Offer</div>
            <h3>Free delivery on orders above ₦20,000</h3>
            <p>
              Order via WhatsApp and get your accessories delivered same day in
              Abuja.
            </p>
          </div>
          <a
            href="https://wa.me/2348124639774"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
      {/* FOOTER */}
      <footer>
        <p>© 2025 GearHub. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </>
  );
}

export default Home;
