/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn-ray.zain.sa"],
  },
  env: {
    TOKEN: "sbbs76bgsyegfyrbfyue",
    base_url: "https://myserver-ti3o.onrender.com",
    // base_url: "http://localhost:5000",
  },
};

module.exports = nextConfig;
