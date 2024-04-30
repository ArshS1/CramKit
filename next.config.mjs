/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "res.cloudinary.com", "images.unsplash.com", "cdn.pixabay.com", "cdn.statically.io"]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
