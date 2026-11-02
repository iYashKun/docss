# {{SITE_NAME}}

Documentation site powered by [docss-theme](https://www.npmjs.com/package/docss-theme).

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit `docs.config.ts` and add pages under `content/docs/`.

## Configure

Set the site name, description, canonical URL, language, and navigation in `docs.config.ts`. Set `NEXT_PUBLIC_SITE_URL` to your public site URL in the hosting provider.

## Deploy

```bash
npm run lint
npm run typecheck
npm run build
```

Import this project into Vercel, or deploy with the Vercel CLI. Other Node.js hosts can run `npm run build` followed by `npm start`.
