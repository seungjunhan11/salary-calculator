import Link from "next/link";
import { calculateSalary, formatWon } from "@/lib/calculateSalary";

type Props = {
  params: Promise<{ amount: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { amount } = await params;

  return {
    title: `연봉 ${amount}만원 실수령액 2026 | 월급 세후 계산`,
    description: `연봉 ${amount}만원 기준 실수령액, 세후 월급, 4대보험, 소득세 공제액을 확인하세요.`,
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
        {/* 상단 */}
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

        {/* 계산 결과 */}
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

        {/* SEO 텍스트 */}
        <div className="mt-8 rounded-3xl bg-slate-900 p-6 text-slate-300">
          <h2 className="text-xl font-bold text-white">
            연봉 {salaryAmount}만원 실수령액 계산
          </h2>
          <p className="mt-3 text-sm leading-7">
            연봉 {salaryAmount}만원의 세전 월급은 약 {formatWon(result.monthlySalary)}입니다.
            국민연금, 건강보험, 고용보험, 소득세 등을 공제한 뒤 실제로 받는 금액이 실수령액입니다.
          </p>

          <h2 className="mt-6 text-xl font-bold text-white">
            연봉 {salaryAmount}만원 월급은 얼마인가요?
          </h2>
          <p className="mt-3 text-sm leading-7">
            연봉 {salaryAmount}만원의 월급은 개인 조건에 따라 달라지며,
            비과세 금액과 부양가족 수에 따라 세금이 달라질 수 있습니다.
          </p>

          <h2 className="mt-6 text-xl font-bold text-white">
            세후 월급 계산 방법
          </h2>
          <p className="mt-3 text-sm leading-7">
            세후 월급은 세전 월급에서 국민연금, 건강보험, 장기요양보험, 고용보험,
            그리고 소득세 및 지방소득세를 제외하여 계산됩니다.
          </p>
        </div>

        {/* 내부 링크 (SEO 핵심) */}
        <div className="mt-8">
          <h3 className="text-white font-bold mb-3">비슷한 연봉</h3>

          <div className="flex flex-wrap gap-2">
            {[salaryAmount - 200, salaryAmount + 200, salaryAmount + 500].map(
              (s) => (
                <Link
                  key={s}
                  href={`/salary/${s}`}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
                >
                  {s}만원
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const salaries = [];

  for (let i = 2000; i <= 10000; i += 100) {
    salaries.push(i);
  }

  return salaries.map((amount) => ({
    amount: amount.toString(),
  }));
}