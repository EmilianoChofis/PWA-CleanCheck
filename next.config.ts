import  withPWA  from 'next-pwa'

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  //disable must be changed for the production build
  disable: false
})

export default nextConfig;
