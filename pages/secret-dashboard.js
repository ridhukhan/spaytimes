import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [authorised, setAuthorised] = useState(false);

  // ⚙️ আপনার ক্লাউডিনারি ইনফরমেশন এখানে বসান
  const CLOUD_NAME = "dfzaefrkt"; // 👈 আপনার Cloudinary Cloud Name এখানে দিন
  const UPLOAD_PRESET = "spaytimes_preset"; // 👈 ধাপ ১ এ তৈরি করা Unsigned Preset নাম দিন

  useEffect(() => {
    const isLoggedAdmin = localStorage.getItem("adminLoggedIn");
    if (!isLoggedAdmin) {
      router.push("/admin-login");
    } else {
      setAuthorised(true);
    }
  }, [router]);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    url: "",
    imageAlt: "",
    metaKeywords: "",
    section1h: "",
    section1b: "",
    section2h: "",
    section2b: "",
    section3h: "",
    section3b: "",
    section4h: "",
    section4b: "",
    section5h: "",
    section5b: "",
    section6h: "",
    section6b: "",
    section7h: "",
    section7b: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false); // ইমেজ আপলোডিং স্টেট

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📸 সরাসরি ক্লাউডিনারিতে ইমেজ আপলোড করার ফাংশন
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET); // Unsigned Preset

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );
      const fileData = await res.json();

      if (fileData.secure_url) {
        // আপলোড সফল হলে অটোমেটিক ইমেজ ইউআরএল ইনপুটে বসে যাবে
        setFormData((prev) => ({ ...prev, image: fileData.secure_url }));
        alert("📸 ছবি সাকসেসফুলি আপলোড হয়েছে!");
      } else {
        alert(
          "ইমেজ আপলোড করতে সমস্যা হয়েছে। Preset ও Cloud Name ঠিক আছে কি না চেক করুন।",
        );
      }
    } catch (err) {
      console.error(err);
      alert("ক্লাউডিনারি সার্ভারে কানেক্ট করা যাচ্ছে না!");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedData = { ...formData };

    Object.keys(cleanedData).forEach((key) => {
      if (
        cleanedData[key] === "" ||
        cleanedData[key] === null ||
        cleanedData[key] === undefined
      ) {
        delete cleanedData[key];
      }
    });

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const data = await res.json();

      if (data.success) {
        alert("🎉 খবর একদম লাইভ হয়ে গেছে ভাই!");
        setFormData({
          title: "",
          image: "",
          description: "",
          url: "",
          imageAlt: "",
          metaKeywords: "",
          section1h: "",
          section1b: "",
          section2h: "",
          section2b: "",
          section3h: "",
          section3b: "",
          section4h: "",
          section4b: "",
          section5h: "",
          section5b: "",
          section6h: "",
          section6b: "",
          section7h: "",
          section7b: "",
        });
      } else {
        alert("ঝামেলা হয়েছে: " + (data.error || "Unknown server error"));
      }
    } catch (err) {
      alert("সার্ভার রেসপন্স করছে না বা ৫০২ এরর এসেছে!");
    } finally {
      setLoading(false);
    }
  };

  if (!authorised)
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: "100px" }}>
        চেক করা হচ্ছে...
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        background: "#1a1a1a",
        color: "#fff",
        borderRadius: "10px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#ff4d4d" }}>
        NEWS UPLOAD DASHBOARD
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <label>খবরের মূল টাইটেল (HTML ট্যাগসহ):</label>
        <input
          style={inputStyle}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* 🚀 নতুন ডিরেক্ট ফাইল আপলোড সেকশন */}
        <label style={{ fontWeight: "bold", color: "#38bdf8" }}>
          সরাসরি পিসি/মোবাইল থেকে ইমেজ আপলোড করুন:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            padding: "10px",
            background: "#222",
            border: "1px dashed #38bdf8",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
          }}
        />
        {uploadingImage && (
          <span style={{ color: "#38bdf8", fontSize: "14px" }}>
            ⏳ ক্লাউডিনারিতে আপলোড হচ্ছে, একটু অপেক্ষা করুন...
          </span>
        )}

        <label>অথবা ক্লাউডিনারি ইমেজ ইউআরএল (অটোমেটিক বসে যাবে):</label>
        <input
          style={inputStyle}
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="ফাইল সিলেক্ট করলে এখানে অটোমেটিক ইউআরএল চলে আসবে"
        />

        {/* প্রিভিউ দেখানোর জন্য ছোট একটা উইন্ডো */}
        {formData.image && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontSize: "12px", color: "#4ade80" }}>
              📸 আপলোড করা ছবির প্রিভিউ:
            </p>
            <img
              src={formData.image}
              alt="Preview"
              style={{
                maxWidth: "200px",
                borderRadius: "6px",
                border: "1px solid #444",
              }}
            />
          </div>
        )}

        <label>img name (Image Alt):</label>
        <input
          style={inputStyle}
          type="text"
          name="imageAlt"
          value={formData.imageAlt}
          onChange={handleChange}
          placeholder="write image name"
        />

        <label>এসইઓ মেটা কিওয়ার্ড (Meta Keywords - কমা দিয়ে):</label>
        <input
          style={inputStyle}
          type="text"
          name="metaKeywords"
          value={formData.metaKeywords}
          onChange={handleChange}
          placeholder="যেমন: instagram, reels viral, tricks 2026"
        />

        <label>মূল ডেসক্রিপশন (&lt;p&gt;ট্যাগসহ):</label>
        <textarea
          style={textStyle}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>কাস্টম ইউআরএল পাথ:</label>
        <input
          style={inputStyle}
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          placeholder="space না দিয়ে dash (-) ব্যবহার করুন"
        />

        <hr style={{ borderColor: "#333", margin: "20px 0" }} />
        <h3>সাব-সেকশন সমূহ (ঐচ্ছিক):</h3>

        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div
            key={num}
            style={{
              background: "#222",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          >
            <span style={{ color: "#ff4d4d", fontWeight: "bold" }}>
              সেকশন {num}
            </span>
            <input
              style={inputStyle}
              type="text"
              name={`section${num}h`}
              value={formData[`section${num}h`] || ""}
              onChange={handleChange}
              placeholder={`সেকশন ${num} এর হেড ট্যাগ`}
            />
            <textarea
              style={textStyle}
              name={`section${num}b`}
              value={formData[`section${num}b`] || ""}
              onChange={handleChange}
              placeholder={`সেকশন ${num} এর বডি বা প্যারাগ্রাফ ট্যাগ`}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading || uploadingImage}
          style={{
            background: loading || uploadingImage ? "#555" : "#ff4d4d",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: loading || uploadingImage ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "আপলোড হচ্ছে..." : "লাইভ পাবলিশ করুন 🚀"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  background: "#333",
  border: "1px solid #444",
  color: "#fff",
  borderRadius: "4px",
  boxSizing: "border-box",
};
const textStyle = {
  width: "100%",
  padding: "10px",
  background: "#333",
  border: "1px solid #444",
  color: "#fff",
  borderRadius: "4px",
  boxSizing: "border-box",
  height: "80px",
  resize: "vertical",
};
