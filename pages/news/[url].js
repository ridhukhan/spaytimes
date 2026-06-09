import clientPromise from "@/lib/mongodb";
import { GoogleGenAI } from "@google/genai";
import Head from "next/head";
import { useRouter } from "next/router";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function SingleNews({ newsItem }) {
  const router = useRouter();
  const { locale } = router;

  if (!newsItem)
    return (
      <h2 style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
        খবরটি পাওয়া যায়নি!
      </h2>
    );

  // ভাষা অনুযায়ী ডাটা সিলেক্ট করা
  const displayTitle = newsItem[`title_${locale}`] || newsItem.title;
  const displayDescription =
    newsItem[`description_${locale}`] || newsItem.description;
  const displayKeywords =
    newsItem[`metaKeywords_${locale}`] || newsItem.metaKeywords;

  // এসইও মেটা ক্লিন করা
  const pureDescription = displayDescription
    ? displayDescription.replace(/<[^>]*>/g, "")
    : "";
  const metaDesc = pureDescription.substring(0, 155) + "...";
  const pureTitle = displayTitle
    ? displayTitle.replace(/<[^>]*>/g, "")
    : "SPayTimes News";

  return (
    <>
      <Head>
        <title>{pureTitle}</title>
        <meta name="description" content={metaDesc} />
        {displayKeywords && <meta name="keywords" content={displayKeywords} />}
        <meta property="og:title" content={pureTitle} />
        <meta property="og:description" content={metaDesc} />
        {newsItem.image && (
          <meta property="og:image" content={newsItem.image} />
        )}
      </Head>

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
          dangerouslySetInnerHTML={{ __html: displayTitle }}
          style={{ fontSize: "32px", marginBottom: "20px", fontWeight: "bold" }}
        />

        {newsItem.image && (
          <img
            src={newsItem.image}
            alt={newsItem.imageAlt || pureTitle}
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
          dangerouslySetInnerHTML={{ __html: displayDescription }}
          style={{ fontSize: "18px", color: "#ddd", marginBottom: "30px" }}
        />

        <hr style={{ borderColor: "#333", margin: "30px 0" }} />

        {[1, 2, 3, 4, 5, 6, 7].map((num) => {
          const head =
            newsItem[`section${num}h_${locale}`] || newsItem[`section${num}h`];
          const body =
            newsItem[`section${num}b_${locale}`] || newsItem[`section${num}b`];

          if (!head && !body) return null;

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
    </>
  );
}

export async function getStaticProps(context) {
  const { url } = context.params;
  const locale = context.locale || "bn";

  const client = await clientPromise;
  const db = client.db("news");
  let newsItem = await db
    .collection("news1")
    .findOne({ url: url.toLowerCase() });

  if (!newsItem) return { notFound: true };

  // 🚀 অন-ডিমান্ড জেমিনাই ফুল অটো-ট্রান্সলেশন (সব সাব-সেকশনসহ)
  if (locale !== "bn" && !newsItem[`title_${locale}`]) {
    try {
      const updateDoc = {};

      // ১. মেইন টাইটেল অনুবাদ
      const responseTitle = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Translate this text into natural and fluent ${locale} language. Preserve HTML tags if any. Text: ${newsItem.title}`,
      });
      updateDoc[`title_${locale}`] = responseTitle.text.trim();
      newsItem[`title_${locale}`] = responseTitle.text.trim();

      // ২. মেইন ডেসক্রিপশন অনুবাদ
      const responseDesc = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Translate this text into natural and fluent ${locale} language. Preserve HTML tags if any. Text: ${newsItem.description}`,
      });
      updateDoc[`description_${locale}`] = responseDesc.text.trim();
      newsItem[`description_${locale}`] = responseDesc.text.trim();

      // ৩. মেটা কিওয়ার্ড অনুবাদ
      if (newsItem.metaKeywords) {
        const responseKeywords = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Translate these comma-separated SEO keywords into ${locale} language keywords. Keep them comma-separated. Do not add any explanation or numbering. Keywords: ${newsItem.metaKeywords}`,
        });
        updateDoc[`metaKeywords_${locale}`] = responseKeywords.text.trim();
        newsItem[`metaKeywords_${locale}`] = responseKeywords.text.trim();
      }

      // ৪. 🔥 লুপ চালিয়ে সাব-সেকশন ১ থেকে ৭ এর হেড ও বডি অটোমেটিক অনুবাদ
      for (let num = 1; num <= 7; num++) {
        const headKey = `section${num}h`;
        const bodyKey = `section${num}b`;

        if (newsItem[headKey]) {
          const resHead = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Translate this heading into natural ${locale}: ${newsItem[headKey]}`,
          });
          updateDoc[`${headKey}_${locale}`] = resHead.text.trim();
          newsItem[`${headKey}_${locale}`] = resHead.text.trim();
        }

        if (newsItem[bodyKey]) {
          const resBody = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Translate this text into fluent ${locale}. Preserve HTML tags if any: ${newsItem[bodyKey]}`,
          });
          updateDoc[`${bodyKey}_${locale}`] = resBody.text.trim();
          newsItem[`${bodyKey}_${locale}`] = resBody.text.trim();
        }
      }

      // একবারে ডাটাবেজ আপডেট
      await db
        .collection("news1")
        .updateOne({ _id: newsItem._id }, { $set: updateDoc });
    } catch (err) {
      console.error("On-demand AI translation failed:", err);
    }
  }

  return {
    props: { newsItem: JSON.parse(JSON.stringify(newsItem)) },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
