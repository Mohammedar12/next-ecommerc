/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn-ray.zain.sa"],
  },
  env: {
    TOKEN: "sbbs76bgsyegfyrbfyue",
    base_url: "https://regal-cat-c2dd83.netlify.app",
  },
};

module.exports = nextConfig;
