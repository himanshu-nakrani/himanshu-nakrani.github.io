## 2024-05-04 - Enforcing Content Security Policy (CSP)
**Vulnerability:** The Vercel deployment configuration (`vercel.json`) was missing a `Content-Security-Policy` header and instead used the deprecated `X-XSS-Protection` header.
**Learning:** Modern browsers ignore `X-XSS-Protection`, and relying on it without a CSP leaves the application vulnerable to Cross-Site Scripting (XSS) and data injection attacks. Setting a robust CSP at the edge mitigates these risks by restricting the sources from which resources can be loaded.
**Prevention:** Always define a strict baseline `Content-Security-Policy` (e.g., `default-src 'self'`) in the deployment configuration (like `vercel.json` or `next.config.js`) instead of relying on outdated headers.
## 2025-05-20 - Add strict referrerPolicy to external analytics images
**Vulnerability:** External images in `ProfilesPage.jsx` loaded via `<img>` tags (e.g. `github-readme-stats-phi.vercel.app`, `leetcard.jacoblin.cool`) sent the `Referer` header to third-party domains, potentially leaking full URLs and browsing context.
**Learning:** Even with `strict-origin-when-cross-origin` in `vercel.json`, the origin itself is still leaked by default. Adding `referrerPolicy="no-referrer"` directly on the image element completely stops the leak, providing defense in depth.
**Prevention:** Always add `referrerPolicy="no-referrer"` on third-party analytics or dynamic SVG badges when they do not explicitly require the referrer context.
