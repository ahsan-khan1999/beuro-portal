/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains:["kaufes-dev-v2.s3.me-south-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kaufes-dev-v2.s3.me-south-1.amazonaws.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude fs module from @react-pdf/pdfkit
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
