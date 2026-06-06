import { client } from "../../sanity/lib/client.js";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../sanity/lib/client.js";
import Head from "next/head"; // 🎯 গুগলের এসইও মেটা ট্যাগের জন্য এটি যুক্ত করা হলো

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`,
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

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

export default function BlogPost({ post }) {
  if (!post)
    return (
      <div style={{ padding: "40px" }}>
        লোডিং হচ্ছে... অথবা পোস্টটি পাওয়া যায়নি।
      </div>
    );

  // 🚀 স্যানিটির প্রথম প্যারাগ্রাফ থেকে অটোমেটিক গুগলের জন্য ১৬০ অক্ষরের ডেসক্রিপশন তৈরি করার ট্রিক
  const seoDescription =
    post.body && post.body[0]?.children && post.body[0]?.children[0]?.text
      ? post.body[0].children[0].text.substring(0, 160) + "..."
      : `${post.title} সম্পর্কে বিস্তারিত জানুন SPAY TIMES পোর্টালে।`;

  // 📸 মেইন ইমেজের ইউআরএল বের করে নেওয়া ফেসবুক বা গুগলের জন্য
  const ogImageUrl = post.mainImage ? urlFor(post.mainImage).url() : "";

  return (
    <>
      {/* 🔥 এই অংশটুকু গুগলে আপনার এই নির্দিষ্ট পোস্টটিকে ইনডেক্স ও র‍্যাংক করতে সাহায্য করবে */}
      <Head>
        <title>{`${post.title} | SPAY TIMES`}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />

        {/* সোশ্যাল মিডিয়া এসইও (ফেসবুক বা টুইটারে লিংক শেয়ার করলে সুন্দর দেখানোর জন্য) */}
        <meta property="og:title" content={`${post.title} | SPAY TIMES`} />
        <meta property="og:description" content={seoDescription} />
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
        <meta property="og:type" content="article" />
      </Head>

      {/* 🧩 আপনার আসল ডিজাইন ও কোড যা আগে ছিল */}
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
        <div
          style={{
            marginTop: "20px",
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#fff",
            backgroundColor: "#000",
          }}
        >
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p>এই পোস্টে কোনো بডি বা টেক্সট লেখা হয়নি।</p>
          )}
        </div>
      </div>
    </>
  );
}
