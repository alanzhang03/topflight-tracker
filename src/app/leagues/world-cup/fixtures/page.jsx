import FixturesTable from '../../../../../components/FixturesTable';
import { fetchFixtures } from '../../../../../utils/api/fetchFixtures';

export const dynamic = 'force-dynamic';

export default async function WorldCupFixturesPage() {
  const { fixtures, error } = await fetchFixtures('WC');
  return <FixturesTable fixtures={fixtures} error={error} leagueCode="WC" />;
}
