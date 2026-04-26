import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../lib/getProducts";
import { useCart } from "../context/CartContext";
import Navbar from "../Shared components/Navbar";

const placeholderProducts = [
  {
    id: "1",
    name: "Magsafe Phone Case",
    category: "phone",
    price: 8500,
    description: "Premium magsafe case for iPhone 15",
    image: "https://placehold.co/400x300?text=Phone+Case",
  },
  {
    id: "2",
    name: "65W GaN Charger",
    category: "phone",
    price: 12000,
    description: "Fast charging for all devices",
    image: "https://placehold.co/400x300?text=Charger",
  },
  {
    id: "3",
    name: "Aluminium Laptop Stand",
    category: "laptop",
    price: 15000,
    description: "Ergonomic stand for all laptops",
    image: "https://placehold.co/400x300?text=Laptop+Stand",
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    category: "laptop",
    price: 22000,
    description: "Bluetooth 5.0 earbuds",
    image: "https://placehold.co/400x300?text=Earbuds",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      let data = null; // ✅ declare outside try/catch

      try {
        data = await getProductById(id); // ✅ just assign, no conditional
      } catch (error) {
        console.error("Error fetching product:", error);
      }

      // ✅ conditional is now outside try/catch
      const result = data || placeholderProducts.find((p) => p.id === id);
      setProduct(result);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-gray-500 p-10">Loading...</p>;
  if (!product) return <p className="text-gray-500 p-10">Product not found.</p>;

  const images = product.images?.length ? product.images : [product.image];

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 md:px-12 py-8 bg-[#070708]">
        <div className="hero-bg" />
        <div className="hero-grid" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 border border-white/10 px-4 py-2 rounded-lg text-sm mb-8 hover:text-white transition"
        >
          ← Back
        </button>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Image Gallery */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-72 md:h-96 rounded-2xl object-cover"
            />

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${product.name} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full h-16 object-cover rounded-lg cursor-pointer transition border-2 ${
                      selectedImage === index
                        ? "border-[#7c5cfc]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-[#7c5cfc] text-xs uppercase tracking-widest mb-3">
              {product.category}
            </p>
            <h1 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              {product.name}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="text-white text-3xl font-bold mb-8">
              ₦{product.price.toLocaleString()}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="w-full py-4 bg-[#7c5cfc] text-white rounded-xl font-medium text-sm hover:bg-[#6a4de8] transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}