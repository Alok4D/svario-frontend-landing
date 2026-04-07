import { NextResponse } from "next/server";

type Months = 6 | 12 | 24;

function buildMonthlyData(n: Months) {
  const now = new Date();
  const labels: string[] = [];
  const values: number[] = [];

  // oldest → newest
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const lbl = new Intl.DateTimeFormat("en", {
      month: "short",
      year: n > 12 ? "2-digit" : undefined, // 24 মাস হলে বছরও দেখাও
    }).format(d);
    labels.push(lbl);

    // demo value: steady growth + seasonality
    const idx = n - 1 - i;
    const base = 1200 + idx * 90;
    const seasonal = Math.round(200 * Math.sin((2 * Math.PI * idx) / 12));
    values.push(base + seasonal);
  }

  return { labels, values };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const months = (parseInt(searchParams.get("months") || "12", 10) ||
    12) as Months;

  const n = ([6, 12, 24].includes(months) ? months : 12) as Months;
  const body = {
    granularity: "month",
    months: n,
    currency: "USD",
    ...buildMonthlyData(n),
  };
  return NextResponse.json(body);
}
