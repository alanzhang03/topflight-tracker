import HomepageDisplay from '../../../../components/HomepageDisplay';

const routeLinks = [
  { name: 'Groups', path: '/leagues/world-cup/groups' },
  { name: 'Fixtures', path: '/leagues/world-cup/fixtures' },
  { name: 'Results', path: '/leagues/world-cup/results' },
  { name: 'Bracket', path: '/leagues/world-cup/bracket' },
];

export default function WorldCupPage() {
  return (
    <HomepageDisplay
      leagueName="FIFA World Cup 2026"
      logo="/images/world-cup.svg"
      description="Live groups, results, fixtures and the knockout bracket for the 2026 FIFA World Cup."
      routeLinks={routeLinks}
    />
  );
}
