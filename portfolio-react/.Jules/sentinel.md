## 2024-05-08 - Add Permissions-Policy Header to Vercel Deployment
**Vulnerability:** Missing `Permissions-Policy` header in the static deployment configuration.
**Learning:** By default, web applications allow access to native device features (camera, microphone, geolocation) unless explicitly denied. For a static portfolio site, leaving these open is a minor security risk, as malicious third-party scripts could attempt to abuse them or prompt the user.
**Prevention:** Include `"camera=(), microphone=(), geolocation=(), interest-cohort=()"` in the `Permissions-Policy` header inside `vercel.json` to explicitly opt-out of unused device APIs and tracking features like FLoC.
## 2024-06-03 - Prevent Reverse Tabnabbing
**Vulnerability:** External links (e.g., in `AvailabilityCtaPanel.jsx`) opening in the same tab or new tabs without `noopener noreferrer`.
**Learning:** For security and privacy, all links (using `<a>` or `<motion.a>`) targeting external sites should ideally open with `target="_blank"` and must include `rel="noopener noreferrer"`. This prevents reverse tabnabbing (where the newly opened tab can hijack the original window via `window.opener`) and prevents leaking referrer information to external sites.
**Prevention:** Ensure that UI components dynamically rendering links (e.g., from a config file) check if the URL is external (starts with `http`) and conditionally apply `target="_blank"` and `rel="noopener noreferrer"`.
