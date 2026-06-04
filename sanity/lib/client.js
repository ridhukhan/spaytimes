import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import imageUrlBuilder from "@sanity/image-url";

// ইমেজ ইউআরএল জেনারেট করার বিল্ডার

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
