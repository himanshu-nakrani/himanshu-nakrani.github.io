## 2024-05-04 - Enforcing Content Security Policy (CSP)
**Vulnerability:** The Vercel deployment configuration (`vercel.json`) was missing a `Content-Security-Policy` header and instead used the deprecated `X-XSS-Protection` header.
**Learning:** Modern browsers ignore `X-XSS-Protection`, and relying on it without a CSP leaves the application vulnerable to Cross-Site Scripting (XSS) and data injection attacks. Setting a robust CSP at the edge mitigates these risks by restricting the sources from which resources can be loaded.
**Prevention:** Always define a strict baseline `Content-Security-Policy` (e.g., `default-src 'self'`) in the deployment configuration (like `vercel.json` or `next.config.js`) instead of relying on outdated headers.
