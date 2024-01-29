/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn-ray.zain.sa"],
  },
  env: {
    TOKEN: "sbbs76bgsyegfyrbfyue",
    base_url: "https://myserver-ti3o.onrender.com",
  },
};

module.exports = nextConfig;
