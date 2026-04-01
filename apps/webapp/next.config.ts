import type { NextConfig } from "next";
import config from "@/amplify_outputs.json";
const publicImageBucket = config.storage.buckets.find(
  (bucket) => bucket.name === "yushen-public",
);

const hostName = `${publicImageBucket?.bucket_name}.s3.${publicImageBucket?.aws_region}.amazonaws.com`;
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostName,
      },
    ],
  },
};

export default nextConfig;
