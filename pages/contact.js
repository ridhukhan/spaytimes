import React from "react";
import Head from "next/head";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact Us - SPayTimes News</title>
        <meta
          name="description"
          content="Get in touch with SPayTimes News. Contact us via email, Facebook, Instagram, or WhatsApp for any inquiries."
        />
      </Head>

      <div
        className="contactmain"
        style={{
          maxWidth: "700px",
          margin: "50px auto",
          padding: "30px 20px",
          color: "#fff",
          backgroundColor: "#111",
          fontFamily: "sans-serif",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* হেডার সেকশন */}
        <div style={{ marginBottom: "35px" }}>
          <h1
            style={{
              color: "#fff",
              backgroundColor: "#ff4d4d",
              padding: "15px 20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              borderRadius: "10px",
              fontSize: "28px",
              fontWeight: "bold",
              display: "inline-block",
              margin: "0 0 15px 0",
            }}
          >
            Want to Connect with Me?
          </h1>
          <p style={{ color: "#aaa", fontSize: "16px", margin: "5px 0 0 0" }}>
            Have questions, feedback, or business inquiries? Reach out anytime!
          </p>
        </div>

        {/* ইমেইল সেকশন (অ্যাডসেন্সের জন্য মোস্ট ইম্পর্ট্যান্ট) */}
        <div
          style={{
            background: "#1e293b",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "30px",
            border: "1px solid #334155",
          }}
        >
          <span
            style={{
              color: "#ff4d4d",
              fontWeight: "bold",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Official Email:
          </span>
          <a
            href="mailto:riyadkhan9904@gmail.com"
            style={{
              color: "#38bdf8",
              fontSize: "18px",
              textDecoration: "none",
              fontWeight: "600",
              wordBreak: "break-all",
            }}
          >
            riyadkhan9904@gmail.com
          </a>
        </div>

        <h3 style={{ color: "#fff", marginBottom: "20px", fontSize: "20px" }}>
          Follow or Chat Directly:
        </h3>

        {/* সোশ্যাল মিডিয়া ও কল লিংকস গ্রিড */}
        <div
          className="contactus"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {/* Facebook */}
          <a
            href="https://www.facebook.com/riiiiiyad2/"
            target="_blank"
            rel="noopener noreferrer"
            style={cardStyle}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
              alt="fb"
              style={iconStyle}
            />
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Facebook
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ridhu_khan1/"
            target="_blank"
            rel="noopener noreferrer"
            style={cardStyle}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png"
              alt="insta"
              style={iconStyle}
            />
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Instagram
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801836974525/"
            target="_blank"
            rel="noopener noreferrer"
            style={cardStyle}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/733/733585.png"
              alt="whatsapp"
              style={iconStyle}
            />
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              WhatsApp
            </span>
          </a>

          {/* Call Me */}
          <a href="tel:+8801742979691" style={cardStyle}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/483/483947.png"
              alt="call now"
              style={iconStyle}
            />
            <span style={{ fontSize: "15px", fontWeight: "500" }}>Call Me</span>
          </a>
        </div>
      </div>
    </>
  );
};

// কার্ডগুলোর কমন স্টাইল লজিক
const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "15px 10px",
  background: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  textDecoration: "none",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

// আইকনগুলোর সাইজ স্টাইল
const iconStyle = {
  width: "35px",
  height: "35px",
  objectFit: "contain",
};

export default Contact;
