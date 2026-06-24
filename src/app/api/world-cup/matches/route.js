import { fetchWCMatches } from "../../../../../utils/api/fetchWCMatches";
import { NextResponse } from "next/server";

export async function GET() {
  const { matches, error } = await fetchWCMatches();
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ matches });
}
