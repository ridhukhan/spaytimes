import clientPromise from "@/lib/mongodb";
import Link from "next/link"; // 👈 লিংক ইম্পোর্ট করা হলো
import Head from "next/head"; // 👈 হেড ইম্পোর্ট করা হলো

export default function EntMain({ allent }) {
  if (!allent || allent.length === 0) {
    return (
      <h2
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: "50px",
          fontFamily: "sans-serif",
        }}
      >
        কোনো বিনোদন নিউজ পাওয়া যায়নি!
      </h2>
    );
  }

  // 🎯 বিনোদন পেজের এসইও মেটা ডাটা
  const metaTitle = "SPayTimes Entertainment - বিনোদন জগতের সর্বশেষ খবর";
  const metaDesc =
    "বলিউড, হলিউড, ঢালিউডসহ বিনোদন জগতের সব ট্রেন্ডিং খবরাখবর এবং গসিপ সবার আগে পড়ুন।";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
      </Head>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          color: "#fff",
          backgroundColor: "#111",
          fontFamily: "sans-serif",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "30px 0", color: "#4ade80" }}>
          🎬 Entertainment News & Blogs
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {allent.map((item) => {
            const displayTitle = item.title || "শিরোনামহীন";
            const displayDescription = item.description || "";

            const pureText = displayDescription.replace(/<[^>]*>/g, "");
            const shortDescription =
              pureText.length > 160
                ? pureText.substring(0, 160) + "..."
                : pureText;
            const pureTitleForAlt = displayTitle.replace(/<[^>]*>/g, "");

            return (
              <div
                key={item._id}
                style={{
                  marginBottom: "30px",
                  background: "#1e293b",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}
              >
                {/* 📸 ছবির ওপর ক্লিক করলে ডিটেইলস [cont].js পেজে যাবে */}
                <Link
                  href={`/entertainment/${item.url}`}
                  style={{ textDecoration: "none" }}
                >
                  {item.image && item.image.trim() !== "" && (
                    <img
                      src={item.image}
                      alt={item.imageAlt || pureTitleForAlt}
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "15px",
                      }}
                    />
                  )}
                </Link>

                <div>
                  {/* 📝 টাইটেলের ওপর ক্লিক করলে ডিটেইলস [cont].js পেজে যাবে */}
                  <Link
                    href={`/entertainment/${item.url}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: displayTitle }}
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        color: "#4ade80", // বিনোদনের থিম কালার গ্রিন রাখা হলো
                      }}
                    />
                  </Link>

                  <p
                    style={{
                      color: "#ccc",
                      fontSize: "15px",
                      margin: "0 0 12px 0",
                    }}
                  >
                    {shortDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("news");

    const allentData = await db
      .collection("entertainment1")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return {
      props: { allent: JSON.parse(JSON.stringify(allentData)) },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
    return {
      props: { allent: [] },
      revalidate: 10,
    };
  }
}
