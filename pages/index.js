import { client } from "../sanity/lib/client.js";
// 🎯 এই যে এখানে urlFor ইম্পোর্ট করা বাকি ছিল, যা আমরা যোগ করে দিলাম!
import { urlFor } from "../sanity/lib/client.js"; // আপনার প্রজেক্টের পাথ অনুযায়ী client ফাইলের লোকেশন ঠিক রাখুন
import Link from "next/link";

export async function getStaticProps() {
  const posts = await client.fetch(
    `*[_type == "post"]{ title, slug, mainImage }`,
  );

  return {
    props: { posts },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#0f172a", // পুরো ওয়েবসাইটের ব্যাকগ্রাউন্ড ডার্ক
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      {/* 🌌 জোসসস হিরো সেকশন */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px 20px",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          textAlign: "center",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
          margin: "10px auto 40px auto",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            letterSpacing: "4px",
            margin: "0 0 10px 0",
            background: "linear-gradient(to right, #38bdf8, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase",
          }}
        >
          SPAY TIMES
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#94a3b8",
            letterSpacing: "2px",
            margin: "0 0 20px 0",
            fontWeight: "400",
            textTransform: "lowercase",
          }}
        >
          multiflavor news
        </p>
        <hr
          style={{
            width: "80px",
            border: "none",
            height: "4px",
            background: "linear-gradient(to right, #38bdf8, #c084fc)",
            borderRadius: "2px",
            margin: "0",
          }}
        />
      </div>

      {/* 📰 ব্লগ পোস্ট লিস্ট সেকশন */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.slug.current}
              style={{
                marginBottom: "30px",
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
            >
              <Link
                href={`/blog/${post.slug.current}`}
                style={{ textDecoration: "none" }}
              >
                {/* 📸 ইমেজ সেকশন */}
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px",
                    }}
                  />
                )}

                {/* 📝 পোস্টের টাইটেল */}
                <h2
                  style={{
                    fontSize: "24px",
                    color: "#38bdf8", // নিয়ন ব্লু কালার লিংক টাইটেল
                    margin: "0",
                    fontWeight: "600",
                  }}
                >
                  {post.title}
                </h2>
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            কোনো পোস্ট পাওয়া যায়নি! স্যানিটি স্টুডিওতে পোস্ট পাবলিশ করেছেন তো?
          </p>
        )}
      </div>
    </div>
  );
}
