# Strava API Integration Setup

## Step 1: Create a Strava API Application

1. Go to https://www.strava.com/settings/api
2. Fill in the form:
   - **Application Name**: DBB Cycling Hub
   - **Category**: Club
   - **Club**: Drop By Bike (dbb-)
   - **Website**: your app URL
   - **Authorization Callback Domain**: `localhost` (for local dev) or your production domain
3. Save and note your **Client ID** and **Client Secret**

## Step 2: Get Your Refresh Token (One-Time Setup)

### 2a. Authorize the application

Open this URL in your browser (replace `YOUR_CLIENT_ID`):

```
https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost&scope=read,activity:read&approval_prompt=force
```

Click "Authorize" — you'll be redirected to `http://localhost?code=AUTHORIZATION_CODE&scope=read,activity:read`.

Copy the `code` value from the URL.

### 2b. Exchange the code for tokens

```bash
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=YOUR_CLIENT_ID \
  -d client_secret=YOUR_CLIENT_SECRET \
  -d code=AUTHORIZATION_CODE \
  -d grant_type=authorization_code
```

Response will include `access_token` and `refresh_token`. Save the **refresh_token** — the serverless function will use it to auto-refresh access tokens.

## Step 3: Configure Environment Variables

### For Vercel Deployment

In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `STRAVA_CLIENT_ID` | Your Client ID from Step 1 |
| `STRAVA_CLIENT_SECRET` | Your Client Secret from Step 1 |
| `STRAVA_REFRESH_TOKEN` | Your Refresh Token from Step 2 |

### For Local Development

Create a `.env` file (not committed to git):

```env
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_REFRESH_TOKEN=your_refresh_token
```

## Step 4: Deploy

The project includes a Vercel serverless function at `/api/strava/club-events.ts` that:
- Automatically refreshes the access token when it expires (every 6 hours)
- Proxies requests to Strava's club events endpoint
- Caches responses for 5 minutes

Just deploy to Vercel and the function will be available at `/api/strava/club-events`.

## Architecture

```
[Mobile App] → [/api/strava/club-events] → [Strava API]
                     ↓
            Auto-refreshes tokens
            using stored refresh_token
```

Regular app users **do not need** a Strava account. The serverless function uses the club admin's authorization to fetch public club events.

## Club ID

The DBB club ID is `dbb-` (from https://www.strava.com/clubs/dbb-). This is configured in:
- `src/services/stravaService.ts` — `STRAVA_CLUB_ID` constant
- `api/strava/club-events.ts` — default query parameter
