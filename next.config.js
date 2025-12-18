/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
  },
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  
  // If you are deploying to a GitHub Pages Project site (e.g. https://username.github.io/repo-name),
  // you need to set the basePath and assetPrefix.
  // Uncomment the following lines and replace 'repo-name' with your repository name.
  
  basePath: '/pfg-pwa',
};

module.exports = nextConfig;
