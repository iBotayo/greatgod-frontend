---
name: Sacred Editorial
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#554240'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
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
  secondary-container: '#d8e2dd'
  on-secondary-container: '#5b6561'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca72f'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#7e2a27'
  secondary-fixed: '#dbe5e0'
  secondary-fixed-dim: '#bfc9c4'
  on-secondary-fixed: '#141d1a'
  on-secondary-fixed-variant: '#3f4945'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 64px
    fontWeight: '500'
    lineHeight: 72px
    letterSpacing: -0.02em
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
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
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
  gutter: 32px
  margin-mobile: 20px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style

The design system is rooted in the "Sacred Editorial" aesthetic—a synthesis of classical publishing traditions and modern digital clarity. It avoids the cold efficiency of modern SaaS in favor of a warm, intentional atmosphere that invites reflection and deep reading.

The personality is **Trustworthy, Warm, and Calm**. The UI functions as a quiet frame for high-quality theological and cultural content, utilizing generous whitespace and a "content-first" philosophy. The design movement is **Minimalist-Classical**, characterized by sophisticated typography, high-quality image treatments, and a tactile sense of depth achieved through tonal layering rather than aggressive shadows.

**Key Visual Principles:**
- **Intentional Restraint:** Every element must serve the content. If a border or background doesn't aid legibility or hierarchy, remove it.
- **Editorial Pacing:** Use layout to create "breathing room," allowing the reader to pause between sections of complex text.
- **Human Connection:** Use soft, organic transitions and warm surface tones to avoid an institutional feel.

## Colors

The palette is inspired by heritage paper and natural pigments. The foundation is a warm cream (`#F9F7F2`) which reduces eye strain compared to pure white, creating a "book-like" reading experience.

- **Primary (Deep Burgundy):** Used sparingly for brand moments, key call-to-actions, and interactive states. It represents the "lifeblood" of the content.
- **Secondary (Slate/Charcoal):** Used for primary headings and UI scaffolding. It provides the necessary weight and authority.
- **Accent (Gold/Ochre):** Reserved for subtle highlights, such as featured category tags or special dividers.
- **Neutral (Parchment & Stone):** A range of warm greys and creams used for surface backgrounds, card containers, and secondary text to maintain a soft contrast.

**Accessibility Note:** All text pairings against the parchment background must maintain a minimum contrast ratio of 4.5:1 to ensure WCAG 2.2 AA compliance.

## Typography

This design system uses a dual-serif approach to maximize the editorial feel while ensuring digital legibility.

1.  **Display & Headlines (EB Garamond):** A classical typeface that brings elegance and historical weight. Use for article titles, pull quotes, and major section headings.
2.  **Body Text (Source Serif 4):** A highly legible, modern serif optimized for long-form reading on screens. Its larger x-height ensures clarity even at smaller sizes.
3.  **UI & Metadata (Hanken Grotesk):** A clean, contemporary sans-serif used for navigation, buttons, and labels. It provides a functional counterpoint to the decorative serifs.

**Hierarchy Guidance:**
- Use `display-lg` for landing page hero sections only.
- Body text should never be smaller than 17px for primary reading content.
- `label-sm` should always be used with increased letter spacing for readability.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for long-form content to ensure optimal line lengths (65-75 characters) for reading. 

- **Desktop:** 12-column grid with a narrow central column (approx. 720px) for articles to focus the reader's eye. 
- **Rhythm:** Spacing follows an 8px base unit. Vertical rhythm is critical; use `stack-lg` (64px) between major sections to emphasize the "warm and calm" brand personality.
- **Margins:** Generous outer margins (safe areas) prevent the UI from feeling cramped. On mobile, maintain at least 20px margins to ensure text doesn't hit the screen edge.

**Reflow Rules:**
- On tablet, the 12-column grid collapses to 8 columns.
- On mobile, sidebars and secondary metadata panels should move below the primary article content or into a hidden drawer.

## Elevation & Depth

To maintain the "Sacred Editorial" feel, this design system avoids heavy shadows and floating effects. Depth is communicated through **Tonal Layering** and **Subtle Outlines**.

- **Surfaces:** Use slightly different shades of cream and beige to indicate hierarchy. A "Level 1" surface is the main background, while "Level 2" (e.g., a card or sidebar) uses a slightly warmer or cooler neutral.
- **Borders:** Use 1px borders in a soft stone color (`#E5E0D8`) to define sections. 
- **Image Treatments:** Photography should have a subtle 1px inner stroke or a very soft 4px border-radius to feel "placed" on the page like a physical book.
- **Interactive States:** Instead of raising an element on hover, use a color shift (e.g., parchment to a light linen) or a subtle 1px inset border.

## Shapes

The shape language is **Soft (Level 1)**. While the overall feel is structured and traditional, sharp 90-degree corners can feel too aggressive for a "warm and calm" brand.

- **Standard Elements:** Buttons, input fields, and tags use a 4px (0.25rem) radius.
- **Cards & Containers:** Use `rounded-lg` (8px) for larger containers to give them a gentle, approachable presence.
- **Image Frames:** Should match the 4px radius of standard elements to maintain consistency.
- **Dividers:** Use "Elegant Dividers"—thin 1px lines that may feature a small centered icon (like a cross or a leaf) for decorative breaks in long text.

## Components

**Buttons:**
- **Primary:** Filled with Deep Burgundy (`#5D1212`), white text (`label-sm`).
- **Secondary:** Outlined in Slate, no fill. High-contrast hover state.
- **Text Link:** Underlined in Primary color, transitions to no-underline on hover.

**Cards:**
- Background: Level 2 Neutral (`#F2EEE6`).
- Border: 1px Stone.
- Content: Top-aligned image, followed by `label-sm` category, `headline-md` title, and a short `body-md` excerpt.

**Inputs & Forms:**
- Background: Pure white or very light cream to contrast with the page background.
- Focus State: 2px solid Deep Burgundy ring with a soft 2px offset.
- Labels: Always visible, using `label-sm`.

**Metadata Styling:**
- Date, Author, and Reading Time should be styled in `label-sm` using Slate text at 70% opacity. Separate items with a middle dot (·) or a thin vertical pipe (|).

**Dividers:**
- Standard: 1px horizontal line, Stone color.
- Flourish: 1px line that fades out at the edges, used to separate major chapters or long-form essays.

**Image Treatments:**
- Use "Captioned Frames"—images should include a `body-sm` italicized caption below, aligned to the left edge of the image.