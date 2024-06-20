/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
        STORE_NAME: process.env.STORE_NAME,
        RAZER_KEY_ID: process.env.RAZER_KEY_ID,
        LOGO_URL: process.env.LOGO_URL,
        STORE_NONCE: process.env.STORE_NONCE,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        STAGE: process.env.STAGE,
        SECRET_REQ_RES: process.env.SECRET_REQ_RES
    },
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com'
            },
            {
                hostname: 'xsgames.co'
            },
            {
                hostname: 'ui.shadcn.com'
            },
            {
                hostname: 'lh3.googleusercontent.com'
            }
        ]
    }
};

export default nextConfig;
