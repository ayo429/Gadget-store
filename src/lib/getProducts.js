import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Get all products
export async function getAllProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get products by category
export async function getProductsByCategory(category) {
  const q = query(
    collection(db, "products"),
    where("category", "==", category)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get single product by ID
export async function getProductById(id) {
  const { doc, getDoc } = await import("firebase/firestore");
  const ref = doc(db, "products", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}