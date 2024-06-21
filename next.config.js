/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    NEXTAUTH_SECRET: process.env.JWT_SECRET,
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY,
    CHAIN_ID: process.env.CHAIN_ID,
    PINATA_JWT: process.env.PINATA_JWT,
  },
  images: {
    domains: ["alphaequipment.s3.amazonaws.com", "alkamequipment.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
