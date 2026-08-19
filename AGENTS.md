# GreatGod Frontend - AI Development Instructions

## Project

GreatGod is a Christian publishing and media platform.

This repository contains the functional frontend prototype generated
from the Google Stitch prototype and the GreatGod requirements.

The Stitch export is the visual source of truth.

---

## Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- pnpm

---

## Core Objective

Transform the Stitch prototype into a functional frontend prototype.

The application must not be treated as a collection of disconnected
static screens.

User journeys must work end-to-end using shared mock data and state.

---

## Design Rule

The Google Stitch prototype is the visual source of truth.

Do not redesign the application unless explicitly instructed.

Preserve:

- typography
- spacing
- colors
- layouts
- component appearance
- navigation patterns
- responsive behaviour

---

## Persona Routes

Use explicit persona routes:

- /reader
- /author
- /editor
- /moderator
- /admin

Do not use route groups to create duplicate persona dashboard paths.

Incorrect:

app/(author)/dashboard/page.tsx
app/(editor)/dashboard/page.tsx

Both resolve to:

/dashboard

Correct:

app/author/page.tsx
app/editor/page.tsx

---

## Personas

Primary platform roles:

1. Reader
2. Author/Contributor
3. Editor
4. Moderator
5. Administrator

An unauthenticated visitor is an authentication state.

Donor is NOT an exclusive role.

A user may be both:

- Reader + Donor
- Author + Donor
- Reader + Author
- etc.

A donor test persona may exist for demonstration purposes, but
donation capability must not be treated as mutually exclusive with
other roles.

---

## Shared State

All personas must operate against shared mock data.

Do not implement separate hardcoded versions of the same entity.

Example:

Author submits article
→ article becomes IN_REVIEW

Editor sees the article in the review queue.

Editor requests changes
→ article becomes CHANGES_REQUESTED

Author sees the change request.

Author resubmits
→ article becomes IN_REVIEW

Editor approves
→ article becomes APPROVED

Editor publishes
→ article becomes PUBLISHED

Reader can then discover the published article.

---

## Mock Backend

This is currently a frontend prototype.

Do not introduce a real backend unless explicitly requested.

Use mock services and frontend state for:

- users
- articles
- drafts
- submissions
- comments
- moderation
- notifications
- bookmarks
- reading history
- reading plans
- donations
- audit events

Use localStorage where appropriate for prototype persistence.

---

## Stitch Screen Migration

Do NOT automatically create a route for every Stitch screen.

Some Stitch screens represent:

- loading states
- success states
- error states
- empty states
- confirmation dialogs
- modals
- responsive variants
- alternative UI states

These should normally be implemented as states/components of the
appropriate feature rather than independent routes.

---

## User Journey Requirement

The application is not considered functional simply because every
screen exists.

The following journeys must work.

### Reader

Discover
→ Search
→ Search Results
→ Article
→ Bookmark
→ Bookmarks
→ Reopen Article

### Devoted Reader

Dashboard
→ Today's Devotional
→ Read
→ Mark Complete
→ Reading Plan
→ Progress

### Author

Dashboard
→ Create Draft
→ Edit
→ Save
→ Preview
→ Submission Checklist
→ Submit
→ Track Status
→ Receive Feedback
→ Edit
→ Resubmit

### Editor

Dashboard
→ Review Queue
→ Submission
→ Review
→ Request Changes / Approve
→ Schedule
→ Publish

### Moderator

Article
→ Comment
→ Report
→ Moderation Queue
→ Review
→ Approve / Remove
→ Moderation History

### Donor

Giving
→ Amount
→ Frequency
→ Payment
→ Processing
→ Success / Failure
→ Receipt
→ Donation History

### Administrator

Dashboard
→ Users
→ Content
→ Media
→ Taxonomy
→ Donations
→ Audit Log
→ Settings

---

## Development Rules

Before modifying code:

1. Inspect the existing implementation.
2. Check whether the requested functionality already exists.
3. Reuse existing components.
4. Do not duplicate components unnecessarily.
5. Do not delete working functionality without a clear reason.
6. Preserve existing user journeys.
7. Preserve the Stitch design.
8. Check for route conflicts before creating new routes.
9. Do not restart the project from scratch.
10. Continue from the current implementation.

---

## Validation

After significant implementation work:

1. Run TypeScript checks.
2. Run ESLint.
3. Start the development server.
4. Test the affected routes.
5. Test the affected user journey.
6. Check for console/runtime errors.
7. Check responsive behaviour.

Do not proceed to the next major phase while the current phase has
major broken functionality.

---

## Project Status

Read PROJECT_STATUS.md before continuing development.

It contains:

- completed phases
- current phase
- next phase
- architectural decisions
- known issues
- implementation notes

---

## Important

This is an existing implementation.

Do not recreate the project.

Do not recreate the Stitch prototype.

Continue from the current codebase.

When uncertain about an existing implementation, inspect the code
before making assumptions.
