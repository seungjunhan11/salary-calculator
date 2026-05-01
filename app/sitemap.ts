export default function sitemap() {
  const baseUrl = "https://너사이트.vercel.app";

  const urls = [];

  for (let i = 2000; i <= 10000; i += 100) {
    urls.push({
      url: `${baseUrl}/salary/${i}`,
      lastModified: new Date(),
    });
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...urls,
  ];
}