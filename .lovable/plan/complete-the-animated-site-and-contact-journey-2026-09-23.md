# Complete the animated site and contact journey

## What will change
- Keep the current dark mint/cyan identity and opening logo sequence, while making motion more visible throughout the page.
- Add staggered text reveals, scroll-based section entrances, animated counters/signals, interactive service rows, and subtle pointer movement with reduced-motion support.
- Expand the homepage with the complete service and product content from the supplied references, including AI solutions, Every Second AI, automation, CRM/ERP, web and mobile systems, dashboards, process, and company information.
- Replace every Contact, consultation, and project-start action with navigation to a dedicated `/contact` page.
- Build the contact page based on the supplied `code-3.html`: contact details, Alexandria location, live local time, selectable scope and budget, full consultation form, character counter, copy-email feedback, urgent inquiry actions, and success state.
- Add a shared responsive header/footer and a working mobile navigation so both pages stay consistent.

## Technical details
- Use TanStack Router links and create `src/routes/contact.tsx` with unique page metadata.
- Keep the form as an interactive front-end experience that confirms submission; no message delivery service or database will be added.
- Reuse the supplied brand logo and the existing semantic color tokens; no external reference-site assets will be copied.
- Validate desktop and mobile layouts, route navigation, animation states, form controls, and console output in the live preview.
