import { calculateIncomeTaxFromTable } from "./incomeTaxTable";

export type SalaryInput = {
  yearlySalary: number;
  taxFreeMonthly: number;
  familyCount: number;
  childCount: number;
};

export type SalaryResult = {
  monthlySalary: number;
  taxableMonthly: number;
  pension: number;
  health: number;
  longTermCare: number;
  employment: number;
  incomeTax: number;
  localTax: number;
  totalDeduction: number;
  netMonthly: number;
};

export const formatWon = (value: number) =>
  Math.round(value).toLocaleString("ko-KR") + "원";

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { yearlySalary, taxFreeMonthly, familyCount, childCount } = input;

  const monthlySalary = yearlySalary / 12;
  const taxableMonthly = Math.max(monthlySalary - taxFreeMonthly, 0);

  const pension = taxableMonthly * 0.0475;
  const health = taxableMonthly * 0.03595;
  const longTermCare = health * 0.1314;
  const employment = taxableMonthly * 0.009;

  const incomeTax = calculateIncomeTaxFromTable(
    taxableMonthly,
    familyCount,
    childCount
  );

  const localTax = incomeTax * 0.1;

  const totalDeduction =
    pension + health + longTermCare + employment + incomeTax + localTax;

  const netMonthly = monthlySalary - totalDeduction;

  return {
    monthlySalary,
    taxableMonthly,
    pension,
    health,
    longTermCare,
    employment,
    incomeTax,
    localTax,
    totalDeduction,
    netMonthly,
  };
}