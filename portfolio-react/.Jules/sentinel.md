## 2024-05-08 - Add Permissions-Policy Header to Vercel Deployment
**Vulnerability:** Missing `Permissions-Policy` header in the static deployment configuration.
**Learning:** By default, web applications allow access to native device features (camera, microphone, geolocation) unless explicitly denied. For a static portfolio site, leaving these open is a minor security risk, as malicious third-party scripts could attempt to abuse them or prompt the user.
**Prevention:** Include `"camera=(), microphone=(), geolocation=(), interest-cohort=()"` in the `Permissions-Policy` header inside `vercel.json` to explicitly opt-out of unused device APIs and tracking features like FLoC.
## 2026-06-18 - Secure External Links against Reverse Tabnabbing
**Vulnerability:** External links rendered dynamically from mapped arrays missing `rel="noopener noreferrer"` while conditionally opening in new tabs.
**Learning:** When using mapped arrays to render both internal and external links dynamically, conditionally applying `target="_blank"` is not enough. If `rel="noopener noreferrer"` is omitted, the target external site can gain access to the `window.opener` object of the portfolio, enabling reverse tabnabbing attacks (a form of phishing).
**Prevention:** Whenever rendering a list of mixed links, conditionally spread the `target` and `rel` attributes together, ensuring any external URL (e.g. `href.startsWith('http')`) receives `rel="noopener noreferrer"`.
