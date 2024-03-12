/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.prismic.io",
      },
    ],
  },
};

export default nextConfig;
