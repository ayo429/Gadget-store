import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Navbar from "../Shared components/Navbar";

const ADMIN_EMAIL = "ayoakanni175@gmail.com";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "phone",
    description: "",
    images: [], // ✅ array not single string
    deal: false,
  });

  useEffect(() => {
    if (user && user.email !== ADMIN_EMAIL) navigate("/");
    if (!user) navigate("/");
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setUploading(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.description || !form.images.length) {
      alert("Please fill in all fields and upload at least one image");
      return;
    }

    const productData = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      images: form.images,       // ✅ all images
      image: form.images[0],     // ✅ first image as thumbnail
      deal: form.deal,
    };

    if (editingProduct) {
      await updateDoc(doc(db, "products", editingProduct.id), productData);
      setEditingProduct(null);
    } else {
      await addDoc(collection(db, "products"), productData);
    }

    setForm({
      name: "",
      price: "",
      category: "phone",
      description: "",
      images: [], // ✅ reset to empty array
      deal: false,
    });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      images: product.images || [product.image] || [], // ✅ handle both old and new format
      deal: product.deal || false,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const inputClass =
    "w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white text-sm outline-none mb-4 focus:border-[#7c5cfc] transition";

  return (
    <>
      <div className="hero-bg" />
      <div className="hero-grid" />
      <Navbar />

      <div className="bg-[#070708] min-h-screen px-4 md:px-12 py-8">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-1">Admin Panel</h1>
        <p className="text-gray-500 text-sm mb-10">Manage your products</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Add/Edit Product Form */}
          <div className="bg-[#0e0e10] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-white text-base font-semibold mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="number"
              name="price"
              placeholder="Price (₦)"
              value={form.price}
              onChange={handleChange}
              className={inputClass}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
              <option value="others">Others</option>
            </select>

            <textarea
              name="description"
              placeholder="Product description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none`}
            />

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-400 text-xs mb-2">
                Product Images (select multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="text-gray-400 text-sm"
              />
              {uploading && (
                <p className="text-[#7c5cfc] text-xs mt-2">Uploading...</p>
              )}

              {/* Image previews grid */}
              {form.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {form.images.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-[#7c5cfc] text-white text-[9px] px-1.5 py-0.5 rounded">
                          Main
                        </span>
                      )}
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Deal checkbox */}
            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                id="deal"
                checked={form.deal}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, deal: e.target.checked }))
                }
                className="w-4 h-4 cursor-pointer accent-[#7c5cfc]"
              />
              <label htmlFor="deal" className="text-gray-400 text-sm cursor-pointer">
                Mark as Deal
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-[#7c5cfc] text-white rounded-xl text-sm font-medium hover:bg-[#6a4de8] transition"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
              {editingProduct && (
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setForm({
                      name: "",
                      price: "",
                      category: "phone",
                      description: "",
                      images: [],
                      deal: false,
                    });
                  }}
                  className="px-5 py-3 bg-transparent text-gray-400 border border-white/10 rounded-xl text-sm hover:border-white/20 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Products List */}
          <div>
            <h2 className="text-white text-base font-semibold mb-6">
              Products ({products.length})
            </h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="flex flex-col gap-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#0e0e10] border border-white/5 rounded-xl p-4 flex items-center gap-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-semibold mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-[#7c5cfc] text-xs mb-1">
                        ₦{product.price.toLocaleString()}
                      </p>
                      {product.images && (
                        <p className="text-gray-600 text-[10px]">
                          {product.images.length} image{product.images.length > 1 ? "s" : ""}
                        </p>
                      )}
                      {product.deal && (
                        <span className="text-[10px] bg-[#7c5cfc]/15 text-[#7c5cfc] px-2 py-0.5 rounded-full border border-[#7c5cfc]/30">
                          Deal
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-[#7c5cfc]/15 text-[#7c5cfc] border border-[#7c5cfc]/30 rounded-lg px-3 py-1.5 text-xs hover:bg-[#7c5cfc]/25 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg px-3 py-1.5 text-xs hover:bg-red-500/20 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}