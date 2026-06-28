import clientPromise from "@/lib/mongodb"; // মঙ্গোডিবি ক্লায়েন্ট
import { client, urlFor } from "../sanity/lib/client"; // স্যানিটি ক্লায়েন্ট ও urlFor পাথ
import Link from "next/link";
import Head from "next/head";

export default function Home({ latestNews, latestBlogs, latestent }) {
  return (
    <>
      <Head>
        <title>SpayTimes News & Blogs - Global Updates</title>
        <meta
          name="description"
          content="Welcome to SPayTimes. Read the latest news and insightful blogs from around the world."
        />
      </Head>

      {/* 🎯 হোভার ইফেক্টের জন্য গ্লোবাল স্টাইল ইনজেকশন */}
      <style jsx global>{`
        .scroll-card {
          flex: 0 0 280px;
          scroll-snap-align: start;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        /* মাউস নিলে কার্ডটি উপরে উঠবে এবং বর্ডার গ্লো করবে */
        .scroll-card:hover {
          transform: translateY(-8px);
          border-color: #38bdf8;
          box-shadow: 0 8px 25px rgba(56, 189, 248, 0.2);
        }
        /* স্ক্রোলবার কাস্টমাইজেশন (দেখতে সুন্দর লাগার জন্য) */
        .scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: #38bdf8;
        }
      `}</style>

      <div
        style={{
          backgroundColor: "#0f172a",
          color: "#fff",
          fontFamily: "'Segoe UI', Roboto, sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* ==================== ⚡ HERO SECTION ==================== */}
        <div style={heroSectionStyle}>
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}
          >
            <h1 style={heroTitleStyle}>
              Welcome to <span style={{ color: "#ff4d4d" }}>SPayTimes</span>{" "}
              News
            </h1>
            <p style={heroSubTitleStyle}>
              Your premier destination for the latest global breaking news,
              insightful tech blogs, national politics, and trending updates.
              Delivered fast, fresh, and unbiased.
            </p>
          </div>
        </div>

        {/* মেইন কন্টেন্ট এরিয়া */}
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 15px" }}
        >
          {/* ==================== ১. নিউজ সেকশন (মঙ্গোডিবি থেকে) ==================== */}
          <section style={{ marginBottom: "50px" }}>
            <div style={sectionHeaderStyle}>
              <h2
                style={{
                  color: "#ff4d4d",
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "700",
                }}
              >
                🔥 Latest News
              </h2>
              <Link href="/news" style={viewAllButtonStyle}>
                View All ➔
              </Link>
            </div>

            <div className="scroll-container" style={scrollContainerStyle}>
              {latestNews && latestNews.length > 0 ? (
                latestNews.map((news) => {
                  const pureTitleForAlt = news.title
                    ? news.title.replace(/<[^>]*>/g, "")
                    : "news";
                  return (
                    <div key={news._id} className="scroll-card">
                      <Link
                        href={`/news/${news.url}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {news.image && news.image.trim() !== "" && (
                          <img
                            src={news.image}
                            alt={news.imageAlt || pureTitleForAlt}
                            style={imageStyle}
                          />
                        )}
                        <div style={{ padding: "15px" }}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: news.title || "Untitled",
                            }}
                            style={titleStyle}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#94a3b8", paddingLeft: "10px" }}>
                  No news found!
                </p>
              )}
            </div>
          </section>

          {/* ==================== ২. ব্লগ সেকশন (স্যানিটি থেকে) ==================== */}
          <section style={{ marginBottom: "50px" }}>
            <div style={sectionHeaderStyle}>
              <h2
                style={{
                  color: "#38bdf8",
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "700",
                }}
              >
                ✍️ Recent Blogs
              </h2>
              <Link href="/blog" style={viewAllButtonStyle}>
                View All ➔
              </Link>
            </div>

            <div className="scroll-container" style={scrollContainerStyle}>
              {latestBlogs && latestBlogs.length > 0 ? (
                latestBlogs.map((post) => (
                  <div key={post.slug?.current} className="scroll-card">
                    <Link
                      href={`/blog/${post.slug?.current}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {post.mainImage && (
                        <img
                          src={urlFor(post.mainImage).url()}
                          alt={post.title}
                          style={imageStyle}
                        />
                      )}
                      <div style={{ padding: "15px" }}>
                        <h2
                          style={{
                            fontSize: "16px",
                            color: "#38bdf8",
                            margin: "0",
                            fontWeight: "600",
                            ...lineClampStyle,
                          }}
                        >
                          {post.title}
                        </h2>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p style={{ color: "#94a3b8", paddingLeft: "10px" }}>
                  No posts found!
                </p>
              )}
            </div>
          </section>

          {/* ==================== ৩. বিনোদন সেকশন (মঙ্গোডিবি থেকে নতুন যুক্ত) ==================== */}
          <section style={{ marginBottom: "50px" }}>
            <div style={sectionHeaderStyle}>
              <h2
                style={{
                  color: "#4ade80",
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "700",
                }}
              >
                🎬 Entertainment News
              </h2>
              <Link href="/entertainment" style={viewAllButtonStyle}>
                View All ➔
              </Link>
            </div>

            <div className="scroll-container" style={scrollContainerStyle}>
              {latestent && latestent.length > 0 ? (
                latestent.map((entertainment) => {
                  const pureTitleForAlt = entertainment.title
                    ? entertainment.title.replace(/<[^>]*>/g, "")
                    : "entertainment";
                  return (
                    <div key={entertainment._id} className="scroll-card">
                      <Link
                        href={`/entertainment/${entertainment.url}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {entertainment.image &&
                          entertainment.image.trim() !== "" && (
                            <img
                              src={entertainment.image}
                              alt={entertainment.imageAlt || pureTitleForAlt}
                              style={imageStyle}
                            />
                          )}
                        <div style={{ padding: "15px" }}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: entertainment.title || "Untitled",
                            }}
                            style={entTitleStyle}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#94a3b8", paddingLeft: "10px" }}>
                  কোনো বিনোদন নিউজ পাওয়া যায়নি!
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// ==================== 🚀 ব্যাকএন্ড ডেটা ফেচিং (getStaticProps) ====================
export async function getStaticProps() {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("news");

    // ১. সাধারণ নিউজ আনা (সর্বশেষ ৫টা)
    const latestNews = await db
      .collection("news1")
      .find({})
      .sort({ _id: -1 })
      .limit(5)
      .toArray();

    // 🎯 ২. বিনোদন নিউজ আনা (সর্বশেষ ৫টা নতুন যুক্ত করা হলো)
    const latestent = await db
      .collection("entertainment1")
      .find({})
      .sort({ _id: -1 })
      .limit(5)
      .toArray();

    // ৩. স্যানিটি থেকে ব্লগ ডাটা আনা
    const latestBlogs = await client.fetch(
      `*[_type == "post"] | order(_createdAt desc) [0...5] { title, slug, mainImage }`,
    );

    return {
      props: {
        latestNews: JSON.parse(JSON.stringify(latestNews)),
        latestent: JSON.parse(JSON.stringify(latestent)), // 👈 প্রপস আকারে পাঠানো হলো
        latestBlogs: latestBlogs || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Home Page Data Fetching Error:", error);
    return {
      props: { latestNews: [], latestBlogs: [], latestent: [] },
      revalidate: 10,
    };
  }
}

// ==================== সিএসএস স্টাইল অবজেক্টস ====================
const heroSectionStyle = {
  background: "linear-gradient(to bottom, #1e1b4b, #0f172a)",
  padding: "80px 0",
  textAlign: "center",
  borderBottom: "1px solid #1e293b",
};

const heroTitleStyle = {
  fontSize: "42px",
  fontWeight: "800",
  margin: "0 0 15px 0",
  letterSpacing: "-1px",
};

const heroSubTitleStyle = {
  fontSize: "18px",
  color: "#94a3b8",
  maxWidth: "700px",
  margin: "0 auto",
  lineHeight: "1.6",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  marginBottom: "25px",
  borderBottom: "1px solid #334155",
  paddingBottom: "12px",
};

const viewAllButtonStyle = {
  color: "#38bdf8",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "600",
};

const scrollContainerStyle = {
  display: "flex",
  gap: "20px",
  overflowX: "auto",
  paddingBottom: "20px",
  scrollSnapType: "x mandatory",
  WebkitOverflowScrolling: "touch",
};

const imageStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
};

const lineClampStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
};

const titleStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  lineHeight: "1.4",
  color: "#fff",
  ...lineClampStyle,
};

// 🎯 বিনোদন টাইটেলের আলাদা কালার স্কিম (সবুজ থিম)
const entTitleStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  lineHeight: "1.4",
  color: "#4ade80",
  ...lineClampStyle,
};
