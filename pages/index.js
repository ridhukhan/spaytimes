import { client } from "../sanity/lib/client.js";
import Link from "next/link";

export async function getStaticProps() {
  const posts = await client.fetch(
    `*[_type == "post"]{ title, slug,mainImage }`,
  );

  return {
    props: { posts },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "800",
          letterSpacing: "4px",
          margin: "0 0 10px 0",
          background: "linear-gradient(to right, #38bdf8, #c084fc)", // নিয়ন ব্লু ও পার্পল গ্রেডিয়েন্ট টেক্সট
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
          animationDelay: "0.3s",
        }}
      >
        multiflavor news
      </p>
      <hr />

      <div style={{ marginTop: "20px" }}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug.current} style={{ marginBottom: "15px" }}>
              <Link
                href={`/blog/${post.slug.current}`}
                style={{
                  fontSize: "20px",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    style={{
                      width: "100%",
                      maxHeight: "450px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                {post.title}
              </Link>
            </div>
          ))
        ) : (
          <p>
            কোনো পোস্ট পাওয়া যায়নি! স্যানিটি স্টুডিওতে পোস্ট পাবলিশ করেছেন তো?
          </p>
        )}
      </div>
    </div>
  );
}
