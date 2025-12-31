import React from 'react';
import HomepageDisplay from '../../../../components/HomepageDisplay';
import ClubsDisplay from '../../../../components/ClubsDisplay';
import NewsDisplay from '../../../../components/NewsDisplay';
import { fetchClubs } from '../../../../utils/api/fetchClubs';
import { fetchNews } from '../../../../utils/api/fetchNews';
const teamLinks = {
  'real-madrid-cf': 'https://www.realmadrid.com',
  'fc-barcelona': 'https://www.fcbarcelona.com',
  'club-atletico-de-madrid': 'https://en.atleticodemadrid.com',
  'sevilla-fc': 'https://www.sevillafc.es',
  'real-betis-balompie': 'https://www.realbetisbalompie.es',
  'athletic-club': 'https://www.athletic-club.eus',
  'real-sociedad-de-futbol': 'https://www.realsociedad.eus',
  'villarreal-cf': 'https://villarrealcf.es',
  'valencia-cf': 'https://www.valenciacf.com',
  'rc-celta-de-vigo': 'https://www.rccelta.es',
  'getafe-cf': 'https://www.getafecf.com',
  'rayo-vallecano-de-madrid': 'https://www.rayovallecano.es',
  'girona-fc': 'https://www.gironafc.cat',
  'ud-las-palmas': 'https://www.udlaspalmas.es',
  'deportivo-alaves': 'https://www.deportivoalaves.com',
  'rcd-espanyol-de-barcelona': 'https://www.rcdespanyol.com/en/',
  'ca-osasuna': 'https://www.osasuna.es/en',
  'rcd-mallorca': 'https://www.rcdmallorca.es/en',
  'cd-leganes': 'https://www.cdleganes.com/en',
  'real-valladolid-cf': 'https://www.realvalladolid.es/',
};

const LaLigaPage = async () => {
  const { clubs, error } = await fetchClubs('PD');
  const { news, error: newsError } = await fetchNews('La Liga');

  const routeLinks = [
    { name: 'Standings', path: '/leagues/la-liga/standings' },
    { name: 'Fixtures', path: '/leagues/la-liga/fixtures' },
    { name: 'Results', path: '/leagues/la-liga/results' },
  ];

  return (
    <>
      <HomepageDisplay
        leagueName='La Liga'
        logo='/images/la-liga.svg'
        description='Explore the latest standings, fixtures, results, and more from La Liga.'
        routeLinks={routeLinks}
      />
      <ClubsDisplay
        clubs={clubs}
        error={error}
        leagueCode='PD'
        teamLinks={teamLinks}
      />
      {/* <NewsDisplay news={news} error={newsError} leagueName="La Liga" /> */}
    </>
  );
};

export default LaLigaPage;
