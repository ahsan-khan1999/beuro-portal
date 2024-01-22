/** @type {import('next').NextConfig} */
const { hostname } = require('os');
const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
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

}

module.exports = withBundleAnalyzer(nextConfig)
