/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains :[ "res.cloudinary.com" , "cdn-ray.zain.sa"] 
    },
    env: {
        TOKEN : 'sbbs76bgsyegfyrbfyue',
        base_url : 'http://localhost:3001'
      },
    
};

module.exports = nextConfig;
