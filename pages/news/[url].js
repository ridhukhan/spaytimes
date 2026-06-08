import clientPromise from "@/lib/mongodb";

export default function SingleNews({ newsItem }) {
  if (!newsItem)
    return (
      <h2 style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
        খবরটি পাওয়া যায়নি!
      </h2>
    );

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "0 auto",
        padding: "30px",
        color: "#fff",
        backgroundColor: "#111",
        fontFamily: "sans-serif",
        lineHeight: "1.8",
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: newsItem.title }}
        style={{ fontSize: "32px", marginBottom: "20px", fontWeight: "bold" }}
      />

      {newsItem.image && (
        <img
          src={newsItem.image}
          alt="news"
          style={{
            width: "100%",
            maxHeight: "420px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
      )}

      <div
        dangerouslySetInnerHTML={{ __html: newsItem.description }}
        style={{ fontSize: "18px", color: "#ddd", marginBottom: "30px" }}
      />

      <hr style={{ borderColor: "#333", margin: "30px 0" }} />

      {/* ১ থেকে ৭ সেকশন লুপ */}
      {[1, 2, 3, 4, 5, 6, 7].map((num) => {
        const head = newsItem[`section${num}h`];
        const body = newsItem[`section${num}b`];

        if (!head && !body) return null; // ডাটা ফাঁকা থাকলে রেন্ডার হবে না

        return (
          <div key={num} style={{ marginBottom: "25px" }}>
            {head && (
              <div
                dangerouslySetInnerHTML={{ __html: head }}
                style={{
                  color: "#ff4d4d",
                  fontSize: "22px",
                  marginBottom: "8px",
                }}
              />
            )}
            {body && (
              <div
                dangerouslySetInnerHTML={{ __html: body }}
                style={{ color: "#e0e0e0", fontSize: "16px" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// dynamic paths জেনারেট করার লজিক (ISR এর জন্য fallback: "blocking" সবচেয়ে বেস্ট)
export async function getStaticPaths() {
  return {
    paths: [], // শুরুতেই কোনো পেজ বিল্ড হবে না, অন-ডিমান্ড জেনারেট হবে
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { url } = context.params;
  const client = await clientPromise;
  const db = client.db("news");

  const newsItem = await db
    .collection("news1")
    .findOne({ url: url.toLowerCase() });

  if (!newsItem) {
    return { notFound: true }; // খবর না থাকলে ও ৪MD৪ পেজ দেখাবে
  }

  return {
    props: {
      newsItem: JSON.parse(JSON.stringify(newsItem)),
    },
    revalidate: 10, // 🎯 এখানেও ১০ সেকেন্ড রিভ্যালিডেশন টাইম দেওয়া হলো
  };
}
