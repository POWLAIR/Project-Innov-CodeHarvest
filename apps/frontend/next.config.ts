import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default NextConfig;
