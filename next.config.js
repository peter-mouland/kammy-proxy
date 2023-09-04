/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone' // reduced prod build size for cyclic.sh deployment.
}

module.exports = nextConfig
