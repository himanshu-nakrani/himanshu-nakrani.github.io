## 2024-05-01 - Missing Security Headers in Vercel Deployment
**Vulnerability:** Missing security headers (CSP, X-Frame-Options, X-Content-Type-Options, etc.)
**Learning:** The static React application hosted on Vercel did not define HTTP security headers by default, leaving the application open to framing (Clickjacking) and MIME-type sniffing.
**Prevention:** Include a `vercel.json` file in the root of the project to explicitly enforce standard security headers for all routes via `"source": "/(.*)"`.
