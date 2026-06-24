import supabaseServer from "@/lib/supabaseServer";

export async function getFavorites(userId) {
  const { data, error } = await supabaseServer
    .from("favorites")
    .select("team_id, team_name, team_crest, league_code")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data.map((row) => ({
    id: row.team_id,
    name: row.team_name,
    crest: row.team_crest,
    leagueCode: row.league_code,
  }));
}

export async function addFavorite(userId, team) {
  const { error } = await supabaseServer.from("favorites").upsert(
    {
      user_id: userId,
      team_id: team.id,
      team_name: team.name,
      team_crest: team.crest,
      league_code: team.leagueCode,
    },
    { onConflict: "user_id,team_id" }
  );

  if (error) throw error;
}

export async function removeFavorite(userId, teamId) {
  const { error } = await supabaseServer
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("team_id", teamId);

  if (error) throw error;
}
