# SEO

## Implemented
- Server-rendered marketing pages with one h1 each, semantic sections and a skip link.
- Unique title and description per page (titles use the "%s | Voxly" template; a test keeps titles under 60 characters and descriptions between 70 and 160).
- Canonical URLs, Open Graph and Twitter metadata, and a generated social image (`src/app/opengraph-image.tsx`).
- `robots.txt` blocks the signed-in pages, `/api/` and `/auth/`. `sitemap.xml` lists the public pages.
- Structured data: WebSite and SoftwareApplication (home, no price or rating claims) and BreadcrumbList (landing pages). FAQPage markup is deliberately not used.

## Page map
| Page | Search intent | File |
|---|---|---|
| `/` | Brand and overview | `src/app/(marketing)/page.tsx` |
| `/voice-to-email` | Turn a voice message into an email | content in `src/config/landing-pages.ts` |
| `/voice-to-notes` | Turn speech into organized notes | same |
| `/voice-to-task-list` | Extract action items from speech | same |
| `/privacy`, `/terms` | Trust pages (draft) | `src/app/(marketing)/` |

## Not done yet
- Landing pages for speech to text and multilingual use.
- A real domain: set `NEXT_PUBLIC_SITE_URL` so canonical URLs, the sitemap and social images use it.
- Search Console setup and indexing checks (after launch).

## Testing
Run `npm run build` then `npm run start`; open `/robots.txt`, `/sitemap.xml`, view page source for the JSON-LD, and check `/opengraph-image`. After launch, use Google's Rich Results Test on the home page.
