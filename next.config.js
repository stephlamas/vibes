/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
    appDir: true
   },
   env: {
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      REDIRECT_URI: process.env.REDIRECT_URI,
   },

   /*
   redirects: async () => {
      return [
         {
            source: '/api/spotify-callback',
            destination: '/home',
            permanent: true,
         },
      ];
   }
   */
}

module.exports = nextConfig;
