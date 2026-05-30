## 2024-05-08 - Add Permissions-Policy Header to Vercel Deployment
**Vulnerability:** Missing `Permissions-Policy` header in the static deployment configuration.
**Learning:** By default, web applications allow access to native device features (camera, microphone, geolocation) unless explicitly denied. For a static portfolio site, leaving these open is a minor security risk, as malicious third-party scripts could attempt to abuse them or prompt the user.
**Prevention:** Include `"camera=(), microphone=(), geolocation=(), interest-cohort=()"` in the `Permissions-Policy` header inside `vercel.json` to explicitly opt-out of unused device APIs and tracking features like FLoC.

## 2024-05-24 - Enhance CSP to mitigate base tag injection and prevent object execution
**Vulnerability:** The Content Security Policy in `vercel.json` lacked `base-uri 'none'` and `object-src 'none'` directives.
**Learning:** The absence of `base-uri` allows potential attackers to inject a `<base>` tag and hijack relative URLs in the application. Leaving `object-src` open can allow outdated plugins (like Flash) or malicious PDFs to execute JavaScript within the application's origin context.
**Prevention:** Always restrict `base-uri` and `object-src` to `'none'` as part of defense-in-depth CSP configurations, unless specifically required by the application.
