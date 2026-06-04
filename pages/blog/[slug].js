import { client } from "../../sanity/lib/client.js";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../sanity/lib/client.js";
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
          <p>এই পোস্টে কোনো বডি বা টেক্সট লেখা হয়নি।</p>
        )}
      </div>
    </div>
  );
}
