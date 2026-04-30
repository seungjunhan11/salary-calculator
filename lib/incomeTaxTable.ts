export type IncomeTaxRow = {
  min: number;
  max: number;
  taxByFamilyCount: number[];
};

// 임시 샘플 데이터
// 다음 단계에서 국세청 엑셀/PDF 기준 전체 표로 교체
export const incomeTaxTable: IncomeTaxRow[] = [
  {
    min: 0,
    max: 1060000,
    taxByFamilyCount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    min: 1060000,
    max: 1500000,
    taxByFamilyCount: [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    min: 1500000,
    max: 2000000,
    taxByFamilyCount: [12000, 8000, 4000, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    min: 2000000,
    max: 2500000,
    taxByFamilyCount: [28000, 22000, 16000, 10000, 4000, 0, 0, 0, 0, 0, 0],
  },
  {
    min: 2500000,
    max: 3000000,
    taxByFamilyCount: [50000, 42000, 34000, 26000, 18000, 10000, 4000, 0, 0, 0, 0],
  },
  {
    min: 3000000,
    max: 4000000,
    taxByFamilyCount: [110000, 95000, 80000, 65000, 50000, 35000, 25000, 15000, 8000, 3000, 0],
  },
  {
    min: 4000000,
    max: 5000000,
    taxByFamilyCount: [230000, 210000, 190000, 170000, 150000, 130000, 110000, 90000, 70000, 50000, 30000],
  },
  {
    min: 5000000,
    max: 7000000,
    taxByFamilyCount: [420000, 390000, 360000, 330000, 300000, 270000, 240000, 210000, 180000, 150000, 120000],
  },
  {
    min: 7000000,
    max: 10000000,
    taxByFamilyCount: [780000, 740000, 700000, 660000, 620000, 580000, 540000, 500000, 460000, 420000, 380000],
  },
  {
    min: 10000000,
    max: Infinity,
    taxByFamilyCount: [1300000, 1250000, 1200000, 1150000, 1100000, 1050000, 1000000, 950000, 900000, 850000, 800000],
  },
];

export function calculateIncomeTaxFromTable(
  taxableMonthly: number,
  familyCount: number,
  childCount: number
) {
  const safeFamilyCount = Math.min(Math.max(familyCount, 1), 11);
  const safeChildCount = Math.max(childCount, 0);

  const row = incomeTaxTable.find(
    (item) => taxableMonthly >= item.min && taxableMonthly < item.max
  );

  if (!row) return 0;

  let tax = row.taxByFamilyCount[safeFamilyCount - 1] ?? 0;

  // 임시 자녀세액 보정
  // 실제 국세청 표 반영 시 이 부분도 표 기준으로 교체
  tax = Math.max(tax - safeChildCount * 15000, 0);

  return tax;
}