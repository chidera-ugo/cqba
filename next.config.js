/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ['backend-core-dev-avatar-bucket.s3.eu-central-1.amazonaws.com'],
  },
};
