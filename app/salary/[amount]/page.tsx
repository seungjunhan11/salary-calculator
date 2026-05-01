import Link from "next/link";
import { calculateSalary, formatWon } from "@/lib/calculateSalary";

type Props = {
  params: Promise<{ amount: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { amount } = await params;

  return {
    title: `연봉 ${amount}만원 실수령액 | 2026 월급 계산기`,
    description: `연봉 ${amount}만원 기준 월 실수령액, 세전 월급, 4대보험, 소득세 공제액을 계산합니다.`,
  };
}

export default async function SalaryPage({ params }: Props) {
  const { amount } = await params;

  const salaryAmount = Number(amount);
  const yearlySalary = salaryAmount * 10000;

  const result = calculateSalary({
    yearlySalary,
    taxFreeMonthly: 200000,
    familyCount: 1,
    childCount: 0,
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8 text-center text-white">
          <p className="mb-3 text-sm font-semibold text-blue-300">
            2026 연봉 실수령액
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            연봉 {salaryAmount}만원 실수령액
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            연봉 {salaryAmount}만원 기준 예상 월 실수령액과 공제 항목을 확인하세요.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-2xl">
          <p className="text-sm font-semibold text-blue-600">예상 월 실수령액</p>

          <div className="mt-3 rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-sm text-slate-400">월 예상 수령액</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {formatWon(result.netMonthly)}
            </p>
            <p className="mt-3 text-sm text-slate-400">
              세전 월급 {formatWon(result.monthlySalary)} 기준
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {[
              ["월급여", result.monthlySalary],
              ["비과세 제외 과세월급", result.taxableMonthly],
              ["국민연금", -result.pension],
              ["건강보험", -result.health],
              ["장기요양보험", -result.longTermCare],
              ["고용보험", -result.employment],
              ["소득세", -result.incomeTax],
              ["지방소득세", -result.localTax],
              ["총 공제액", -result.totalDeduction],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm"
              >
                <span className="font-medium text-slate-600">{label}</span>
                <span className="font-bold text-slate-950">
                  {typeof value === "number" && value < 0
                    ? `-${formatWon(Math.abs(value))}`
                    : formatWon(Number(value))}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            이 계산은 월 비과세 20만원, 부양가족 1명, 자녀 0명을 기본값으로 사용합니다.
            개인 조건에 따라 실제 월급은 달라질 수 있습니다.
          </div>

          <Link
            href="/"
            className="mt-6 block rounded-2xl bg-blue-600 px-5 py-4 text-center font-bold text-white transition hover:bg-blue-700"
          >
            내 조건으로 다시 계산하기
          </Link>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const salaries = [
    2000, 2200, 2400, 2600, 2800,
    3000, 3200, 3400, 3600, 3800,
    4000, 4500, 5000, 6000,
    7000, 8000, 9000, 10000,
  ];

  return salaries.map((amount) => ({
    amount: amount.toString(),
  }));
}