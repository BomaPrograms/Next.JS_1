/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add an alias for the Prisma Client
    config.resolve.alias["@prisma/client"] = require.resolve("@prisma/client");

    return config;
  },
};