/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ['raw.githubusercontent.com', 'tailwindui.com'],
    },
};

module.exports = nextConfig;
