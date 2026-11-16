# Sugar Nails Implementation Brief

## Binding direction

The supplied HTML/CSS is the layout source of truth. This build preserves its five-part page structure, class system, composition, responsive behavior, and interaction patterns. Creative reinterpretation into a different layout is out of scope.

## Section mapping

1. `lux-nail-slider`: three-slide full-screen hero, glass copy panel, arched visual, signature badge, social rail, booking action, and slider controls.
2. `miss-about-section`: split arched-image and editorial-copy About section.
3. `lumina-services-section`: supplied nine-card responsive Services grid.
4. `lumina-video-section`: split Experience copy and framed salon media.
5. `lumina-footer-section`: supplied information-rich footer, hours, contact details, social links, and booking CTA.

## Allowed adaptations

- Replace the original business identity with Sugar Nails.
- Use the user-provided logo.
- Change the palette to `#ea661c` and `#ffeac8`.
- Replace original images with project-local Sugar Nails imagery.
- Replace all business details, booking, Facebook, Instagram, map, phone, and hours with the supplied Sugar Nails information.
- Correct broken character encoding and accessibility issues without changing the layout.

## Prohibited adaptations

- No separate navigation header.
- No new editorial page grammar.
- No horizontal service rail or sugar-trail interaction.
- No invented pricing, reviews, awards, statistics, or business claims.
- No hotlinked assets belonging to the reference business.

## Verification

- Desktop viewport: 1440 × 900.
- Mobile viewport: 390 × 844.
- All five sections render in document flow.
- Desktop document height: 5263px.
- Mobile document height: 6622px.
- No console errors or failed resource requests in the final local QA pass.
