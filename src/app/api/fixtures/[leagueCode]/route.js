import { fetchFixtures } from "../../../../../utils/api/fetchFixtures";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { leagueCode } = await params;

  if (!leagueCode) {
    return NextResponse.json(
      { error: "League code is required" },
      { status: 400 }
    );
  }

  try {
    const { fixtures, error } = await fetchFixtures(leagueCode);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ fixtures });
  } catch (err) {
    console.error("API Error fetching fixtures:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch fixtures" },
      { status: 500 }
    );
  }
}
