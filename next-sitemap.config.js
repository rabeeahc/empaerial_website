/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://empaerial.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/admin-login'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/admin-login'] },
    ],
  },
};
