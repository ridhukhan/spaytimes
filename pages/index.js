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
      <h1>আমার ব্লগ ওয়েবসাইট </h1>
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
