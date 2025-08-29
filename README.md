# TopFlight Tracker

TopFlight Tracker is a football statistics web application built using Next.js. It provides live updates, standings, fixtures, and results from major football leagues including the Premier League, Bundesliga, La Liga, and the Champions League. This project integrates with the [NewscatcherAPI](https://newscatcherapi.com/) for fetching news related articles and [Football-Data](https://www.football-data.org/) for fetching the latest football-related news.

## Features

- **Live Results**: Displays live scores and results for ongoing and recent matches.
- **League Standings**: Provides up-to-date league standings for top European football leagues.
- **Fixtures**: Shows upcoming fixtures for selected leagues.
- **News**: Fetches the latest football news using the [NewscatcherAPI](https://newscatcherapi.com/).

## Technologies Used

- **Next.js**: The React framework used for server-side rendering and generating static websites.
- **GSAP**: GreenSock Animation Platform for smooth animations throughout the website.
- **Football-Data API**: Provides football data like fixtures, standings, results, and teams for various leagues.
- **NewscatcherAPI**: Provides news articles from trusted sources related to football.
- **SCSS**: Used for styling

## API Usage

This project uses the following APIs:

- **Football-Data API**: For match data, fixtures, teams, and standings.
- **NewscatcherAPI**: For fetching football-related news articles.

## Auto-Update System

TopFlight Tracker includes an intelligent auto-update system that automatically fetches and updates football data in the background, ensuring users always have the latest information without any manual intervention.

### Features

- **Automatic Updates**: Standings, results, and fixtures are updated automatically at configurable intervals
- **Smart Scheduling**: More frequent updates during match days (every 30 minutes) and less frequent during off-days
- **Always Running**: The service starts automatically when the application loads and runs continuously
- **Live Status Indicator**: Users can see the current update status and when data was last refreshed
- **External Triggers**: Use cron jobs, GitHub Actions, or other schedulers for additional update triggers

### Update Intervals

- **Standings**: Every 6 hours
- **Results**: Every 2 hours (more frequent during match days)
- **Fixtures**: Every 24 hours
- **Match Days**: Every 30 minutes when games are active

### Usage

#### Web Interface

The auto-update status panel is available on the main page and favorites page, showing:

- Current update status and last update times for each league
- Next scheduled update time
- Active match days with increased update frequency
- Live data refresh indicators

#### Command Line

Use npm scripts for additional updates or service control:

```bash
# Force update all leagues
npm run update

# Force update specific league
npm run update:pl    # Premier League
npm run update:pd    # La Liga
npm run update:bl1   # Bundesliga
npm run update:cl    # Champions League

# Service control (for maintenance)
npm run auto-update:start
npm run auto-update:stop
npm run auto-update:status
```

#### External Scheduling

Set up cron jobs for automatic updates:

```bash
# Update every 6 hours
0 */6 * * * cd /path/to/project && node scripts/trigger-update.js update

# Update every 2 hours on weekends
0 */2 * * 6,0 cd /path/to/project && node scripts/trigger-update.js update
```

See `scripts/cron-examples.txt` for more examples.

### Configuration

The auto-update service automatically detects match days and adjusts update frequency accordingly. You can modify update intervals in `utils/api/autoUpdateService.js`.

## Acknowledgments

Special thanks to:

- [Football-Data API](https://www.football-data.org/)
- [NewscatcherAPI](https://newscatcherapi.com/)

## Contact

For any questions or suggestions, feel free to contact me at [alan.s.zhang@gmail.com].
