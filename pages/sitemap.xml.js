import { client } from "../sanity/lib/client.js";

// 🎯 আপনার নিজস্ব কাস্টম ডোমেইন লিংক এখানে দিয়ে দেওয়া হলো
const EXTERNAL_DATA_URL = "https://spaytimes.xyz";

function generateSitemap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- ১. হোমপেজের লিংক -->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     
     <!-- ২. স্যানিটি থেকে আসা প্রতিটা ব্লগের লিংক ডাইনামিকালি তৈরি হচ্ছে -->
     ${posts
       .map(({ slug }) => {
         // স্লাগ যদি কোনো কারণে খালি থাকে, তবে এরর এড়াতে স্কিপ করবে
         if (!slug?.current) return "";

         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/blog/${slug.current}`}</loc>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // স্যানিটি থেকে সব পাবলিশ হওয়া পোস্টের স্লাগ টেনে আনা হচ্ছে
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ slug }`,
  );

  // সাইটম্যাপের জন্য এক্সএমএল (XML) ডাটা তৈরি করা হচ্ছে
  const sitemap = generateSitemap(posts);

  // ব্রাউজার এবং গুগলকে বোঝানো হচ্ছে যে এটি একটি XML ফাইল
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
