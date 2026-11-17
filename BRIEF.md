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

## Services page override (November 18, 2026)

The user explicitly requested that the Services page follow the layout and composition of the Lumina Nails Lounge services reference while preserving Sugar Nails content and brand styling.

- Use a centered services-menu introduction followed by a continuous catalogue.
- Display every category in document flow. Do not hide service groups behind tabs.
- Use a consistent split card schema: photographic service panel, category label, numbered menu panel, descriptions, prices, and dotted leaders.
- Preserve all supplied Sugar Nails prices and service descriptions. Do not import the reference business's copy, prices, images, identity, or contact information.
- The catalogue itself is the journey: overview, core care, spa peak, enhancements, family services, finishing details, booking.
- Feeling curve: clear and inviting, restorative at Spa Pedicure, expressive through enhancements, playful at Kids, decisive at booking.
- Peak: Spa Pedicure carries the densest service detail while keeping the same outer card size as every other category.
- Catalogue consistency: all desktop service cards use one shared height; tablet and mobile return to natural height so no service copy is clipped.
- Signature move: the compact category index fills a progress trace and follows the active catalogue family while scrolling.
