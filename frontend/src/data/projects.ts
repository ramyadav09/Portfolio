import type { Project } from './types'

/**
 * ---------------------------------------------------------------------------
 * PROJECTS — sourced from github.com/ramyadav09
 * ---------------------------------------------------------------------------
 * Every entry below describes an actual repository: the stack, features and
 * architecture come from that repo's README, dependency manifests and source
 * tree, not from a template.
 *
 * What is deliberately *not* claimed:
 *  - `repo.href` points at the real repository. `demo.href` stays `null` because
 *    nothing is deployed, so it renders as a disabled "pending" chip rather
 *    than a dead link.
 *  - `caseStudy.results` is empty on every project. None of these has a measured
 *    outcome recorded, and inventing a number here would undo the point of the
 *    field.
 *  - `status: 'built'` means finished code that runs locally but is not hosted.
 *    Nothing here is `live`.
 *  - `contribution` describes the scope of work the repository contains. If any
 *    of these were team or hackathon builds, narrow these to your own part.
 */
export const projects: Project[] = [
  {
    id: 'smartfind',
    title: 'SmartFind',
    tagline: 'AI-suggested matches between lost and found reports — with ownership still decided by a human.',
    summary:
      'A campus lost-and-found platform where an AI layer proposes potential matches between reports, and a verified claims workflow — not the model — decides who gets the item back.',
    status: 'built',
    featured: true,
    isPlaceholder: false,
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Redux Toolkit',
      'Tailwind CSS',
      'React Router',
      'React Hook Form + Zod',
      'Python 3.11',
      'FastAPI',
      'Pydantic v2',
      'SQLAlchemy 2 (async)',
      'Alembic',
      'PostgreSQL 16',
      'pgvector',
      'Docker Compose',
      'pytest',
      'Vitest',
      'Playwright',
    ],
    repo: { label: 'Repository', href: 'https://github.com/ramyadav09/Smart-Find' },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'image',
      src: '/assets/smart-find.png',
      alt: 'SmartFind item detail view with match card and reasons',
      width: 800,
      height: 500,
    },
    highlights: [
      'Weighted matching: 0.55 semantic similarity plus category, colour, location and date proximity, with a 0.35 floor and a cap of ten matches.',
      'Every match is labelled *potential*, carries the reasons it scored, and can be dismissed — the model never transfers ownership.',
      'Falls back to deterministic token-overlap scoring when no AI provider is configured, so the feature degrades instead of breaking.',
      'Claims require identifying details and an admin decision; users cannot claim their own reports.',
      'JWT access plus refresh, bcrypt hashing, server-side RBAC, validated uploads and an admin audit trail.',
      '67 backend tests, 8 frontend component tests and a Playwright end-to-end flow.',
    ],
    contribution:
      'Full-stack build: the FastAPI service layer (repositories, services, Pydantic schemas, Alembic migrations), the weighted matching engine and its provider abstraction, and the React/Redux frontend covering reports, matches, claims and the admin console.',
    caseStudy: {
      disclaimer:
        'Academic project. It runs locally through Docker Compose; there is no hosted demo, and no measured outcome has been recorded — so the results section below is intentionally empty.',
      problem:
        'Lost-property handling on a campus runs on group chats and notice boards. A report is only useful if the person holding the item happens to see it, and the descriptions rarely match: one person writes "black Wildcraft bag", the other "dark backpack". Matching is the hard part, not storing the reports.',
      intendedUsers:
        'Students and staff who lose or find items, plus the administrators who currently arbitrate ownership by hand. The admin workflow matters as much as the student one, because someone has to decide who actually gets the bag.',
      solution:
        'A single place to file structured reports, with an AI layer proposing matches between the lost pool and the found pool. Each approved report is embedded and compared against the opposite pool using weighted semantic similarity plus attribute agreement on category, colour, location and date. Matches surface as a normalised score with plain-language reasons. Crucially, a match is only ever a suggestion: resolution goes through a claims workflow where a claimant supplies identifying details and an administrator approves or rejects. For images, a vision model can optionally extract category, colour and brand; without any provider configured, deterministic scoring keeps every screen functional.',
      dataFlow: [
        {
          label: '1 · Report',
          detail:
            'A student files a report with category, colour, brand, location, approximate time, contact preference and photos. Uploads are validated by content rather than extension, then stored through the storage adapter.',
        },
        {
          label: '2 · Moderate',
          detail:
            'The report is held for admin approval. Only approved reports enter the matching pool, which keeps spam and duplicate submissions from generating noise for everyone else.',
        },
        {
          label: '3 · Embed',
          detail:
            'Approved report text is preprocessed and embedded through AIService. Chunks and vectors live in PostgreSQL alongside their source rows via pgvector, so a vector can never outlive the row it describes.',
        },
        {
          label: '4 · Score',
          detail:
            'The candidate set is the opposite pool (a found report searches lost reports, and vice versa). Each candidate gets a weighted score — semantic similarity dominates, with category, colour, location and date proximity contributing the remainder.',
        },
        {
          label: '5 · Filter',
          detail:
            'Business rules apply before anything reaches a user: a minimum score threshold, de-duplication against pairs already surfaced, and a cap on how many matches one report can produce.',
        },
        {
          label: '6 · Explain & notify',
          detail:
            'Surviving matches become ItemMatch rows with their reasons attached ("same category", "similar colour"). The owner is notified, and the UI shows the score, the reasons and a disclaimer with a dismiss action.',
        },
        {
          label: '7 · Claim',
          detail:
            'A claimant opens a claim with identifying details they could only know by owning the item. An admin approves or rejects; approval resolves the report and closes out competing claims.',
        },
      ],
      stack: [
        {
          label: 'Frontend',
          items: [
            'React 18 + TypeScript on Vite',
            'Redux Toolkit for session and async state',
            'React Router with route guards per role',
            'Tailwind CSS for the whole interface',
            'React Hook Form + Zod validation mirroring the API schemas',
          ],
        },
        {
          label: 'Backend',
          items: [
            'FastAPI as a deliberately modular monolith',
            'Layered: endpoints → services → repositories → SQLAlchemy models',
            'Pydantic v2 request/response schemas',
            'Alembic migrations, applied automatically on container start',
            'Consistent error envelope across every endpoint',
          ],
        },
        {
          label: 'Data',
          items: [
            'PostgreSQL 16 as the single source of truth',
            'pgvector for embeddings, kept transactional with their rows',
            'Server-side filtering and pagination for search',
            'Audit log table recording administrative actions',
          ],
        },
        {
          label: 'AI',
          items: [
            'AIService interface with providers selected by environment',
            'OpenAI-compatible, NVIDIA NIM and local server options',
            'NullAIService fallback so the app runs with no provider configured',
            'Optional vision model for extracting attributes from photos',
          ],
        },
      ],
      ai: {
        summary:
          'Matching is a scoring problem, not a generation problem. The model contributes one signal — semantic similarity between two short reports — and the rest of the score is explainable attribute agreement. That keeps the output tunable, and lets the whole feature fall back to deterministic text overlap when no provider is available.',
        model: 'Provider-neutral: an OpenAI-compatible endpoint, NVIDIA NIM, or a local server, chosen by environment. Embeddings for similarity; an optional vision model for photo attributes.',
        pipeline: [
          {
            label: '01',
            detail:
              'Preprocessing — report fields are flattened into a single comparable text block so colour, brand and free-text details all contribute to the embedding rather than being ignored.',
          },
          {
            label: '02',
            detail:
              'Embedding — AIService generates the vector. If the provider is unavailable, the pipeline degrades to token overlap instead of failing the request.',
          },
          {
            label: '03',
            detail:
              'Weighted scoring — semantic similarity at 0.55, then category 0.15, colour 0.10, location 0.10 and date proximity 0.10. The weights are explicit constants, not buried in a prompt.',
          },
          {
            label: '04',
            detail:
              'Business rules — a 0.35 minimum score, de-duplication of already-seen pairs, and a cap of ten matches per report to keep the list actionable.',
          },
          {
            label: '05',
            detail:
              'Explanation — each surviving match records which attributes agreed, so the user sees why it was suggested instead of a bare percentage.',
          },
          {
            label: '06',
            detail:
              'Human decision — nothing is resolved by the score. Ownership moves only when an administrator approves a claim.',
          },
        ],
      },
      agentic: null,
      errorHandling: [
        'A missing or failing AI provider degrades to deterministic scoring rather than surfacing a 500 — matching is a feature, not a hard dependency.',
        'Match generation runs against a bounded candidate set with a hard cap, so one report cannot produce an unbounded result list.',
        'Uploads are validated before they reach storage, and rejected with a specific reason rather than a generic failure.',
        'All API errors share one envelope shape, so the frontend has a single error path instead of per-endpoint special cases.',
      ],
      security: [
        'JWT access tokens with refresh, and bcrypt password hashing.',
        'Role checks are enforced server-side at the route boundary, not by hiding UI.',
        'A user cannot claim a report they filed themselves — the check is in the service layer, not the form.',
        'Uploads are validated by content rather than file extension alone.',
        'Administrative actions are written to an audit trail.',
        'Provider keys exist only in backend environment variables; the frontend never sees them.',
      ],
      testing: [
        '67 backend tests spanning unit and API/integration, run with pytest against a test database',
        '8 frontend component tests with Vitest and React Testing Library',
        'A Playwright end-to-end flow covering the report → match → claim path',
        'Strict TypeScript typecheck as part of the frontend build',
      ],
      tradeoffs: [
        {
          decision: 'A modular monolith instead of separate services',
          rationale:
            'The whole system is one deployable with clear internal layering. Splitting it would have added network boundaries and deployment overhead without solving any problem this project actually has.',
        },
        {
          decision: 'Weighted scoring instead of asking a model to judge the match',
          rationale:
            'Attribute agreement is explainable and tunable, and it keeps working when the provider is down. A model-written verdict would have been harder to justify to a user who disagrees with it.',
        },
        {
          decision: 'pgvector in PostgreSQL instead of a dedicated vector store',
          rationale:
            'Vectors stay in the same transaction as the rows they describe, which removes an entire class of consistency bug. A separate store only earns its place when the corpus outgrows one Postgres instance.',
        },
        {
          decision: 'Admin approval gates both reports and claims',
          rationale:
            'It keeps unmoderated content out of the matching pool and stops the matching score from becoming a de facto ownership decision. The cost is friction for legitimate users.',
        },
      ],
      lessons: [
        'The similarity threshold mattered more than the model. Tuning business rules around the score moved quality further than swapping providers did.',
        'An AI feature that degrades to a non-AI path is far easier to develop against, because the rest of the system can be tested without a provider.',
        'Writing the matching reasons down at score time — rather than reconstructing them in the UI — is what made the results defensible.',
        'Structured layer boundaries made a large codebase navigable: routers stay HTTP-only, and no layer skips downward.',
      ],
      results: [],
    },
  },
  {
    id: 'job-portal',
    title: 'Seagol Jobs',
    tagline: 'A job marketplace where a booking queue and a refundable deposit keep both sides honest.',
    summary:
      'A three-surface platform — FastAPI backend, React admin panel and React Native app — where posters book seekers, a FIFO queue absorbs over-subscription, and a commitment deposit is returned on completion but forfeited on a late cancellation or no-show.',
    status: 'in-progress',
    featured: false,
    isPlaceholder: false,
    stack: [
      'Python 3.11',
      'FastAPI',
      'SQLAlchemy 2 (async)',
      'asyncpg',
      'Alembic',
      'Pydantic v2',
      'PostgreSQL 15',
      'JWT (access + refresh)',
      'bcrypt',
      'APScheduler',
      'slowapi',
      'Cloudinary',
      'Firebase Cloud Messaging',
      'eSewa',
      'Khalti',
      'React 19',
      'Redux Toolkit',
      'Tailwind CSS',
      'Vite',
      'React Native 0.74',
      'TanStack Query',
    ],
    repo: { label: 'Private repository', href: null },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'image',
      src: '/assets/seagol-jobs.png',
      alt: 'Seagol Jobs seeker booking flow and queue accept window',
      width: 800,
      height: 500,
    },
    highlights: [
      'A FIFO queue that auto-queues seekers once a job is fully booked, giving each a 30-minute window to accept before the slot passes on.',
      'A 10% commitment deposit taken at booking and returned on completion — forfeited on a late cancellation or no-show. The platform moves only the deposit; the wage settles directly between poster and worker.',
      'Penalties are calculated and transferred automatically rather than left to an administrator.',
      'Delivery on three channels — in-app, email and Firebase push — with FCM tokens registered per device at login and push silently disabled when Firebase is not configured.',
      'Structured Nepali addressing end to end: 7 provinces and 77 districts seeded, with district, city, ward, street and tole carried on both users and jobs.',
      '31 backend test modules, covering the escrow factor, booking lock ordering, duplicate-booking conflicts and location seeding.',
    ],
    contribution:
      'Backend and client work across the monorepo: async SQLAlchemy models and Alembic migrations, the booking, wallet, queue and penalty services, the admin and support APIs, and the React and React Native clients that consume them. This was a shared build — narrow this to the modules you owned.',
    caseStudy: {
      disclaimer:
        'Private repository, so no link is shown — the source is not public. Actively in development rather than launched, and no measured outcome has been recorded, so the results section is intentionally empty. Confirm the exact launch status before publishing.',
      problem:
        'Informal work — a day of labour, a delivery run, a small repair — is arranged over phone calls and messages, with nothing binding either side. The poster has no guarantee anyone will turn up; the worker has no guarantee of being paid or of being told early that the job fell through. Nothing in that arrangement is recorded, so every disagreement is one person\'s word against another\'s.',
      intendedUsers:
        'Posters offering short-term work, seekers who take it, and the platform administrators who arbitrate the disputes neither side can settle alone.',
      solution:
        'A marketplace with consequences written into the flow rather than bolted on. Posters create jobs with a schedule and a location; seekers book them. When a job is fully booked, further seekers join a FIFO queue and are notified when a slot opens, with a 30-minute window to accept before it passes to the next person. Booking takes a 10% commitment deposit into a wallet, which is returned on completion — a late cancellation or no-show forfeits it, and the penalty transfers automatically. The platform deliberately moves only the deposit: the wage itself settles directly between poster and worker, which keeps the platform out of payment custody it is not licensed for. Everything else a dispute needs — bookings, transactions, reviews, an audit log — is persisted, and an admin panel gives support staff the oversight to intervene on evidence rather than memory.',
      dataFlow: [
        {
          label: '1 · Post',
          detail:
            'A poster creates a job with a structured Nepali address (district, city, ward, street, tole), schedule, niche and wage. Validation happens at the boundary through Pydantic v2 schemas.',
        },
        {
          label: '2 · Book',
          detail:
            'A seeker books a slot. The booking path takes a row lock so two concurrent requests cannot both claim the last place, and the 10% commitment deposit moves into the wallet as blocked balance.',
        },
        {
          label: '3 · Queue',
          detail:
            'Once the job is full, later seekers are appended to a FIFO queue keyed on booking order. Opening a slot notifies the first entry, who has 30 minutes to accept before it expires and advances.',
        },
        {
          label: '4 · Complete',
          detail:
            'On completion the deposit is unblocked and returned to the seeker. Both sides may leave a mutual review.',
        },
        {
          label: '5 · Cancel or no-show',
          detail:
            'A late cancellation triggers the penalty service, which computes the deduction and transfers it — the same path for a poster-side cancellation or an unreported no-show.',
        },
        {
          label: '6 · Escalate',
          detail:
            'Either party can raise a dispute against a booking. Support staff work it in the admin panel with the transaction history, audit log and chat thread in one place.',
        },
      ],
      stack: [
        {
          label: 'Backend',
          items: [
            'FastAPI with versioned routers under /api/v1',
            'SQLAlchemy 2 async over asyncpg, with Alembic migrations',
            'Service layer: auth, job, job_status, booking, wallet, penalty, location, notification, support, audit, admin',
            'APScheduler for scheduled work such as queue expiry',
            'slowapi for rate limiting; python-jose and bcrypt for auth',
          ],
        },
        {
          label: 'Data',
          items: [
            'PostgreSQL 15 as the source of truth',
            'wallets with a separate blocked_balance so committed funds are not spendable',
            'queue_entries holding escrow_amount and refunded_at',
            'states and districts seeded for all 7 provinces and 77 districts of Nepal',
            'audit_logs and a token_blacklist for revoking refresh tokens',
          ],
        },
        {
          label: 'Admin web',
          items: [
            'React 19 with Redux Toolkit and React Router',
            'Tailwind CSS and Vite for the build',
            'Screens for users, jobs, transactions, disputes, niches and support',
          ],
        },
        {
          label: 'Mobile',
          items: [
            'React Native 0.74 with Redux Toolkit and TanStack Query',
            'Firebase Cloud Messaging for push, registered per device on login',
            'react-native-keychain for credentials and NetInfo for offline awareness',
            'React Navigation with native stack and bottom tabs',
          ],
        },
      ],
      ai: null,
      agentic: null,
      errorHandling: [
        'Booking takes a row lock, so two seekers racing for the final slot cannot both succeed.',
        'Duplicate bookings are rejected by a deliberate conflict check rather than a database constraint error surfacing to the user.',
        'Push is disabled silently when Firebase credentials are absent, and notifications fall back to in-app and email instead of failing the request.',
        'Refresh tokens can be revoked through a blacklist, so logout and compromise are handled without rotating signing keys.',
      ],
      security: [
        'JWT access and refresh tokens signed with separate secrets, both required to be at least 32 characters.',
        'Passwords hashed with bcrypt; refresh tokens revocable via a stored blacklist.',
        'Role checks for seeker, poster and super admin enforced server-side.',
        'Uploads routed through Cloudinary with validated content rather than local disk writes.',
        'Rate limiting via slowapi, plus explicit allowed origins and trusted hosts lists.',
        'Payment gateway and Firebase secrets held in server-side environment variables only.',
      ],
      testing: [
        '31 backend test modules run with pytest, covering domain rules rather than only endpoints',
        'Cases specifically for the escrow factor, booking lock ordering, duplicate-booking conflicts and address writes',
        'Location seed data and read caching asserted, so the geography layer cannot silently drift',
        'No CI workflow is configured yet — the suite is run locally',
      ],
      tradeoffs: [
        {
          decision: 'The platform moves the deposit but never the wage',
          rationale:
            'Holding wages would make the platform a payment intermediary with obligations it is not set up to carry. A deposit is enough to make a no-show costly while keeping settlement between the two parties.',
        },
        {
          decision: 'A FIFO queue instead of a bidding or priority system',
          rationale:
            'Queue position is trivially explainable to a user who has just missed a slot, and it needs no scoring to be fair. Bidding would have added a second marketplace on top of the first.',
        },
        {
          decision: 'Penalties applied automatically rather than by an admin',
          rationale:
            'Consistency matters more than case-by-case judgment here, and automation removes the support burden. The trade-off is that a genuinely exceptional circumstance still has to go through the dispute flow.',
        },
        {
          decision: 'A modular monolith across three clients',
          rationale:
            'One backend and one migration path for a web admin panel and a mobile app keeps the domain rules in a single place. Separate services would have tripled the deployment surface for a small team.',
        },
      ],
      lessons: [
        'Money rules belong in the service layer with tests around them, not spread across endpoints — the escrow and penalty paths were the easiest place to introduce a silent bug.',
        'Designing the queue around an expiry window forced the scheduling and notification concerns to be explicit rather than assumed.',
        'Distinguishing spendable balance from blocked balance in the data model prevented a whole class of double-spend question.',
      ],
      results: [],
    },
  },
  {
    id: 'real-estate-platform',
    title: 'Real Estate Platform',
    tagline: 'Property listings, owner KYC and an admin approval pipeline — with real-time support built in.',
    summary:
      'A full-stack property marketplace where nothing reaches the public without an admin approving it: listings, owner verification and uploaded media all pass through a review queue, and disputes are worked in an audited support workspace.',
    status: 'built',
    featured: false,
    isPlaceholder: false,
    stack: [
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
      'bcrypt',
      'Socket.IO',
      'BullMQ',
      'Redis',
      'Cloudinary',
      'Multer',
      'Sharp',
      'Nodemailer',
      'React 19',
      'Vite 7',
      'Redux Toolkit',
      'React Router',
      'Tailwind CSS 4',
      'React Hook Form',
      'Leaflet',
      'React Native',
      'NativeWind',
      'Vitest',
    ],
    repo: { label: 'Private repository', href: null },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'placeholder',
      caption: 'Capture the listing search with the map view open.',
    },
    highlights: [
      'Three roles with different powers — customer, owner and admin — with verification enforced server-side.',
      'Owner KYC: an owner cannot publish until their identity has been reviewed and approved.',
      'Media uploads land in a pending state and are approved before they appear on a public listing.',
      'Property lifecycle tracked explicitly as published, sold or rented, rather than inferred from a flag.',
      'Real-time support: ticket conversations and a customer messenger over Socket.IO, not polling.',
      'Background work — image processing and email — runs through BullMQ on Redis so requests stay fast.',
      'An admin workspace for analytics, approval queues, moderation, FAQs and report investigation.',
      'Interactive map search with Leaflet, plus image cropping on upload via react-image-crop.',
    ],
    contribution:
      'Built the platform end to end as a solo project: the Express and MongoDB API (models, validators, controllers, upload and auth middleware), the Socket.IO support layer, the React 19 web client, and the React Native companion app.',
    caseStudy: {
      disclaimer:
        'Private repository, so no link is shown — the source is not public. The code is complete and runs locally; nothing is hosted, and no measured outcome has been recorded, so the results section is empty. The repository\'s README also describes a UI-design folder that is no longer in the tree, so treat the README as older than the code.',
      problem:
        'Property listings are a market with an obvious asymmetry: the person advertising a property has every incentive to publish, and the person reading has almost no way to check what they are looking at. Bad listings, unreachable owners and photos that do not match the property are the norm rather than the exception. Meanwhile the questions a reader actually has — is this still available, is this person real, is this photo recent — arrive after the fact through a channel nobody tracks.',
      intendedUsers:
        'Customers searching for somewhere to live or buy, owners listing property they want to let or sell, and the platform administrators who have to keep the listings honest and resolve the arguments that follow.',
      solution:
        'A marketplace where publication is a privilege that has to be earned. Owners register and complete KYC; until an administrator approves that verification, their listings cannot go live. The same gate applies to media: an upload is stored but lands in a pending state and stays off the listing until it is approved, which stops the fastest route to a misleading listing. Listings carry an explicit lifecycle — published, sold or rented — so availability is a state rather than a guess. Search runs server-side filters over the listing model, with an interactive Leaflet map for location-led browsing. Support is a first-class feature rather than a contact address: customers open tickets against FAQs, conversations run in real time over Socket.IO with read tracking, and administrators work them in a dedicated workspace with rating and reporting. Anything slow — image processing through Sharp, outbound email through Nodemailer — is pushed onto BullMQ queues backed by Redis, so request latency stays flat as the work grows.',
      dataFlow: [
        {
          label: '1 · Register & verify',
          detail:
            'A user signs up with JWT-based auth and picks a role. An owner submitting for verification enters a KYC review queue and cannot publish until an administrator approves.',
        },
        {
          label: '2 · List',
          detail:
            'An owner creates a property with structured location, price, type and details. Validators run at the route boundary before anything reaches Mongoose.',
        },
        {
          label: '3 · Upload & approve',
          detail:
            'Images go to Cloudinary through Multer, are cropped in the browser before sending, and are written in a pending state. Sharp derives the derived sizes on a BullMQ worker. Nothing displays publicly until approved.',
        },
        {
          label: '4 · Discover',
          detail:
            'Customers search with server-side filters and browse the results on a map. Recommendation surfaces derive from listing attributes rather than a paid placement.',
        },
        {
          label: '5 · Enquire',
          detail:
            'Interest becomes a recorded conversation. Support tickets and the messenger both run over Socket.IO, so both sides see messages as they arrive and threads are stored rather than lost in an inbox.',
        },
        {
          label: '6 · Moderate & resolve',
          detail:
            'Administrators approve or reject listings, media and verifications, manage users and FAQs, and investigate reports. Support tickets carry a rating and a resolution trail.',
        },
      ],
      stack: [
        {
          label: 'Backend',
          items: [
            'Express on Node.js with routes grouped by audience: customer, admin, common',
            'Mongoose models for users, properties, tickets, FAQs and reports',
            'Dedicated validators layer, so route handlers stay thin',
            'JWT auth with bcrypt hashing and cookie parsing for session handling',
            'Upload middleware over Multer with Cloudinary storage',
          ],
        },
        {
          label: 'Async & realtime',
          items: [
            'BullMQ queues on Redis for image processing and email dispatch',
            'Sharp for server-side image derivatives',
            'Nodemailer for transactional email',
            'Socket.IO for support conversations and the customer messenger',
            'Redis-backed rate limiting, so limits hold across more than one instance',
          ],
        },
        {
          label: 'Web client',
          items: [
            'React 19 on Vite 7, organised by feature with a shared domain layer',
            'Redux Toolkit for state, React Router for route structure',
            'Tailwind CSS 4, React Hook Form for listing and auth forms',
            'Leaflet for interactive map search, react-image-crop for uploads',
            'Socket.IO client wired into the support and messenger features',
          ],
        },
        {
          label: 'Mobile',
          items: [
            'React Native companion app styled with NativeWind',
            'Redux Toolkit with React Navigation — native stack, bottom tabs and a drawer',
            'Socket.IO client for the same real-time support threads',
            'image-picker, reanimated, toast-message and NetInfo for offline awareness',
          ],
        },
      ],
      ai: null,
      agentic: null,
      errorHandling: [
        'Validation is centralised in a validators layer, so malformed listing and auth input is rejected before it reaches a model.',
        'Uploads are queued and derived asynchronously — a failed derivative does not fail the original upload.',
        'Support threads persist every message, so a dropped socket connection loses nothing but the live view.',
        'Role and verification checks run server-side, so a hidden button is never the only thing preventing an action.',
      ],
      security: [
        'JWT-based authentication with bcrypt password hashing.',
        'Role-based access control across customer, owner and admin, enforced at the route layer.',
        'Owner KYC verification gates publishing — an unverified owner cannot list.',
        'A media approval step stops unreviewed images reaching public listings.',
        'Cloudinary credentials, JWT secrets and mail credentials held in server-side environment variables.',
        'Redis-backed rate limiting on top of explicit CORS configuration.',
      ],
      testing: [
        'Vitest configured on the web client with Testing Library, covering the chat interface',
        'A test file exists for the React Native app',
        'No backend test suite — the API is verified manually against running services',
      ],
      tradeoffs: [
        {
          decision: 'Approval gates on listings, media and verification',
          rationale:
            'Moderation is what makes the listings worth reading, so it is part of the core flow rather than a reporting tool bolted on afterwards. The cost is friction for legitimate owners and real admin workload.',
        },
        {
          decision: 'MongoDB rather than a relational schema',
          rationale:
            'Listings vary a great deal by property type, and a document store absorbs that without a wide sparse table. The trade-off is that cross-entity integrity is enforced in application code rather than by the database.',
        },
        {
          decision: 'Socket.IO instead of polling for support',
          rationale:
            'Support is a conversation, and a conversation that updates only on refresh feels broken. Persistent connections cost server capacity, which is the right thing to spend here.',
        },
        {
          decision: 'BullMQ on Redis for image and email work',
          rationale:
            'Sharp processing and SMTP delivery are both slow and both fail sometimes. Queuing them keeps request latency predictable and makes retries possible, at the cost of running Redis.',
        },
      ],
      lessons: [
        'Approval state belongs on the record itself — pending versus approved media was far easier to reason about than a separate moderation table.',
        'Pushing image processing into a queue changed the feel of the upload flow more than any client-side optimisation did.',
        'Grouping routes by audience (customer, admin, common) made authorisation arguments visible in the file layout.',
        'The README drifted behind the code, which is a reminder that documentation nobody executes goes stale quietly.',
      ],
      results: [],
    },
  },
  {
    id: 'codeguard-ai',
    title: 'CodeGuard AI',
    tagline: 'Specialist review agents that read a pull request diff and report what a reviewer would miss.',
    summary:
      'An automated pull-request review platform that fetches a PR from GitHub, extracts its unified diff, runs specialist agents over it, de-duplicates their findings and presents an actionable severity-ranked review.',
    status: 'built',
    featured: false,
    isPlaceholder: false,
    stack: [
      'Python 3.11',
      'FastAPI',
      'React',
      'TypeScript',
      'Vite',
      'GitHub REST API',
      'Google Gemini',
      'NVIDIA NIM',
      'pytest',
      'Vitest',
      'Playwright',
      'GitHub Actions',
    ],
    repo: { label: 'Repository', href: 'https://github.com/ramyadav09/CodeGuard-AI' },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'placeholder',
      caption: 'Capture the findings list with severity filters applied.',
    },
    highlights: [
      'Four specialist agents instead of one general reviewer: bug detection, security review, code quality and test coverage.',
      'Findings are de-duplicated across agents before they reach the dashboard, so overlapping reports do not inflate the count.',
      'A ten-step review process parses diffs and orchestrates agent execution in a fixed, repeatable order.',
      'Provider abstraction across Google Gemini, NVIDIA NIM and a deterministic offline mock — the offline provider keeps CI and demos working with no API key.',
      'Dashboard filters by severity and category, with one-click copy for each suggested fix.',
      'Green CI on GitHub Actions: backend linting, the pytest suite, a frontend build, Vitest and Playwright end-to-end tests.',
    ],
    contribution:
      'Built the multi-agent review pipeline — GitHub diff ingestion, the specialist agents and their prompts, finding de-duplication — along with the React dashboard and the CI pipeline running the test suite end to end.',
    caseStudy: {
      disclaimer:
        'Hackathon build for the HowToAlgo × GDG on Campus KIIT event, Track B (Developer Productivity Tools). It runs locally from the repository; there is no hosted demo, and no measured outcome has been recorded.',
      problem:
        'A pull request can be hundreds of changed lines, and a human reviewer reads it once, tired, with limited context. The classes of defect that slip through are predictable — an unchecked null, a hardcoded secret, a new branch with no test — and each of them is easier to spot when you are only looking for that one thing.',
      intendedUsers:
        'Developers and reviewers on small teams with no dedicated review tooling. The reviewer is the user, so the output has to be ranked and skimmable rather than an exhaustive list of observations.',
      solution:
        'Specialist agents rather than a single general reviewer: one looking for runtime bugs, one for security issues, one for code smells and complexity, one for missing tests on newly changed branches. Each receives the extracted unified diff and reports structured findings. Because four agents over one diff will overlap, findings are de-duplicated before display. The result is presented against a PR health score with severity breakdown, filterable by category and severity, and each finding carries its file and line location, its rationale and a copyable suggested fix. Provider choice is configuration: Gemini or NVIDIA NIM for real analysis, or a deterministic mock provider that makes the entire pipeline — including CI and demos — runnable with no API key.',
      dataFlow: [
        {
          label: '1 · Ingest',
          detail:
            'A PR URL is submitted. The backend calls the GitHub REST API for metadata, the author, the changed file list and the unified diff patches.',
        },
        {
          label: '2 · Extract',
          detail:
            'Unified diff patches are parsed into per-file, per-hunk changed regions — the unit each agent reasons over. Whole files are not re-sent, which keeps prompts small.',
        },
        {
          label: '3 · Orchestrate',
          detail:
            'The ten-step review process runs the specialist agents over the extracted changes in a fixed order, so a rerun of the same PR produces a comparable review.',
        },
        {
          label: '4 · De-duplicate',
          detail:
            'Overlapping findings across agents are collapsed, so the same underlying issue reported by both the bug and quality agents counts once.',
        },
        {
          label: '5 · Rank',
          detail:
            'Findings are grouped by severity and category and rolled up into a PR health score, so the dashboard leads with what matters rather than the raw count.',
        },
        {
          label: '6 · Present',
          detail:
            'The reviewer filters by severity or category, opens a finding to see its file, line and rationale, and copies the suggested fix. Pipeline progress is shown while agents run.',
        },
      ],
      stack: [
        {
          label: 'Backend',
          items: [
            'FastAPI service exposing the review endpoints',
            'GitHub REST API client for PR metadata and diffs',
            'Unified-diff parser producing per-hunk change regions',
            'Agent orchestration with a fixed ten-step review process',
            'Findings de-duplication and severity ranking',
          ],
        },
        {
          label: 'Frontend',
          items: [
            'React + TypeScript on Vite',
            'Dark-mode review dashboard with live pipeline progress',
            'Filtering by severity and category',
            'Finding detail view with file/line location and one-click fix copy',
            'Playwright end-to-end coverage',
          ],
        },
        {
          label: 'AI',
          items: [
            'Four specialist agents: bugs, security, quality, test coverage',
            'Google Gemini and NVIDIA NIM as live providers',
            'Deterministic offline mock provider for CI and demos',
            'Provider abstraction so the pipeline is not coupled to a vendor SDK',
          ],
        },
        {
          label: 'Delivery',
          items: [
            'GitHub Actions running backend linting, pytest, frontend build, Vitest and Playwright',
            'Documented architecture and PRD under docs/',
            'Agent behaviour codified in AGENTS.md and AGENTS_AND_SKILLS.md',
          ],
        },
      ],
      ai: {
        summary:
          'The interesting part is not that an LLM reads a diff — it is that four narrow agents with different briefs each look for one class of problem, and their overlap is reconciled before a human sees anything. Narrow scope per agent is what makes the findings specific enough to act on.',
        model: 'Google Gemini or NVIDIA NIM for live analysis, with a deterministic offline mock provider so the full pipeline runs without credentials.',
        pipeline: [
          {
            label: '01',
            detail:
              'Diff extraction — changed hunks are isolated so each agent sees only what actually changed, plus enough surrounding context to judge it.',
          },
          {
            label: '02',
            detail:
              'Bug detection agent — runtime exceptions, off-by-one errors, null dereferences and logic flaws in the changed regions.',
          },
          {
            label: '03',
            detail:
              'Security review agent — OWASP-class issues, hardcoded secrets, injection vectors and unsafe input handling.',
          },
          {
            label: '04',
            detail:
              'Code quality agent — code smells, duplication, cognitive complexity and weak abstractions.',
          },
          {
            label: '05',
            detail:
              'Test analysis agent — new or modified branches that have no covering test, with a runnable test snippet suggested.',
          },
          {
            label: '06',
            detail:
              'Reconcile — findings are de-duplicated across agents, ranked by severity, and rolled into the PR health score before display.',
          },
        ],
      },
      agentic: {
        summary:
          'Four agents with distinct briefs run over the same extracted diff, orchestrated by a fixed ten-step process rather than an open-ended loop. The design choice is deliberate: a bounded, repeatable pipeline is easier to trust than an autonomous agent deciding its own next step.',
        tools: [
          { name: 'GitHub PR reader', purpose: 'Fetches PR metadata, author, changed file list and unified diff patches.' },
          { name: 'Diff parser', purpose: 'Turns raw patches into per-file, per-hunk change regions the agents reason over.' },
          { name: 'Bug detection agent', purpose: 'Reports runtime exceptions, off-by-one errors, null dereferences and logic flaws.' },
          { name: 'Security review agent', purpose: 'Reports OWASP-class vulnerabilities, hardcoded secrets and injection vectors.' },
          { name: 'Code quality agent', purpose: 'Reports smells, duplication, cognitive complexity and weak abstractions.' },
          { name: 'Test analysis agent', purpose: 'Flags changed branches without coverage and proposes a runnable test.' },
          { name: 'Finding store', purpose: 'Holds structured findings so they can be de-duplicated and ranked before display.' },
        ],
        stateManagement:
          'Review state is held per run: the extracted diff regions, each agent\'s structured findings, and the reconciled result set. The ten-step process advances through fixed stages, so a review is reproducible for the same commit rather than depending on how an agent chose to proceed.',
        executionFlow: [
          'Parse the submitted PR URL and fetch metadata and diff patches from the GitHub API.',
          'Extract per-file, per-hunk changed regions as the shared working set.',
          'Run the bug detection agent over the changed regions.',
          'Run the security review agent over the same regions.',
          'Run the code quality agent.',
          'Run the test analysis agent.',
          'Collect structured findings from all four agents into the per-run store.',
          'De-duplicate overlapping findings across agents.',
          'Rank by severity, group by category, and compute the PR health score.',
          'Render the review dashboard with filters, locations and suggested fixes.',
        ],
        permissions: [
          'Read-only against GitHub: the platform fetches PR data and never pushes commits, comments or labels.',
          'AI provider keys are held server-side in environment variables and never sent to the browser.',
          'The offline mock provider means the pipeline can be exercised with no external credentials at all.',
        ],
        humanApproval: [
          'The agents produce findings; nothing is applied to the repository automatically.',
          'Every suggested fix is presented for a developer to read and copy — the human is the one who edits the code.',
          'Findings are advisory input to a review, never an automatic gate that blocks a merge on its own.',
        ],
      },
      errorHandling: [
        'A failed or rate-limited GitHub fetch surfaces as a specific error rather than an empty review.',
        'The offline mock provider keeps the pipeline testable and demoable when no AI provider is reachable.',
        'De-duplication prevents one root cause being reported four times by four agents.',
        'Agent output is treated as structured data that must validate before it reaches the findings store.',
      ],
      security: [
        'GitHub access is read-only — no write scopes are requested.',
        'The GitHub token and AI API keys live only in server-side environment variables, with .env ignored by git.',
        'The submitted PR URL is parsed and validated rather than used to build an arbitrary outbound request.',
        'Diff content is treated as untrusted input: it is delimited in prompts and never executed.',
      ],
      testing: [
        'pytest suite for the backend, including coverage reporting',
        'Frontend build and lint verification as a merge gate',
        'Playwright end-to-end tests over the review flow',
        'GitHub Actions runs the full set on every push',
      ],
      tradeoffs: [
        {
          decision: 'Four narrow agents instead of one broad reviewer',
          rationale:
            'A single prompt asked to find everything returns generic advice. Splitting by concern produces findings specific enough to act on, at the cost of a reconciliation step.',
        },
        {
          decision: 'A fixed ten-step process instead of an autonomous loop',
          rationale:
            'Bounded and repeatable beats clever here. Reviewing the same commit twice gives a comparable result, which is what makes the output trustworthy.',
        },
        {
          decision: 'De-duplicate findings before display',
          rationale:
            'Four agents over one diff will agree with each other. Showing the overlap would inflate the issue count and train the reviewer to ignore the list.',
        },
        {
          decision: 'Ship a deterministic mock provider',
          rationale:
            'It keeps CI and the demo working with no API key or spend, and it forces the pipeline to be decoupled from any one vendor\'s response shape.',
        },
      ],
      lessons: [
        'Narrow agent scope produced far more actionable output than a single general-purpose review prompt.',
        'De-duplication is not a nicety — without it, multi-agent output reads as noise and the reviewer stops trusting it.',
        'A deterministic offline provider made the system genuinely testable, because the pipeline could be exercised without a network call.',
        'A fixed orchestration order is what turns four independent agents into a review you can reproduce.',
      ],
      results: [],
    },
  },
  {
    id: 'ai-resume-generator',
    title: 'AI Resume Generator',
    tagline: 'A resume builder where the AI provider is configuration, not a hard dependency.',
    summary:
      'A full-stack resume platform that parses an existing resume or GitHub profile, generates and rewords content through a pluggable AI provider, and renders versioned documents — with the provider chosen from the database at call time.',
    status: 'built',
    featured: false,
    isPlaceholder: false,
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'React Router',
      'TanStack Query',
      'React Hook Form + Zod',
      'Tailwind CSS',
      'Python',
      'FastAPI',
      'Pydantic v2',
      'SQLAlchemy 2 (async)',
      'Alembic',
      'PostgreSQL',
      'PyJWT',
      'bcrypt',
      'Cloudinary',
      'pytest',
      'Vitest',
      'Playwright',
    ],
    repo: { label: 'Repository', href: 'https://github.com/ramyadav09/AI-Resume-Generator' },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'placeholder',
      caption: 'Capture the builder with the live document preview alongside it.',
    },
    highlights: [
      'A five-layer backend with strict downward dependencies: transport → services → domain/AI → ports → adapters.',
      'The active AI provider is a database row read at call time, not a hardcoded branch — NVIDIA, OpenAI and Gemini sit behind one interface.',
      'A test fails the build if any local file write appears in application code, forcing all uploads through the storage adapter.',
      'A hallucination-guard test suite covers the AI output path rather than trusting the prompt.',
      'Resume parsing from PDF and DOCX with OCR, plus importing and formatting a GitHub profile or repository.',
      'Versioned resumes with templates and render endpoints, so a generated document is reproducible.',
      'Eighteen test modules spanning unit and integration, and fourteen design documents from SRS through traceability matrix.',
    ],
    contribution:
      'Full-stack build: the layered FastAPI backend (services, repositories, schemas, Alembic migrations), the AI provider interface with its factory and structured-output validation, the resume parsing and rendering pipeline, and the React builder, preview and admin surfaces.',
    caseStudy: {
      disclaimer:
        'Runs locally from the repository against PostgreSQL; there is no hosted demo, and no measured outcome has been recorded. The repository\'s own documentation covers the design in depth under docs/.',
      problem:
        'Resume tooling tends to lock you into one model vendor and one visual template, and the generated text is often confidently wrong about details you never supplied. Meanwhile the input is awkward: the resume you already have is a PDF, and your real work history is scattered across GitHub.',
      intendedUsers:
        'Job seekers who already have a resume and want to restructure it for a specific role without retyping it, plus anyone who wants a consistent document generated from a structured profile rather than reformatted by hand each time.',
      solution:
        'Upload an existing resume — it is parsed into structured sections, with OCR for scanned documents. You can also import a GitHub profile or repository and have it formatted into entries. Content generation runs through an AI provider interface with several implementations behind it, and the active one is selected from a configuration table at call time, so switching vendors is a data change rather than a code change. Generated output is validated against a structured schema before use, and a hallucination-guard test suite covers that path. Resumes are versioned against templates and rendered through dedicated exporters, so the same version always produces the same document. Storage goes through an adapter, and a test enforces that nothing in application code writes files locally.',
      dataFlow: [
        {
          label: '1 · Import',
          detail:
            'An existing resume is uploaded as PDF or DOCX, or a GitHub profile or repository URL is submitted. Uploads are validated and routed through the storage adapter, never written to local disk by app code.',
        },
        {
          label: '2 · Parse & extract',
          detail:
            'PDF and DOCX files are parsed into text with page offsets, falling back to OCR for scanned documents. The text is then extracted into structured sections — experience, education, skills, projects.',
        },
        {
          label: '3 · Resolve provider',
          detail:
            'The AI provider factory reads the active configuration row at call time and returns the matching provider. No layer above the factory knows which vendor is in play.',
        },
        {
          label: '4 · Generate',
          detail:
            'AIService calls the provider through a shared interface, handling retries, timeouts, structured-output validation and usage logging in one place rather than in each caller.',
        },
        {
          label: '5 · Build',
          detail:
            'The resume builder applies the selected template to the structured profile, with exporters producing the final document for each supported output format.',
        },
        {
          label: '6 · Version & render',
          detail:
            'Versions and templates are persisted, so a rendered document can be traced back to the exact profile state and template that produced it.',
        },
      ],
      stack: [
        {
          label: 'Backend',
          items: [
            'FastAPI with routers kept to HTTP concerns only',
            'Five layers: transport → services → domain/AI → ports → adapters',
            'Pydantic v2 schemas; pydantic-settings for configuration',
            'SQLAlchemy 2 async with Alembic migrations',
            'PyJWT and bcrypt for auth',
            'Rate limiting on the AI endpoints',
          ],
        },
        {
          label: 'Frontend',
          items: [
            'React 18 + TypeScript on Vite',
            'TanStack Query for server state, React Router for navigation',
            'React Hook Form with Zod resolvers, mirroring the API schemas',
            'Tailwind CSS, including the builder and live document preview',
            'Vitest + Testing Library, and Playwright for end-to-end flows',
          ],
        },
        {
          label: 'Data & storage',
          items: [
            'PostgreSQL as the primary store, SQLite for the test suite',
            'Versioned resumes and reusable templates',
            'Cloudinary storage adapter for uploaded and generated files',
            'A test fails the build on any local file write in app code',
          ],
        },
        {
          label: 'AI',
          items: [
            'AIProvider interface with a factory resolving the active provider',
            'NVIDIA, OpenAI and Gemini implementations behind one protocol',
            'Provider selection stored in the database and read per call',
            'Structured-output validation, retries, timeouts and usage logging',
            'Contract tests run the same cases against every implementation',
          ],
        },
      ],
      ai: {
        summary:
          'The architecture treats the provider as a seam. Everything above it depends on an interface, the factory is the only place that knows about vendors, and a contract test runs identical cases against each implementation — so adding or swapping a model is a contained change rather than a refactor.',
        model: 'Provider-neutral by design: NVIDIA (via an OpenAI-compatible interface), OpenAI and Google Gemini, with the active provider resolved from a database configuration row at call time.',
        pipeline: [
          {
            label: '01',
            detail:
              'Extraction — supply a PDF, DOCX or GitHub profile and the AI path returns structured resume data rather than free text.',
          },
          {
            label: '02',
            detail:
              'Formatting — an existing resume or repository is normalised into the platform\'s own section model, so downstream rendering is consistent regardless of input shape.',
          },
          {
            label: '03',
            detail:
              'Generation — content for a section is produced through the provider interface, with the prompt owning structure and the service owning validation.',
          },
          {
            label: '04',
            detail:
              'Highlighting — the model selects and rewords the material most relevant to a target role, without introducing claims that are not in the source profile.',
          },
          {
            label: '05',
            detail:
              'Guard — output is validated against a structured schema, and a dedicated hallucination-guard test suite covers this stage so unsupported content fails rather than shipping.',
          },
          {
            label: '06',
            detail:
              'Render — validated content is written into the chosen template and exported, producing a versioned document traceable to its inputs.',
          },
        ],
      },
      agentic: null,
      errorHandling: [
        'Provider failures are handled centrally in AIService with retries and timeouts, so no caller reimplements them.',
        'Structured-output validation rejects malformed AI responses before they reach the builder.',
        'OCR is an explicit fallback path for scanned uploads rather than a silent failure.',
        'Unsupported or corrupt uploads are rejected with a specific reason instead of a generic error.',
        'Rate limiting on AI endpoints keeps a runaway client from burning provider quota.',
      ],
      security: [
        'JWT-based auth with bcrypt password hashing.',
        'Provider API keys are read from server-side environment variables only, and never returned to the client.',
        'A test fails the build if application code writes files locally, closing an accidental-disclosure path.',
        'Uploads are validated and stored through a dedicated adapter rather than by path handling in request code.',
        'A dedicated security and configuration test module covers these invariants.',
      ],
      testing: [
        'Eighteen test modules split between unit and integration, run with pytest',
        'Integration coverage for auth, profile, template/version, render, admin and verification endpoints',
        'Unit coverage for the AI pipeline, resume parser, exporters, rate limiting, taxonomy and security config',
        'A hallucination-guard suite and a no-local-storage suite, both enforcing architectural rules as tests',
        'Vitest component tests and Playwright end-to-end smoke coverage on the frontend',
      ],
      tradeoffs: [
        {
          decision: 'Provider choice stored in the database, read per call',
          rationale:
            'Switching models becomes an admin action with no deploy. The cost is one cached lookup per AI call and a factory that every provider change must go through.',
        },
        {
          decision: 'Five explicit layers with no downward skips',
          rationale:
            'Keeps routers free of SQL and domain logic, and makes the AI seam testable in isolation. It is more ceremony than a small app needs, but it is what keeps the provider abstraction honest.',
        },
        {
          decision: 'Enforce architecture with tests, not convention',
          rationale:
            'The no-local-storage and contract tests fail the build when a rule is broken. Conventions drift; a failing test does not.',
        },
        {
          decision: 'Versioned resumes instead of overwriting',
          rationale:
            'A rendered document can be traced to the profile state and template that produced it, at the cost of extra storage and a version-aware UI.',
        },
      ],
      lessons: [
        'Defining the provider interface first made every later vendor addition mechanical rather than invasive.',
        'Validating AI output against a schema is what makes generated content safe to persist — free-text responses were not usable downstream.',
        'Enforcing an architectural rule as a test (no local file writes) caught regressions that review would have missed.',
        'Keeping routers to HTTP concerns paid off most when the AI layer changed, because the blast radius stayed inside the service.',
      ],
      results: [],
    },
  },
  {
    id: 'email-summarizer',
    title: 'Email Summarizer',
    tagline: 'Connect Gmail, summarise the inbox, draft replies — through an OAuth flow that never exposes a password.',
    summary:
      'A full-stack app that authenticates with Google, reads Gmail messages, summarises them with Mistral via LangChain, drafts a reply and sends it back within the same thread.',
    status: 'built',
    featured: false,
    isPlaceholder: false,
    stack: [
      'Python 3.10',
      'FastAPI',
      'LangChain',
      'Mistral AI',
      'SQLAlchemy',
      'Google OAuth 2.0',
      'Gmail API',
      'React',
      'Redux Toolkit',
      'Vite',
    ],
    repo: { label: 'Repository', href: 'https://github.com/ramyadav09/Email-Summarizer' },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'image',
      src: '/assets/emailsummarizer.png',
      alt: 'Email Summarizer inbox with summarised email and drafted reply',
      width: 800,
      height: 500,
    },
    highlights: [
      'Google OAuth 2.0 rather than password handling — the app never sees Gmail credentials.',
      'Filters for date range and read/unread state, with server-side filtering rather than fetching everything.',
      'Summaries are cached in the database, so reopening an email does not re-run the model or re-bill the call.',
      'Reply generation and sending happen in the same thread, so the draft is not copied elsewhere to send it.',
      'Token persisted across reloads, with Redux Toolkit holding client state.',
    ],
    contribution:
      'Built the FastAPI backend (Gmail integration, OAuth flow, SQLAlchemy persistence and the LangChain summarisation and reply-generation services) and the React/Redux frontend covering login and the inbox.',
    caseStudy: {
      disclaimer:
        'Runs locally from the repository and requires your own Google Cloud OAuth credentials and a Mistral API key. Nothing is hosted, and no measured result has been recorded.',
      problem:
        'An inbox is read in fragments, and the cost of opening a message is not reading it but deciding whether it needs a reply. Summaries help, but only if the summary is cheap to produce on repeat visits and the reply can be sent without leaving the flow.',
      intendedUsers:
        'Anyone triaging a inbox where most messages need a short, functional response — the summaries are decision aids, and the drafted reply is a starting point rather than a finished message.',
      solution:
        'Sign in with Google, and the backend reads Gmail over the Gmail API using OAuth tokens — no password is ever handled. Messages are filtered by date range and read state, then summarised through Mistral via LangChain. Summaries are cached in the database against the message, so a second visit is a database read rather than another model call. A reply can be drafted from the message and sent within the same thread. The frontend keeps the session and inbox state in Redux Toolkit, with the token persisted so a reload does not force re-authentication.',
      dataFlow: [
        {
          label: '1 · Authenticate',
          detail:
            'The user connects Gmail and is redirected into Google\'s OAuth consent flow. The backend receives the callback, exchanges the code for a token and returns it to the frontend without ever seeing a password.',
        },
        {
          label: '2 · Fetch',
          detail:
            'Messages are requested from the Gmail API with date-range and read/unread filters applied, so the client is not pulling an entire mailbox.',
        },
        {
          label: '3 · Summarise',
          detail:
            'A message is sent through the LangChain chain to Mistral. The result is stored in the database against the message id.',
        },
        {
          label: '4 · Cache',
          detail:
            'A repeat request for the same message is served from SQLAlchemy-backed storage, which keeps latency and provider spend down.',
        },
        {
          label: '5 · Draft',
          detail:
            'Reply generation uses the message content to produce a draft the user can edit before it is sent.',
        },
        {
          label: '6 · Send',
          detail:
            'The reply is sent through the Gmail API inside the original thread, so the conversation stays intact.',
        },
      ],
      stack: [
        {
          label: 'Backend',
          items: [
            'FastAPI with separate routers for auth and email operations',
            'pydantic-settings for configuration and environment handling',
            'SQLAlchemy models persisting messages and cached summaries',
            'Dedicated services for Gmail access, database operations and AI generation',
            'Structured logging for the request path',
          ],
        },
        {
          label: 'Frontend',
          items: [
            'React with Vite',
            'Redux Toolkit for session and inbox state',
            'A login page driving the OAuth flow, and an inbox view',
            'A reusable email card with its summary and reply controls',
          ],
        },
        {
          label: 'AI',
          items: [
            'LangChain orchestrating the summarise and reply-generation prompts',
            'Mistral AI as the generation model',
            'Database caching so a summary is computed once per message',
          ],
        },
      ],
      ai: {
        summary:
          'Two focused generation tasks — summarise a message, draft a reply — rather than a general assistant over the mailbox. Caching the summary against the message id is what makes the feature practical, because an inbox is revisited constantly.',
        model: 'Mistral AI, invoked through LangChain so the summarisation and reply prompts stay separate from the model choice.',
        pipeline: [
          {
            label: '01',
            detail: 'Fetch — the message body is retrieved from the Gmail API for the authenticated account.',
          },
          {
            label: '02',
            detail: 'Check cache — the database is queried for an existing summary against the message id before any model call.',
          },
          {
            label: '03',
            detail: 'Summarise — on a miss, the message is passed through the LangChain chain to Mistral.',
          },
          {
            label: '04',
            detail: 'Persist — the summary is written to the database so the next visit is a read.',
          },
          {
            label: '05',
            detail: 'Draft — reply generation produces an editable response grounded in the original message.',
          },
        ],
      },
      agentic: null,
      errorHandling: [
        'Configuration is validated up front, so missing OAuth or API credentials fail with a clear message rather than at first request.',
        'The OAuth callback path handles the returned token explicitly instead of assuming success.',
        'Cached summaries mean a provider outage degrades previously-read messages to a readable state rather than an error.',
      ],
      security: [
        'Google OAuth 2.0 handles authentication — the application never receives or stores a Gmail password.',
        'The Gmail client secret, OAuth token and Mistral API key are all read from the environment and are gitignored.',
        'The README calls out that .env, client_secret.json and token.json must never be committed, and that credentials should be rotated immediately if exposed.',
        'Email content is treated as untrusted input when it is assembled into a prompt.',
      ],
      testing: [
        'Not covered by an automated suite at the time of writing — the repository documents setup and the API surface instead.',
      ],
      tradeoffs: [
        {
          decision: 'OAuth over handling credentials directly',
          rationale:
            'The app never sees a Google password, and the consent screen makes the scope of access explicit. The cost is a multi-step flow and external setup that a first-time user must complete.',
        },
        {
          decision: 'Cache summaries in the database',
          rationale:
            'An inbox is revisited constantly, so recomputing a summary on every view would be slow and wasteful. The trade-off is staleness if the message changes, which is rare for email.',
        },
        {
          decision: 'Two narrow AI tasks instead of a general mailbox assistant',
          rationale:
            'Summarise and draft are well-defined and easy to judge. A general assistant would have widened the prompt surface without making either task better.',
        },
        {
          decision: 'Token held in localStorage for persistence',
          rationale:
            'It keeps the user signed in across reloads with no refresh-token infrastructure. It is the weakest part of the design — httpOnly cookies would be the correct fix in a production deployment.',
        },
      ],
      lessons: [
        'Third-party OAuth is mostly configuration and callback handling — budget for that rather than for the AI part.',
        'Caching model output against its source record is a small change that turns an expensive feature into a responsive one.',
        'Separating Gmail access, persistence and generation into distinct services kept the prompt logic from leaking into request handling.',
      ],
      results: [],
    },
  },
]

/** The lead card. Exactly one project should be featured. */
export const featuredProject = projects.find((project) => project.featured) ?? projects[0]
