/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
        STORE_NAME: process.env.STORE_NAME,
        RAZER_KEY_ID: process.env.RAZER_KEY_ID,
        LOGO_URL: process.env.LOGO_URL
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
