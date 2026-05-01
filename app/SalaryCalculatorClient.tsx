"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calculateSalary, formatWon } from "@/lib/calculateSalary";

export default function SalaryCalculatorClient() {
  const [salary, setSalary] = useState("36000000");
  const [taxFreeMonthly, setTaxFreeMonthly] = useState("200000");
  const [familyCount, setFamilyCount] = useState("1");
  const [childCount, setChildCount] = useState("0");

  const result = useMemo(() => {
    return calculateSalary({
      yearlySalary: Number(salary) || 0,
      taxFreeMonthly: Number(taxFreeMonthly) || 0,
      familyCount: Number(familyCount) || 1,
      childCount: Number(childCount) || 0,
    });
  }, [salary, taxFreeMonthly, familyCount, childCount]);

  const popularSalaries = [
    3000, 3200, 3400, 3600, 3800, 4000, 4500, 5000, 6000, 7000,
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-900">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 text-center text-white">
          <p className="mb-3 text-sm font-semibold text-blue-300">
            2026 연봉 실수령액 계산기
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            내 월급, 실제로 얼마 받을까?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            연봉, 비과세 금액, 부양가족 수를 입력하면 국민연금·건강보험·고용보험·소득세를 반영한
            예상 월 실수령액을 계산합니다.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-950">계산 정보 입력</h2>
            <p className="mt-2 text-sm text-slate-500">
              기본값은 연봉 3,600만원 / 월 비과세 20만원 기준입니다.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  연봉
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="예: 36000000"
                />
                <p className="mt-2 text-xs text-slate-400">
                  원 단위로 입력하세요. 예: 3,600만원 → 36000000
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  월 비과세 금액
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  type="number"
                  value={taxFreeMonthly}
                  onChange={(e) => setTaxFreeMonthly(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    부양가족 수
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    type="number"
                    min="1"
                    value={familyCount}
                    onChange={(e) => setFamilyCount(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-slate-400">본인 포함</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    자녀 수
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-lg font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    type="number"
                    min="0"
                    value={childCount}
                    onChange={(e) => setChildCount(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    8세 이상 20세 이하
                  </p>
                </div>
              </div>
            </div>
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

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              현재 소득세는 임시 추정식입니다. 이후 국세청 근로소득 간이세액표 기준으로 교체할 수 있습니다.
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-slate-950">
            많이 찾는 연봉 실수령액
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            사람들이 자주 검색하는 연봉별 실수령액 페이지입니다.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {popularSalaries.map((amount) => (
              <Link
                key={amount}
                href={`/salary/${amount}`}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                연봉 {amount}만원
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900 p-6 text-slate-300">
          <h2 className="text-xl font-bold text-white">연봉 실수령액이란?</h2>
          <p className="mt-3 text-sm leading-7">
            연봉 실수령액은 세전 연봉에서 국민연금, 건강보험, 장기요양보험, 고용보험,
            소득세, 지방소득세 등을 제외하고 실제로 받는 금액을 의미합니다.
            같은 연봉이라도 비과세 금액, 부양가족 수, 자녀 수에 따라 월 실수령액은 달라질 수 있습니다.
          </p>

          <h2 className="mt-6 text-xl font-bold text-white">
            연봉 계산기는 왜 필요한가요?
          </h2>
          <p className="mt-3 text-sm leading-7">
            취업, 이직, 연봉 협상, 대출 계획을 세울 때 세전 연봉보다 중요한 것은 실제 통장에 들어오는
            월급입니다. 이 계산기를 사용하면 예상 월급과 공제 항목을 한눈에 확인할 수 있습니다.
          </p>

          <h2 className="mt-6 text-xl font-bold text-white">
            연봉 3000만원 실수령액은 얼마인가요?
          </h2>
          <p className="mt-3 text-sm leading-7">
            연봉 3000만원의 월 실수령액은 비과세 금액과 부양가족 수에 따라 달라집니다.
            일반적으로 세전 월급은 약 250만원이며, 4대 보험과 세금을 제외한 금액이 실제 월급입니다.
            정확한 금액은 위 계산기에 직접 입력해서 확인할 수 있습니다.
          </p>
        </div>
                <div className="mt-10 text-center text-sm text-slate-400">
          <p>
            본 사이트는 연봉 실수령액을 계산하는 참고용 서비스이며 실제 급여와 차이가 있을 수 있습니다.
          </p>

          <Link href="/contact" className="mt-2 block text-blue-400">
            문의하기
          </Link>
        </div>
      </section>
    </main>

  );
}
