import Link from "next/link";

type Props = {
  params: { amount: string };
};

// 🔥 SEO 핵심 (페이지마다 제목 바뀜)
export async function generateMetadata({ params }: Props) {
  const amount = params.amount;

  return {
    title: `연봉 ${amount}만원 실수령액 | 2026 월급 계산`,
    description: `연봉 ${amount}만원 기준 실수령액과 월급을 계산해드립니다.`,
  };
}

export default function SalaryPage({ params }: Props) {
  const amount = Number(params.amount);
  const yearlySalary = amount * 10000;

  const monthlySalary = yearlySalary / 12;

  const pension = monthlySalary * 0.0475;
  const health = monthlySalary * 0.03595;
  const longTermCare = health * 0.1314;
  const employment = monthlySalary * 0.009;

  const totalDeduction =
    pension + health + longTermCare + employment;

  const netMonthly = monthlySalary - totalDeduction;

  const formatWon = (value: number) =>
    Math.round(value).toLocaleString("ko-KR") + "원";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-xl bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">
          연봉 {amount}만원 실수령액
        </h1>

        <p className="mt-2 text-gray-600">
          연봉 {amount}만원 기준 예상 월 실수령액입니다.
        </p>

        <div className="mt-6 bg-gray-100 p-5 rounded-xl">
          <p className="text-gray-600">월 실수령액</p>
          <p className="text-3xl font-bold">
            {formatWon(netMonthly)}
          </p>

          <div className="mt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>월급여</span>
              <span>{formatWon(monthlySalary)}</span>
            </div>
            <div className="flex justify-between">
              <span>총 공제</span>
              <span>-{formatWon(totalDeduction)}</span>
            </div>
          </div>
        </div>

        <Link href="/" className="block mt-6 text-blue-500">
          ← 계산기로 돌아가기
        </Link>
      </section>
    </main>
  );
}

// 🔥 SEO 페이지 자동 생성
export async function generateStaticParams() {
  const salaries = [
    2400, 2600, 2800, 3000, 3200,
    3500, 4000, 4500, 5000, 6000,
    7000, 8000, 9000, 10000,
  ];

  return salaries.map((amount) => ({
    amount: amount.toString(),
  }));
}