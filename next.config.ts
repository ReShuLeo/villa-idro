import type { NextConfig } from "next";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: base,
  assetPrefix: base || undefined,
};

export default nextConfig;
