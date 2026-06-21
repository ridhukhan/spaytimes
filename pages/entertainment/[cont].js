import clientPromise from "@/lib/mongodb";
import Head from "next/head";

export default function EntertainmentDetails({ news }) {
  // যদি কোনো কারণে ডেটা লোড হতে লেট হয়
  if (!news) {
    return (
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: "100px",
          fontFamily: "sans-serif",
        }}
      >
        Loading...
      </div>
    );
  }

  // এসইও মেটা ট্যাগের জন্য HTML ট্যাগ ক্লিন করা টাইটেল ও ডেসক্রিপশন
  const pureTitle = news.title
    ? news.title.replace(/<[^>]*>/g, "")
    : "Entertainment News";
  const pureDesc = news.description
    ? news.description.substring(0, 150).replace(/<[^>]*>/g, "")
    : "SPayTimes Entertainment - বিনোদন জগতের সর্বশেষ খবর";

  return (
    <>
      <Head>
        <title>{pureTitle}</title>
        <meta name="description" content={pureDesc} />
        {news.metaKeywords && (
          <meta name="keywords" content={news.metaKeywords} />
        )}
        <meta property="og:title" content={pureTitle} />
        <meta property="og:description" content={pureDesc} />
        {news.image && <meta property="og:image" content={news.image} />}
      </Head>

      <div
        style={{
          backgroundColor: "#111",
          color: "#fff",
          fontFamily: "sans-serif",
          minHeight: "100vh",
          padding: "40px 15px",
        }}
      >
        <article
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            background: "#1e293b",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
        >
          {/* 🎬 মূল টাইটেল */}
          <h1
            dangerouslySetInnerHTML={{ __html: news.title }}
            style={{
              fontSize: "30px",
              marginBottom: "20px",
              lineHeight: "1.3",
              color: "#4ade80",
            }}
          />

          {/* 📸 মূল ফিচারড ইমেজ */}
          {news.image && news.image.trim() !== "" && (
            <img
              src={news.image}
              alt={news.imageAlt || pureTitle}
              style={{
                width: "100%",
                maxHeight: "450px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "25px",
              }}
            />
          )}

          {/* 📝 মূল ডেসক্রিপশন বা প্যারাগ্রাফ */}
          <div
            dangerouslySetInnerHTML={{ __html: news.description }}
            style={{
              fontSize: "17px",
              lineHeight: "1.7",
              color: "#cbd5e1",
              marginBottom: "30px",
            }}
          />

          {/* 🔄 সাব-সেকশন ১ থেকে ৭ লুপ (যেগুলো ড্যাশবোর্ড থেকে ফিলাপ করবেন শুধু সেগুলোই দেখাবে) */}
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const heading = news[`section${num}h`];
            const body = news[`section${num}b`];

            // যদি হেডলাইন এবং বডি দুইটাই খালি থাকে, তাহলে এই সেকশনটি স্কিপ হবে
            if (!heading && !body) return null;

            return (
              <div
                key={num}
                style={{
                  marginTop: "25px",
                  borderTop: "1px solid #334155",
                  paddingTop: "20px",
                }}
              >
                {heading && (
                  <h2
                    style={{
                      fontSize: "22px",
                      color: "#38bdf8",
                      marginBottom: "12px",
                    }}
                  >
                    {heading}
                  </h2>
                )}
                {body && (
                  <div
                    dangerouslySetInnerHTML={{ __html: body }}
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.7",
                      color: "#cbd5e1",
                    }}
                  />
                )}
              </div>
            );
          })}
        </article>
      </div>
    </>
  );
}

// 🎯 মঙ্গোডিবি থেকে সব খবরের custom url (slug) তুলে এনে পাথ (Paths) তৈরি করা
export async function getStaticPaths() {
  try {
    const client = await clientPromise;
    const db = client.db("news");
    const newsList = await db
      .collection("entertainment1")
      .find({}, { projection: { url: 1 } })
      .toArray();

    const paths = newsList.map((item) => ({
      params: { cont: item.url }, // 👈 ফাইলের নাম [cont].js হওয়ায় এখানে cont ব্যবহার করা হয়েছে
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Static Paths Error:", error);
    return { paths: [], fallback: "blocking" };
  }
}

// 🎯 নির্দিষ্ট পাথ/ইউআরএল অনুযায়ী মঙ্গোডিবি থেকে ডেটা রিড করা
export async function getStaticProps({ params }) {
  try {
    const client = await clientPromise;
    const db = client.db("news");
    const newsData = await db
      .collection("entertainment1")
      .findOne({ url: params.cont });

    if (!newsData) {
      return { notFound: true };
    }

    return {
      props: {
        news: JSON.parse(JSON.stringify(newsData)),
      },
      revalidate: 10, // প্রতি ১০ সেকেন্ড পর পর পেজটি ব্যাকগ্রাউন্ডে রি-ভ্যালিডেট হবে
    };
  } catch (error) {
    console.error("Static Props Error:", error);
    return { notFound: true };
  }
}
