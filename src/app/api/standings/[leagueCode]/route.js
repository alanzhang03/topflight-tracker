import { fetchStandings } from "../../../../../utils/api/fetchStandings";
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
    const { standings, error } = await fetchStandings(leagueCode);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ standings });
  } catch (err) {
    console.error("API Error fetching standings:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch standings" },
      { status: 500 }
    );
  }
}
