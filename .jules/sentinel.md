## 2024-05-27 - XSS Vulnerability in Text Highlighting
**Vulnerability:** The application used `dangerouslySetInnerHTML` with a custom `highlightText` function to generate HTML strings for highlighting technical terms. This pattern is vulnerable to Cross-Site Scripting (XSS) if user input or external data ever flows into these text fields, as the data is treated as unescaped HTML.
**Learning:** `dangerouslySetInnerHTML` was used unnecessarily for simple text formatting. It's common for developers to reach for this when they need inline styles on specific words, unaware of the React-native alternatives.
**Prevention:** Avoid `dangerouslySetInnerHTML` for text highlighting. Instead, use a component that splits the text using a capturing regex group and maps the matching parts to safe React elements (like `<strong>`) and non-matching parts to plain strings. This entirely eliminates the need for raw HTML insertion.

## 2026-04-27 - Information Leakage via Anchor Tags
**Vulnerability:** Found multiple anchor tags (`<a>`, `<motion.a>`) linking to external domains using `target="_blank"` with `rel="noopener"`, but omitting `noreferrer`. This could inadvertently pass the referring URL in the HTTP headers to the external site.
**Learning:** While `noopener` secures against reverse tabnabbing (preventing the child window from accessing `window.opener`), omitting `noreferrer` means destination sites could still collect referral tracking data or potentially sensitive info from the referring URL. This is a common oversight when adding links.
**Prevention:** For all outbound links with `target="_blank"`, consistently enforce `rel="noopener noreferrer"`. Consider automating this using ESLint rules like `react/jsx-no-target-blank` to prevent future occurrences.
