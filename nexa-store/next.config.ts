import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder art in public/products is hand-authored, not user-uploaded,
    // so it's safe to let next/image optimize the local SVGs.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
