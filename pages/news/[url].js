import clientPromise from "@/lib/mongodb";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SingleNews({ newsItem }) {
  const router = useRouter();
  const { locale } = router;

  if (!newsItem) {
    return (
      <h2 style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
        খবরটি পাওয়া যায়নি!
      </h2>
    );
  }

  // ল্যাঙ্গুয়েজ অনুযায়ী ডেটা সেট (ফ্যালব্যাক সহ)
  const displayTitle = newsItem[`title_${locale}`] || newsItem.title;
  const displayDescription =
    newsItem[`description_${locale}`] || newsItem.description;
  const displayKeywords =
    newsItem[`metaKeywords_${locale}`] || newsItem.metaKeywords;

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

  const client = await clientPromise;
  const db = client.db("news");
  const newsItem = await db
    .collection("news1")
    .findOne({ url: url.toLowerCase() });

  if (!newsItem) return { notFound: true };

  return {
    props: { newsItem: JSON.parse(JSON.stringify(newsItem)) },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
