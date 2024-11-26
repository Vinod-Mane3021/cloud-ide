/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api",
                destination: "http://localhost:3000/api/v1/"
            }
        ]
    }
};

export default nextConfig;
