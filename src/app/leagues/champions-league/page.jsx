import React from 'react';
import HomepageDisplay from '../../../../components/HomepageDisplay';
import ClubsDisplay from '../../../../components/ClubsDisplay';
import NewsDisplay from '../../../../components/NewsDisplay';
import { fetchClubs } from '../../../../utils/api/fetchClubs';
import { fetchNews } from '../../../../utils/api/fetchNews';

const teamLinks = {
  'bayer-04-leverkusen': 'https://www.bayer04.de',
  'borussia-dortmund': 'https://www.bvb.de',
  'fc-bayern-munchen': 'https://fcbayern.com',
  'vfb-stuttgart': 'https://www.vfb.de',
  'arsenal-fc': 'https://www.arsenal.com',
  'aston-villa-fc': 'https://www.avfc.co.uk',
  'liverpool-fc': 'https://www.liverpoolfc.com',
  'manchester-city-fc': 'https://www.mancity.com',
  'club-atletico-de-madrid': 'https://en.atleticodemadrid.com',
  'fc-barcelona': 'https://www.fcbarcelona.com',
  'real-madrid-cf': 'https://www.realmadrid.com',
  'ac-milan': 'https://www.acmilan.com',
  'atalanta-bc': 'https://www.atalanta.it',
  'bologna-fc-1909': 'https://www.bolognafc.it',
  'fc-internazionale-milano': 'https://www.inter.it',
  'juventus-fc': 'https://www.juventus.com',
  'girona-fc': 'https://www.gironafc.cat',
  'sporting-clube-de-portugal': 'https://www.sporting.pt',
  'stade-brestois-29': 'https://www.sb29.bzh',
  'lille-osc': 'https://www.losc.fr',
  'paris-saintgermain-fc': 'https://en.psg.fr',
  'as-monaco-fc': 'https://www.asmonaco.com',
  psv: 'https://www.psv.nl',
  'feyenoord-rotterdam': 'https://www.feyenoord.com',
  'rb-leipzig': 'https://www.dierotenbullen.com',
  'celtic-fc': 'https://www.celticfc.com',
  'gnk-dinamo-zagreb': 'https://www.gnkdinamo.hr',
  'club-brugge-kv': 'https://www.clubbrugge.be',
  'ac-sparta-praha': 'https://www.sparta.cz',
  'bsc-young-boys': 'https://www.bscyb.ch',
  'fc-red-bull-salzburg': 'https://www.redbullsalzburg.at',
  'fk-shakhtar-donetsk': 'https://shakhtar.com',
  'sport-lisboa-e-benfica': 'https://www.slbenfica.pt',
  'sk-sturm-graz': 'https://www.sksturm.at',
  'fk-crvena-zvezda': 'https://www.crvenazvezdafk.com',
  'sk-slovan-bratislava': 'https://www.skslovan.com',
};

const ChampionsLeaguePage = async () => {
  const { clubs, error } = await fetchClubs('CL');
  const { news, error: newsError } = await fetchNews('Champions League');

  const routeLinks = [
    { name: 'Standings', path: '/leagues/champions-league/standings' },
    { name: 'Fixtures', path: '/leagues/champions-league/fixtures' },
    { name: 'Results', path: '/leagues/champions-league/results' },
  ];

  return (
    <>
      <HomepageDisplay
        leagueName='Champions League'
        logo='/images/champions-league.svg'
        description='Explore the latest standings, fixtures, results, and more from the Champions League.'
        routeLinks={routeLinks}
      />
      <ClubsDisplay
        clubs={clubs}
        error={error}
        leagueCode='CL'
        teamLinks={teamLinks}
      />
      {/* <NewsDisplay
				news={news}
				error={newsError}
				leagueName="Champions League"
			/> */}
    </>
  );
};

export default ChampionsLeaguePage;
