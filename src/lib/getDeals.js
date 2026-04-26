import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getDeals() {
  const q = query(
    collection(db, "products"),
    where("deal", "==", true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}