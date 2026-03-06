import { fetchResults } from "../../../../../utils/api/fetchResults";
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
    const { results, error } = await fetchResults(leagueCode);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("API Error fetching results:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch results" },
      { status: 500 }
    );
  }
}
