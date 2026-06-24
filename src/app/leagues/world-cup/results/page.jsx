import Results from '../../../../../components/Results';
import { fetchResults } from '../../../../../utils/api/fetchResults';

export const dynamic = 'force-dynamic';

export default async function WorldCupResultsPage() {
  const { results, error } = await fetchResults('WC');
  return <Results results={results} error={error} leagueCode="WC" />;
}
