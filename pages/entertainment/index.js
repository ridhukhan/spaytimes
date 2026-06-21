import clientPromise from "@/lib/mongodb";

export default function EntMain({ allent }) {
  return (
    <>
      <div
        style={{
          padding: "20px",
          color: "#fff",
          backgroundColor: "#111",
          minHeight: "100vh",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#4ade80" }}>
          🎬 Entertainment News & Blogs
        </h1>

        <div style={{ maxWidth: "800px", margin: "20px auto" }}>
          {allent && allent.length > 0 ? (
            allent.map((item) => (
              <div
                key={item._id}
                style={{
                  background: "#1e293b",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                }}
              >
                <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#ccc" }}>
              কোনো বিনোদন নিউজ পাওয়া যায়নি!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("news");

    // 🎯 ভুল সংশোধন ১: কালেকশনের নাম আপনার এপিআই অনুযায়ী (যেমন: entertainment1) দিতে হবে।
    // 🎯 ভুল সংশোধন ২: অবশ্যই `.toArray()` এর আগে await ব্যবহার করতে হবে।
    const allentData = await db
      .collection("entertainment1")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return {
      // 🎯 ভুল সংশোধন ৩: ভ্যারিয়েবলের সঠিক নাম পাঠানো হলো
      props: { allent: JSON.parse(JSON.stringify(allentData)) },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
    return {
      props: { allent: [] }, // 👈 ক্যাচ ব্লকেও সঠিক ভ্যারিয়েবল অলওয়েজ রিটার্ন করতে হবে
      revalidate: 10,
    };
  }
}
