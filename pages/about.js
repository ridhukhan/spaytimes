import React from "react";
import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - SPayTimes News</title>
        <meta
          name="description"
          content="Learn more about SPayTimes News, your trusted source for the latest global politics, technology, business, and breaking news."
        />
      </Head>

      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "30px 20px",
          color: "#fff",
          backgroundColor: "#111",
          fontFamily: "sans-serif",
          lineHeight: "1.8",
        }}
      >
        {/* মেইন হেডিং */}
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#ff4d4d",
            textAlign: "center",
            marginBottom: "30px",
            borderBottom: "2px solid #222",
            paddingBottom: "15px",
          }}
        >
          About Us
        </h1>

        {/* ইন্ট্রোডাকশন */}
        <p style={{ fontSize: "17px", color: "#ddd", marginBottom: "25px" }}>
          Welcome to <strong>SPayTimes News</strong>, your trusted destination
          for the latest, most accurate, and breaking global news. We are
          dedicated to providing you with real-time updates from around the
          world, with a sharp focus on politics, technology, business,
          entertainment, and trending global events.
        </p>

        {/* আওয়ার মিশন সেকশন */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "#ff4d4d", fontSize: "24px", marginBottom: "10px" }}
          >
            Our Mission
          </h2>
          <p style={{ fontSize: "16px", color: "#ccc" }}>
            At SPayTimes News, our mission is simple: to deliver unbiased,
            fact-checked, and comprehensive journalism to our global audience.
            In an era of fast-moving information, we strive to filter out the
            noise and bring you stories that matter, keeping you informed and
            ahead of the curve.
          </p>
        </div>

        {/* আমরা কি কি কভার করি */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "#ff4d4d", fontSize: "24px", marginBottom: "12px" }}
          >
            What We Cover
          </h2>
          <ul style={{ paddingLeft: "20px", color: "#ccc", fontSize: "16px" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: "#fff" }}>Global Politics:</strong> Deep
              insights and breaking updates on international relations,
              governance, and political shifts worldwide.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: "#fff" }}>
                Technology & Innovation:
              </strong>{" "}
              The latest from the tech industry, including gadget reviews, AI
              breakthroughs, and digital trends.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: "#fff" }}>Business & Finance:</strong>{" "}
              Market updates, economic insights, and business stories that shape
              the global economy.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: "#fff" }}>Breaking News:</strong> Instant
              coverage of major events happening across the globe, delivered as
              they unfold.
            </li>
          </ul>
        </div>

        {/* কেন আমাদের পছন্দ করবেন */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{ color: "#ff4d4d", fontSize: "24px", marginBottom: "10px" }}
          >
            Why Choose Us?
          </h2>
          <p style={{ fontSize: "16px", color: "#ccc" }}>
            We believe in the power of truth and integrity. Our team works
            tirelessly to ensure that every piece of news published on our
            platform is sourced responsibly and presented clearly. Whether you
            are looking for deep analysis or a quick daily update, SPayTimes
            News is designed to give you a smooth and reliable reading
            experience.
          </p>
        </div>

        <hr style={{ borderColor: "#333", margin: "40px 0" }} />

        {/* ফুটার/ধন্যবাদ মেসেজ */}
        <p
          style={{
            textAlign: "center",
            color: "#aaa",
            fontSize: "15px",
            fontStyle: "italic",
          }}
        >
          Thank you for visiting our site. Stay connected, stay informed!
        </p>
      </div>
    </>
  );
};

export default About;
