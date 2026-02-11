# Security Notes

## Known Vulnerabilities in Angular 17.3.12

This project uses Angular 17.3.12, which has some known security vulnerabilities that have been patched in later versions (19.2.18+, 20.3.16+, 21.0.7+).

### Identified Vulnerabilities

1. **XSRF Token Leakage** (CVE-2025-21523)
   - Affects: Angular HTTP Client
   - Impact: LOW - Not applicable to this project
   - Reason: This application does not use Angular's HTTP Client or XSRF token handling. All authentication and data storage is done via localStorage.

2. **XSS via Unsanitized SVG Script Attributes** (Multiple CVEs)
   - Affects: Angular Compiler and Core
   - Impact: LOW - Not applicable to this project
   - Reason: This application does not use SVG elements, SVG animations, or user-generated SVG content.

3. **XSS via SVG Animation, SVG URL and MathML Attributes** (CVE-2025-21524)
   - Affects: Angular Compiler
   - Impact: LOW - Not applicable to this project
   - Reason: This application does not use SVG animations, SVG URLs, or MathML elements.

### Mitigation Strategy

While these vulnerabilities exist in the Angular framework version used, **they do not pose a risk to this specific application** because:

1. The application does not use any of the vulnerable features (HTTP Client, SVG, MathML)
2. All user input is properly bound using Angular's built-in sanitization via property binding
3. No user-generated HTML or SVG content is rendered
4. Authentication is handled client-side with localStorage (noted as demo-only)

### Upgrading Considerations

Upgrading to Angular 19+ would resolve these vulnerabilities but would require:
- Major version upgrade (17 → 19)
- Potential breaking changes in the codebase
- Updated dependencies (zone.js, TypeScript, etc.)
- Retesting all functionality

For a production deployment, upgrading to Angular 19.2.18+ or later is recommended if the application will be extended to use HTTP Client, SVG, or MathML features.

### Recommendations for Production

If deploying this application to production:
1. Consider upgrading to Angular 19.2.18 or later
2. Implement Content Security Policy (CSP) headers
3. Use server-side authentication instead of localStorage
4. Regular security audits and dependency updates
5. Monitor for new security advisories

## Last Updated
February 11, 2026
