/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  reactStrictMode: true,
  trailingSlash: true,
}

export default nextConfig
