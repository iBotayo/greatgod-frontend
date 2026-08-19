---
name: Sacred Devotion
colors:
  surface: '#fff8f7'
  surface-dim: '#e8d6d4'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ef'
  surface-container: '#fceae8'
  surface-container-high: '#f6e4e2'
  surface-container-highest: '#f1dedc'
  on-surface: '#231918'
  on-surface-variant: '#554240'
  inverse-surface: '#392e2d'
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
  on-background: '#231918'
  surface-variant: '#f1dedc'
  surface-paper: '#fbf9f4'
  surface-linen: '#f5f3ee'
  stone-outline: '#887270'
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

The design system expands the "Sacred Editorial" aesthetic into a specialized donation and stewardship experience. The brand personality is **Calm, Trustworthy, and Secure**, moving away from the high-pressure tactics of modern fundraising in favor of an atmosphere of prayerful reflection and quiet invitation.

The chosen style is **Minimalist-Classical with High-Trust Cues**. It leverages the warmth of heritage publishing while integrating modern security indicators that feel intentional rather than institutional. The goal is to make the act of giving feel like a natural extension of the reader's engagement with the content—a sacred transaction rather than a digital checkout.

**Key Visual Principles:**
- **Non-Aggressive Persuasion:** Avoid loud "Donate Now" buttons. Use generous whitespace to allow the user to reach the decision to give without feeling rushed.
- **Security through Serenity:** Trust is built through precision, alignment, and subtle iconography (lock icons, secure shields) that are integrated into the typography rather than treated as disruptive badges.
- **Intentionality:** Every form field and button must feel like it was placed with care. Interactions are soft and deliberate, reinforcing the "Sacred" nature of the contribution.

## Colors

The palette is anchored by **Deep Burgundy (#5d1212)**, representing the "primary-container" color of the editorial system, used here for the most critical actions and trust indicators. 

- **Primary (Deep Burgundy):** Reserved for primary CTA buttons (e.g., "Complete Donation") and active states in payment selection.
- **Secondary (Charcoal/Slate):** Used for instructional text and secondary actions to maintain a grounded, authoritative feel.
- **Surface (Paper & Linen):** The background hierarchy uses `#fbf9f4` (Paper) for the page and `#f5f3ee` (Linen) for form containers to create a subtle, non-intrusive contrast.
- **Success Secure:** A specialized deep forest green is introduced sparingly for "Secure Connection" indicators to signal safety without clashing with the warm palette.

**Application Note:** Maintain high contrast for all numerical input (donation amounts) to ensure absolute clarity and prevent user error.

## Typography

This system uses a tiered typographic approach to guide the donor's eye through the "Giving Story."

- **The Giving Narrative:** Use `headline-lg` for the primary appeal. Use `body-lg` for the introductory paragraph to make the call to stewardship feel personal and significant.
- **Functional Forms:** All input labels and technical metadata (processing fees, security disclaimers) use `Hanken Grotesk` (`label-lg` and `label-sm`). This provides a functional, modern counterpoint to the more emotive serifs.
- **Financial Visuals:** A specialized `donation-amount` style is used for the currency input or display, ensuring the donor has a clear, large-scale view of their intended gift.
- **Mobile Adjustments:** `headline-lg-mobile` should be used for all H1 equivalents on devices to prevent awkward line breaks while maintaining the editorial weight.

## Layout & Spacing

The layout philosophy shifts from a wide-spanning editorial grid to a **Focused Fixed Grid** for donation flows.

- **The Focused Core:** On desktop, the donation form is centered within a 560px "Giving Vessel" to minimize distractions.
- **Generous Verticality:** Use `stack-lg` (64px) between the appeal text and the start of the donation form to create a moment of pause.
- **Mobile Reflow (GreatGod Base):** Adopting the GreatGod mobile logic, components stack vertically with a strict 20px side margin. Elements like "Donation Frequency" chips should scroll horizontally if more than three options exist, ensuring the form remains compact.
- **Interactive Spacing:** Use `stack-sm` (16px) between form labels and their respective input fields to maintain a tight, logical association.

## Elevation & Depth

In alignment with the editorial foundation, depth is achieved through **Tonal Layering** and **Subtle Outlines** rather than shadows.

- **The Vessel Layer:** The primary donation form should sit on a "Level 2" surface (`#f5f3ee`). This differentiates the active task from the "Level 1" page background.
- **High-Trust Outlines:** Use 1px stone-colored borders (`#887270`) to define input areas. When a field is focused, transition to a 2px Deep Burgundy border—this "sharpens" the element, indicating active attention.
- **Secure Badges:** Trust indicators (lock icons) should not use shadows. They should be styled as flat, high-contrast marks integrated into the footer or adjacent to the "Submit" action, appearing as part of the structural grid.

## Shapes

The shape language is **Soft (Level 1)**, providing a disciplined but approachable feel.

- **Actionable Elements:** Buttons and input fields use a **4px (0.25rem)** radius. This keeps the look professional and aligned with classical publishing.
- **The Giving Vessel:** The main container for the donation flow uses **rounded-lg (8px)** to subtly soften the "financial" aspect of the form.
- **Progress Indicators:** Small circular dots or thin pills for multi-step flows should be used, avoiding overly "bubbly" shapes to maintain the serious, calm tone.

## Components

**Donation Buttons (CTAs):**
- **Primary Action:** Solid Deep Burgundy fill, white `label-sm` text (all caps with 0.08em tracking). The button should feel substantial but not oversized.
- **Amount Selection Chips:** Outlined in Stone. When selected, the background fills with a very light Linen (`#f5f3ee`) and the border thickens to 2px Primary.

**The "Trust Footer":**
- A specialized component at the bottom of the Giving Vessel containing: a small Lock Icon, the text "Secure SSL Encrypted Connection" in `label-sm`, and a brief sentence on tax-deductibility in `body-sm` italics.

**Input Fields:**
- Background: Pure white (`#ffffff`) to distinguish active entry areas from the Linen container.
- Focused state: 2px Deep Burgundy border with no glow/shadow.

**Secure Badges:**
- Simple, flat vector icons of locks or shields in the "Success Secure" green or Primary Burgundy. Avoid "Gold Verified" seals which can look dated or cluttered.

**Progress Tracker:**
- A thin 1px Stone line at the top of the form with a Primary Burgundy segment indicating progress. Use `label-sm` for step titles (e.g., 01 Amount · 02 Details · 03 Payment).