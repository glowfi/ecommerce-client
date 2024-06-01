/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
        STORE_NAME: process.env.STORE_NAME
    },
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com'
            },
            {
                hostname: 'ui.shadcn.com'
            }
        ]
    }
};

export default nextConfig;
