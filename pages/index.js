import { client } from "../sanity/lib/client.js";
import Link from "next/link";

// ১. স্যানিটি থেকে ডাটা ফেচ করার ফাংশন
export async function getStaticProps() {
  // GROQ কোয়েরি দিয়ে সব ব্লগ পোস্টের টাইটেল আর স্লাগ নিয়ে আসছি
  const posts = await client.fetch(`*[_type == "post"]{ title, slug }`);

  return {
    props: { posts },
    revalidate: 10, // ১০ সেকেন্ড পর পর নতুন পোস্ট চেক করবে
  };
}

export default function Home({ posts }) {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>আমার ব্লগ ওয়েবসাইট 🚀</h1>
      <hr />

      <div style={{ marginTop: "20px" }}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug.current} style={{ marginBottom: "15px" }}>
              {/* ২. এই যে আপনার পোস্টের আসল লিংক তৈরি হচ্ছে */}
              <Link
                href={`/blog/${post.slug.current}`}
                style={{
                  fontSize: "20px",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
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
