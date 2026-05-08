## 2024-05-08 - Add Permissions-Policy Header to Vercel Deployment
**Vulnerability:** Missing `Permissions-Policy` header in the static deployment configuration.
**Learning:** By default, web applications allow access to native device features (camera, microphone, geolocation) unless explicitly denied. For a static portfolio site, leaving these open is a minor security risk, as malicious third-party scripts could attempt to abuse them or prompt the user.
**Prevention:** Include `"camera=(), microphone=(), geolocation=(), interest-cohort=()"` in the `Permissions-Policy` header inside `vercel.json` to explicitly opt-out of unused device APIs and tracking features like FLoC.
