import SalaryCalculatorClient from "./SalaryCalculatorClient";

export const metadata = {
  title: "연봉 실수령액 계산기 2026 | 월급 세후 계산",
  description:
    "연봉을 입력하면 국민연금, 건강보험, 고용보험, 소득세를 반영한 월 실수령액을 계산합니다.",
};

export default function Home() {
  return <SalaryCalculatorClient />;
}