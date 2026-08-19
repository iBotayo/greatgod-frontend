---
name: Sacred Devotion
colors:
  surface: '#fff8f7'
  surface-dim: '#efd4d1'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ef'
  surface-container: '#fceae8'
  surface-container-high: '#fee2df'
  surface-container-highest: '#f8dcda'
  on-surface: '#261817'
  on-surface-variant: '#554240'
  inverse-surface: '#3d2c2b'
  inverse-on-surface: '#ffedeb'
  outline: '#887270'
  outline-variant: '#dbc0be'
  surface-tint: '#9c413d'
  primary: '#3e0003'
  on-primary: '#ffffff'
  primary-container: '#5d1212'
  on-primary-container: '#e27770'
  inverse-primary: '#ffb3ad'
  secondary: '#57605d'
  on-secondary: '#ffffff'
  secondary-container: '#dbe5e0'
  on-secondary-container: '#5d6663'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c6a94e'
  on-tertiary-container: '#4e3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#7e2a27'
  secondary-fixed: '#dbe5e0'
  secondary-fixed-dim: '#bfc9c5'
  on-secondary-fixed: '#151d1b'
  on-secondary-fixed-variant: '#404946'
  tertiary-fixed: '#ffe085'
  tertiary-fixed-dim: '#e3c466'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fff8f7'
  on-background: '#261817'
  surface-variant: '#f8dcda'
  surface-paper: '#fbf9f4'
  surface-linen: '#f5f3ee'
  success-secure: '#2e4d41'
typography:
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Source Serif 4
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 28px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  donation-amount:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1120px
  form-width: 560px
  gutter: 32px
  margin-mobile: 20px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style
The design system embodies **Scholarly Clarity and Spiritual Stewardship**, evolving the "Sacred Editorial" aesthetic into a comprehensive environment for research, reading, and contribution. The brand personality is **Calm, Trustworthy, and Disciplined**, moving away from modern commercial urgency in favor of a reflective, heritage-inspired atmosphere.

The chosen style is **Minimalist-Classical**. It leverages the warmth of heritage publishing—evoking the feeling of linen paper and ink—while maintaining the precision of a digital archive. This is achieved through:
- **Quiet Authority:** Generous whitespace and a restricted color palette ensure the content remains the focal point.
- **Academic Precision:** Subtle, fine-lined borders and high-quality serif typography create an environment suited for deep study.
- **Security through Serenity:** Trust is built through structural alignment and deliberate interaction states rather than loud badges or complex effects.

## Colors
The palette is anchored by **Deep Burgundy**, used as the primary catalyst for stewardship and scholarly focus. The background system relies on a nuanced hierarchy of off-whites and warm grays to mimic natural materials.

- **Primary (Deep Burgundy):** Reserved for high-intent actions, active navigation states, and critical scholarly highlights.
- **Secondary (Slate):** Used for instructional text, metadata, and secondary interactive elements to ground the design.
- **Surface (Paper & Linen):** `surface-paper` is the standard canvas for reading. `surface-linen` is utilized for "vessels"—containers like book detail cards, donation forms, or search sidebars—to provide subtle structural depth.
- **Success Secure:** A specialized deep forest green used exclusively for security indicators and successful transaction/download states, ensuring trust without disrupting the warm brand harmony.

## Typography
This system uses a tiered typographic strategy to balance emotional engagement with functional utility.

- **The Scholarly Voice:** `EB Garamond` is used for all headlines and evocative titles. It brings a sense of history and intellectual weight to the library and resources sections.
- **The Reading Experience:** `Source Serif 4` is the primary body face, chosen for its exceptional legibility in long-form digital text. It provides the "breath" required for contemplative reading.
- **The Functional Layer:** `Hanken Grotesk` handles all UI-specific information, metadata, form labels, and button text. This clean, geometric sans-serif distinguishes "the tool" from "the content."
- **Financial Visuals:** `donation-amount` is a specialized display style for currency, ensuring absolute clarity during stewardship flows.

## Layout & Spacing
The layout philosophy centers on focus and legibility, utilizing a **Fixed Grid** approach for utility-heavy areas and a **Fluid Content Column** for reading.

- **Focused Vessels:** For the Books Library and Donation flows, content is often constrained to a 560px central column (the "Giving Vessel" or "Resource Detail") to minimize distraction on wide screens.
- **Vertical Rhythm:** A strict 8px-based spacing system is used. `stack-lg` (64px) is utilized to separate major sections, creating a "moment of pause" between the narrative and the functional components.
- **Mobile Reflow:** On mobile, side margins are fixed at 20px. Lists of resources or payment options should transition to a vertical stack or, in specific cases like frequency selection, a clean horizontal scroller to maintain a compact vertical footprint.

## Elevation & Depth
In keeping with the classical aesthetic, depth is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than ambient shadows.

- **Surface Tiering:** The background remains `surface-paper`. Elements requiring focus (like a book's abstract or a donation form) sit on a `surface-linen` container.
- **Fine-Line Borders:** Use 1px stone-colored borders (`#887270`) to define input fields and resource cards. This mimics the ruled lines of a ledger or academic journal.
- **Active Focus:** When an element is focused or selected, the border transitions to a 2px Deep Burgundy. This "sharpens" the element, indicating the user's active attention without needing to lift the element off the page with a shadow.

## Shapes
The shape language is **Soft (Level 1)**, reflecting the disciplined nature of a library.

- **Utility Components:** Buttons, input fields, and resource tags use a **4px (0.25rem)** radius. This keeps the interface feeling architectural and precise.
- **Content Containers:** The primary "Vessels" for forms or book previews use **rounded-lg (8px)** to subtly distinguish them from the more rigid utility elements and the square edges of the browser.

## Components
- **Library Cards:** Use `surface-linen` background with a 1px Stone outline. Titles in `headline-md`, metadata (author, year) in `label-sm`.
- **Buttons:** 
    - *Primary:* Solid Deep Burgundy fill, White text using `label-sm` (all caps, 0.08em tracking).
    - *Secondary/Outline:* 1px Stone border, Deep Burgundy text.
- **Amount/Resource Chips:** Outlined in Stone. Selected state: `surface-linen` fill with a 2px Primary border.
- **Input Fields:** Pure white background to contrast against `surface-linen` containers. Use a 1px Stone border that thickens to 2px Primary on focus.
- **The "Stewardship Footer":** A locked component at the base of transactional flows containing the Lock Icon and "Secure SSL Connection" in `label-sm` using the `success-secure` green.
- **Downloadable Resource Item:** A list-based component with a prominent icon for the file type (PDF, EPUB) and a clear, text-based "Download" action in Deep Burgundy.