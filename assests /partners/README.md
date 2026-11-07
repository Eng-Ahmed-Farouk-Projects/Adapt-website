# Partner logo asset notes

Partner logo slots are configured in `../js/config.js` under `ADAPT_CONFIG.assets.partnerLogos`.

The website currently falls back to editable text wordmarks where a local image path is empty. This avoids passing third-party or unofficial graphics off as approved partner logos.

Official logo resources located during the website research:

- Hack Club official press kit and marks: https://hackclub.com/press (includes https://assets.hackclub.com/flag-standalone.svg; follow Hack Club's brand instructions and do not recolor/stretch).
- CREATIVA official logo file: https://creativa.gov.eg/wp-content/uploads/2022/08/logo.png
- The VentureX official site includes a footer logo resource: https://www.theventurex.com/TheVentureX-footer.png

For ITIDA, TIEC, Goethe-Institut, and IEEE, use only approved brand assets from their official sites or ask the organization for a suitable dark-background logo. The identity pages are linked in the project root README.

Suggested local file names:

```text
assets/partners/hack-club.svg
assets/partners/creativa.png
assets/partners/itida.svg
assets/partners/tiec.svg
assets/partners/venturex.png
assets/partners/goethe-institut.svg
assets/partners/ieee-egypt.svg
assets/partners/daydream.svg
```

Then update the corresponding paths in `assets/js/config.js`. Keep a clear distinction between a verified organization identity and a verified formal relationship with Adapt.
