/** @type {import('next').NextConfig} */
const { hostname } = require('os');
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
      {
        protocol: "http",
        hostname: "abc.com",
      },
      {
        protocol: "http",
        hostname: "test.com",
      },
   
    ],
  },

}

module.exports = nextConfig
