"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#070708",
    }}>
      <div style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "48px",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%",
      }}>
        <h1 style={{
          fontFamily: "sans-serif",
          fontSize: "24px",
          color: "#fff",
          marginBottom: "8px",
        }}>
          Welcome to GearHub
        </h1>
        <p style={{ color: "#555", fontSize: "14px", marginBottom: "32px" }}>
          Sign in to continue shopping
        </p>
        <button
          onClick={signInWithGoogle}
          style={{
            width: "100%",
            padding: "14px",
            background: "#fff",
            color: "#111",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <img
            src="https://www.google.com/favicon.ico"
            width="18"
            height="18"
            alt="Google"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}