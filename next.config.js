/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kaufes-dev-v2.s3.me-south-1.amazonaws.com",
      },
    ],
  },

}

module.exports = nextConfig
