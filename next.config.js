/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ["staging.buero-365.cloudmeshsolutions.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging.buero-365.cloudmeshsolutions.com",
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
};

module.exports = nextConfig;
