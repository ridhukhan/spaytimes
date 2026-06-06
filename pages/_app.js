import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      {/* 🍔 হ্যামবার্গার টগল বাটন */}
      <div
        style={{
          height: "40px",
          width: "40px",
          backgroundColor: clicked ? "#ff4d4d" : "#111",
          zIndex: 10000,
          position: "fixed",
          top: "20px",
          left: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
        }}
        onClick={() => setClicked(!clicked)}
      >
        <div
          style={{
            height: "3px",
            backgroundColor: "#fff",
            width: "22px",
            margin: "2px 0",
            borderRadius: "2px",
          }}
        ></div>
        <div
          style={{
            height: "3px",
            backgroundColor: "#fff",
            width: "22px",
            margin: "2px 0",
            borderRadius: "2px",
          }}
        ></div>
        <div
          style={{
            height: "3px",
            backgroundColor: "#fff",
            width: "22px",
            margin: "2px 0",
            borderRadius: "2px",
          }}
        ></div>
      </div>

      {/* 📱 ফুল স্ক্রিন ওভারলে মেনু */}
      {clicked ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.5s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <a
              href="/"
              onClick={() => setClicked(false)}
              style={{
                fontSize: "28px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              Home
            </a>
            <a
              href="/blog"
              onClick={() => setClicked(false)}
              style={{
                fontSize: "28px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              Blog
            </a>
            <a
              href="/about"
              onClick={() => setClicked(false)}
              style={{
                fontSize: "28px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              About
            </a>
            <a
              href="/contact"
              onClick={() => setClicked(false)}
              style={{
                fontSize: "28px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              Contact
            </a>
          </div>
        </div>
      ) : null}

      {/* 📄 মেইন পেজের কন্টেন্ট */}
      <Component {...pageProps} />
    </>
  );
}
