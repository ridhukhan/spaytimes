import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // 🎯 রাউটার ইম্পোর্ট করলাম রিডাইরেক্ট করার জন্
export default function Dashboard() {
  const router = useRouter();

  const [authorised, setAuthorised] = useState(false);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🎯 ম্যাজিক ট্রিক: খালি ইনপুটগুলো ডাটাবেজে পাঠানোর আগেই ছেঁকে ফেলে দেওয়া হচ্ছে
    const cleanedData = { ...formData };
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key] === "" || cleanedData[key] === null) {
        delete cleanedData[key]; // খালি থাকলে ওই ফিল্ডটা ডাটাবেজেই যাবে না!
      }
    });

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData), // 🎯 এখানে cleanedData পাঠানো হচ্ছে
      });
      const data = await res.json();

      if (data.success) {
        alert("🎉 খবর একদম লাইভ হয়ে গেছে ভাই!");
        setFormData({
          title: "",
          image: "",
          description: "",
          url: "",
          imageAlt: "",
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
        alert("ঝামেলা হয়েছে: " + data.error);
      }
    } catch (err) {
      alert("সার্ভার কানেক্ট হচ্ছে না!");
    } finally {
      setLoading(false);
    }
  };
  if (!authorised) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: "100px" }}>
        চেক করা হচ্ছে...
      </div>
    );
  }
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
        <label>
          খবরের মূল টাইটেল (HTML ট্যাগসহ যেমন: &lt;h3&gt;খবর&lt;/h3&gt;):
        </label>
        <input
          style={inputStyle}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>ক্লাউডিনারি ইমেজ ইউআরএল (Image URL):</label>
        <input
          style={inputStyle}
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://res.cloudinary.com/..."
        />
        <label>img name (Image Alt):</label>
        <input
          style={inputStyle}
          type="text"
          name="imageAlt"
          value={formData.imageAlt}
          onChange={handleChange}
          placeholder="write image name"
        />

        <label>মূল ডেসক্রিপশন (&lt;p&gt;ট্যাগসহ):</label>
        <textarea
          style={textStyle}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>কাস্টম ইউআরএল পাথ (যেমন: nstagram-viral-tricks):</label>
        <input
          style={inputStyle}
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          placeholder="space না দিয়ে dash (-) ব্যবহার করুন"
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
              value={formData[`section${num}h`]}
              onChange={handleChange}
              placeholder={`সেকশন ${num} এর হেড ট্যাগ`}
            />
            <textarea
              style={textStyle}
              name={`section${num}b`}
              value={formData[`section${num}b`]}
              onChange={handleChange}
              placeholder={`সেকশন ${num} এর বডি বা প্যারাগ্রাফ ট্যাগ`}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#ff4d4d",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
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
