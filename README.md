# FeedbackOS

Live app: https://bksingh9.github.io/clone/

FeedbackOS is a public, user-facing product feedback workspace inspired by Formbricks-style survey collection. This GitHub Pages build starts with no seeded records. Users create surveys and submit responses from their own browser session only.

## What Is Live

- GitHub Pages production URL: https://bksingh9.github.io/clone/
- Survey builder
- Response collection
- Response inbox
- Analytics counters
- Pricing surface
- Integration readiness cards
- CSV export from real browser-session responses
- No sample people, no sample emails, no fake integrations

## Services

- GitHub: `.github/workflows/pages.yml` deploys the static public app to GitHub Pages.
- CircleCI: `.circleci/config.yml` validates the static app contract and verifies the live GitHub Pages deployment on tagged releases after approval.
- Expo/EAS: not enabled for this repository because this deployment is a static web app, not an Expo/native app. Add Expo only after creating a native app or choosing EAS Hosting with an Expo project and credentials.

## Data Mode

This static production page stores user-created surveys and responses in browser localStorage under `feedbackos-live-clean-v1`. That keeps the live public app honest: it has no shared database and no fake seeded records.

For shared multi-user production storage, deploy the full app to a server-capable host and connect database, auth, billing, and integration credentials.
