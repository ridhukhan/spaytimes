import { client } from "../../sanity/lib/client.js";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../sanity/lib/client.js"; // আপনার পাথ অনুযায়ী
// ১. এই ফাংশনটি নেক্সট জেএস-কে বলবে স্যানিটিতে এই মুহূর্তে কী কী স্লাগ (Slug) আছে
export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`,
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true, // নতুন কোনো পোস্ট দিলে ওটা সাথে সাথে জেনারেট হবে
  };
}

// ২. নির্দিষ্ট স্লাগ অনুযায়ী স্যানিটি থেকে ওই ব্লগের টাইটেল আর বডি (লেখা) নিয়ে আসবে
export async function getStaticProps({ params }) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ title, body , mainImage}`,
    { slug: params.slug },
  );

  return {
    props: { post },
    revalidate: 10,
  };
}

// ৩. ব্লগের আসল ডিজাইন বা ফ্রন্টএন্ড
// ৩. ব্লগের আসল ডিজাইন বা ফ্রন্টএন্ড
export default function BlogPost({ post }) {
  if (!post)
    return (
      <div style={{ padding: "40px" }}>
        লোডিং হচ্ছে... অথবা পোস্টটি পাওয়া যায়নি।
      </div>
    );

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>{post.title}</h1>
      <hr />
      {post.mainImage && (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
      {/* 👑 এই যে এখানে আপনার ব্লগের মূল বডি বা লেখাটি বসবে */}
      <div
        style={{
          marginTop: "20px",
          fontSize: "18px",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p>এই পোস্টে কোনো বডি বা টেক্সট লেখা হয়নি।</p>
        )}
      </div>
    </div>
  );
}
