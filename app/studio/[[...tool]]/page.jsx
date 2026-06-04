"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config"; // আপনার আগের পাথ অনুযায়ী যদি এটি কাজ করে থাকে, তবে এটিই রাখুন। (অথবা ../../sanity.config)

export const dynamic = "force-static";

export default function StudioPage() {
  return (
    <div data-vimeo-initialized="true">
      <NextStudio config={config} />
    </div>
  );
}
