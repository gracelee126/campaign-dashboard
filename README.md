# Campaign Dashboard

A React-based dashboard for managing recruiting campaigns and open roles, integrating data from HeyReach and Ashby platforms.

## Features

- Real-time campaign and role data synchronization
- Password-protected access
- Performance metrics tracking (connection rates, reply rates)
- Campaign-to-role linking and coverage analysis
- Alert system for uncovered roles and performance issues
- Responsive design for desktop and mobile
- Data caching with localStorage

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with responsive design
- **API Integration**: Axios
- **Data Sources**: HeyReach API, Ashby GraphQL API

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- HeyReach API key
- Ashby API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/campaign-dashboard.git
cd campaign-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
- `VITE_HEYREACH_API_KEY`: Your HeyReach API key
- `VITE_ASHBY_API_KEY`: Your Ashby API key
- `VITE_DASHBOARD_PASSWORD`: A secure password for dashboard access

### Development

Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

### Building

Create a production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Data Synchronization

Sync data from APIs:
```bash
npm run sync-data
```

This command fetches the latest campaign and role data and stores it in localStorage.

## Project Structure

```
src/
├── api/              # API integration modules
│   ├── heyreach.ts  # HeyReach API client
│   └── ashby.ts     # Ashby GraphQL client
├── components/       # React components
│   ├── LoginScreen.tsx
│   ├── DashboardHeader.tsx
│   ├── QuickStats.tsx
│   ├── CampaignTable.tsx
│   ├── RolesList.tsx
│   └── AlertsPanel.tsx
├── utils/            # Utility functions
│   ├── analysis.ts   # Campaign-role linking and alerts
│   └── stats.ts      # Statistics calculation
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
├── index.css         # Global styles
└── main.tsx          # Application entry point
```

## Key Concepts

### Campaign Types
- **Recruiting**: Campaigns targeting recruiting roles
- **Client**: Campaigns targeting client-based positions

### Alert Severity Levels
- **Error**: Critical issues requiring immediate attention
- **Warning**: Important issues that should be addressed
- **Info**: Informational alerts and insights

### Performance Metrics
- **Connection Rate**: Percentage of sent messages that resulted in a connection
- **Reply Rate**: Percentage of connections that replied
- **Avg Steps to Connect**: Average number of steps needed to establish a connection

## Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set up environment variables in Netlify dashboard:
   - `VITE_HEYREACH_API_KEY`
   - `VITE_ASHBY_API_KEY`
   - `VITE_DASHBOARD_PASSWORD`
4. Deploy with:
   ```
   npm run build
   ```

### Environment Variables for Production

In Netlify dashboard, set the following variables:
- `VITE_HEYREACH_API_KEY`: Your production HeyReach API key
- `VITE_ASHBY_API_KEY`: Your production Ashby API key
- `VITE_DASHBOARD_PASSWORD`: Your production password

## Security Notes

- Never commit `.env` or `.env.local` files
- Use strong passwords for dashboard access
- Keep API keys secure and rotate them regularly
- All sensitive data is stored in environment variables

## Troubleshooting

### Dashboard showing "Loading..." indefinitely
- Check that API keys are correct in `.env.local`
- Verify that API endpoints are accessible
- Check browser console for error messages

### Data not updating
- Ensure localStorage is enabled in your browser
- Try clearing browser cache and local storage
- Run `npm run sync-data` to manually refresh data

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check that Node.js version is v16 or higher

## Contributing

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add some feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Create a Pull Request

## License

MIT
