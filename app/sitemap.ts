export default function sitemap() {
  const baseUrl = "https://salary-calculator-xi-swart.vercel.app/";

const salaries = [
  2000, 2200, 2400, 2600, 2800,
  3000, 3200, 3400, 3600, 3800,
  4000, 4500, 5000, 6000,
  7000, 8000, 9000, 10000,
];

  const salaryPages = salaries.map((amount) => ({
    url: `${baseUrl}/salary/${amount}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...salaryPages,
  ];
}