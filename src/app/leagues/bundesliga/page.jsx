import React from 'react';
import HomepageDisplay from '../../../../components/HomepageDisplay';
import ClubsDisplay from '../../../../components/ClubsDisplay';
import NewsDisplay from '../../../../components/NewsDisplay';
import { fetchClubs } from '../../../../utils/api/fetchClubs';
import { fetchNews } from '../../../../utils/api/fetchNews';

const teamLinks = {
  'tsg-1899-hoffenheim': 'https://www.tsg-hoffenheim.de',
  'bayer-04-leverkusen': 'https://www.bayer04.de',
  'fc-bayern-munchen': 'https://fcbayern.com',
  'borussia-dortmund': 'https://www.bvb.de',
  'rb-leipzig': 'https://www.dierotenbullen.com',
  'vfl-wolfsburg': 'https://www.vfl-wolfsburg.de',
  'eintracht-frankfurt': 'https://www.eintracht.de',
  'borussia-monchengladbach': 'https://www.borussia.de',
  'sc-freiburg': 'https://www.scfreiburg.com',
  '1-fsv-mainz-05': 'https://www.mainz05.de',
  'fc-augsburg': 'https://www.fcaugsburg.de',
  'vfb-stuttgart': 'https://www.vfb.de',
  'hertha-berlin': 'https://www.herthabsc.de',
  'fc-schalke-04': 'https://www.schalke04.de',
  'sv-werder-bremen': 'https://www.werder.de',
  '1-fc-koln': 'https://www.fc-koeln.de',
  '1-fc-union-berlin': 'https://www.fc-union-berlin.de',
  'vfl-bochum-1848': 'https://www.vfl-bochum.de',
  '1-fc-heidenheim-1846': 'https://www.fc-heidenheim.de',
  'holstein-kiel': 'https://www.holstein-kiel.de/',
  'fc-st-pauli-1910': 'https://www.fcstpauli.com/en/',
};

const BundesligaPage = async () => {
  const { clubs, error } = await fetchClubs('BL1');
  const { news, error: newsError } = await fetchNews('Bundesliga');

  const routeLinks = [
    { name: 'Standings', path: '/leagues/bundesliga/standings' },
    { name: 'Fixtures', path: '/leagues/bundesliga/fixtures' },
    { name: 'Results', path: '/leagues/bundesliga/results' },
  ];

  return (
    <>
      <HomepageDisplay
        leagueName='Bundesliga'
        logo='/images/bundesliga.svg'
        description='Explore the latest standings, fixtures, results, and more from the Bundesliga.'
        routeLinks={routeLinks}
      />
      <ClubsDisplay
        clubs={clubs}
        error={error}
        leagueCode='BL1'
        teamLinks={teamLinks}
      />
      {/* <NewsDisplay news={news} error={newsError} leagueName="Bundesliga" /> */}
    </>
  );
};

export default BundesligaPage;
