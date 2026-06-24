import { fetchWCStandings } from "../../../../../utils/api/fetchWCStandings";
import { NextResponse } from "next/server";

export async function GET() {
  const { groups, error } = await fetchWCStandings();
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ groups });
}
