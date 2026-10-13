import type { Project } from './types'

/**
 * ---------------------------------------------------------------------------
 * PROJECTS — replace every entry below with your own work.
 * ---------------------------------------------------------------------------
 * These are *concept briefs*, not completed projects. Each one carries an
 * `isPlaceholder: true` flag (which keeps the site-wide notice visible) and a
 * `caseStudy.disclaimer` rendered at the top of its case study, so nothing here
 * can be mistaken for shipped software or a measured result.
 *
 * Rules this file follows, and that you should keep:
 *  - `repo.href` / `demo.href` stay `null` until a real URL exists. A null href
 *    renders as a disabled "pending" chip, never a dead link.
 *  - `caseStudy.results` stays empty until an outcome has actually been measured.
 *  - Once a project is real, flip `isPlaceholder` to false, move the wording to
 *    the past tense, and describe what you actually built.
 */
export const projects: Project[] = [
  {
    id: 'ai-research-workspace',
    title: 'AI Research Workspace',
    tagline: 'Document-grounded answers with citations back to the source passage.',
    summary:
      'A workspace for asking questions across a personal library of PDFs and notes, where every answer is traceable to the exact passage it came from.',
    status: 'concept',
    featured: true,
    isPlaceholder: true,
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'pgvector', 'Python'],
    repo: { label: 'Repository', href: null },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'placeholder',
      caption: 'Screenshot pending — replace with a 1600×900 capture of the workspace.',
    },
    highlights: [
      'Hybrid retrieval: keyword search and vector similarity fused, then reranked before prompting.',
      'Streamed answers where each claim carries a citation marker that resolves to a stored chunk.',
      'Ingestion pipeline that chunks, embeds and de-duplicates documents idempotently.',
      'An evaluation set of question/answer pairs so retrieval changes can be measured, not guessed.',
    ],
    contribution:
      'Planned as a solo build covering the whole path: data model, ingestion pipeline, retrieval and reranking, streaming API, and the reading interface.',
    caseStudy: {
      disclaimer:
        'Concept brief — this project has not been built yet. Everything below is the planned design, kept deliberately specific so it is clear what the build would involve. Replace it with what actually shipped.',
      problem:
        'Notes, papers and PDFs accumulate far faster than anyone can re-read them. General-purpose chat assistants will answer confidently about a document they were handed, but they cannot show which passage an answer came from — which makes them useless for anything that needs checking before it is trusted.',
      intendedUsers:
        'Researchers, students and engineers who keep a growing corpus of PDFs and need answers they can verify. They care more about a correct, cited answer in five seconds than a fluent paragraph that might be wrong.',
      solution:
        'A workspace where documents are ingested once into a searchable index, and questions are answered only from retrieved passages. Retrieval runs two independent strategies — full-text keyword search and vector similarity — because each fails in a different way: keyword search misses paraphrase, vectors miss exact identifiers like error codes or citation keys. Results are fused, reranked, and only then assembled into a prompt as numbered sources, so the model can cite by number and the UI can resolve that number back to a stored chunk.',
      dataFlow: [
        {
          label: '1 · Ingest',
          detail:
            'A worker extracts text per page from uploaded PDFs, records the page offset, and writes both the document and its chunks in one transaction so a failed parse never leaves an orphaned half-document.',
        },
        {
          label: '2 · Chunk & embed',
          detail:
            'Text is split on heading and paragraph boundaries with a target token window and a small overlap. Each chunk is embedded and stored next to its raw text, so re-embedding under a new model is a migration rather than a rebuild.',
        },
        {
          label: '3 · Retrieve',
          detail:
            'A query runs a lexical search and a vector search in parallel. Both return ranked lists that are fused by rank rather than by raw score, because cosine distance and text rank are not comparable numbers.',
        },
        {
          label: '4 · Rerank & assemble',
          detail:
            'The fused shortlist is reranked for relevance to the actual question, then trimmed to a token budget and injected into the prompt as numbered sources with document and page metadata.',
        },
        {
          label: '5 · Answer & cite',
          detail:
            'The answer streams token by token. Citation markers are resolved against the sources actually sent, so an answer can never cite a chunk the model was not given.',
        },
      ],
      stack: [
        {
          label: 'Frontend',
          items: [
            'React and TypeScript with a streaming reader view',
            'Optimistic upload states with real per-document progress',
            'Virtualised document list to keep rendering flat as the library grows',
          ],
        },
        {
          label: 'Backend',
          items: [
            'FastAPI service exposing upload, query and citation-resolution endpoints',
            'Background worker for parsing and embedding, decoupled from the request path',
            'Typed request/response models so the frontend contract is generated, not hand-copied',
          ],
        },
        {
          label: 'Data',
          items: [
            'PostgreSQL as the single source of truth for documents, chunks and citations',
            'pgvector for embeddings, keeping vectors transactional with their source rows',
            'Full-text search indexes alongside the vector index for the lexical half of retrieval',
          ],
        },
      ],
      ai: {
        summary:
          'Retrieval is the product; generation is the last mile. The design keeps the model on a short leash by controlling exactly which passages reach it, and by making citations a lookup rather than a claim.',
        model:
          'A hosted chat model for answer generation plus a separate embedding model for vectors, so either can be swapped independently when price or quality changes.',
        pipeline: [
          {
            label: 'Query rewriting',
            detail:
              'Follow-up questions are rewritten into standalone queries using the last few turns, so "and the second one?" still retrieves the right passages.',
          },
          {
            label: 'Parallel retrieval',
            detail:
              'Lexical and vector searches run concurrently over the same corpus and return independent ranked lists.',
          },
          {
            label: 'Rank fusion',
            detail:
              'Lists are combined by reciprocal rank, avoiding any attempt to compare incomparable scores across the two strategies.',
          },
          {
            label: 'Reranking',
            detail:
              'A reranker scores the shortlist against the original question, which is what actually removes the near-miss passages.',
          },
          {
            label: 'Grounded prompt assembly',
            detail:
              'Only the surviving chunks are numbered and inserted, with an explicit instruction to cite by number and to say "not in the sources" when retrieval came back empty.',
          },
          {
            label: 'Evaluation',
            detail:
              'A fixed set of questions with known-good passages measures retrieval hit rate separately from answer quality, so a prompt tweak cannot hide a retrieval regression.',
          },
        ],
      },
      agentic: null,
      errorHandling: [
        'Parsing failures are isolated per document and surfaced with the page number that failed, instead of failing an entire batch.',
        'Embedding is idempotent per chunk, so a retried job re-uses what already succeeded.',
        'If retrieval returns nothing above a floor, the UI says so plainly rather than letting the model improvise an answer.',
        'Streaming responses are cancellable; the server stops generating when the client disconnects.',
      ],
      security: [
        'Uploads are validated by content sniffing and size, not by file extension alone.',
        'Documents are scoped to their owner, and every chunk query filters by that owner at the database level.',
        'Extracted text is treated as untrusted input: it is delimited in the prompt and never executed as instructions.',
        'The model provider key lives only in server-side environment variables.',
      ],
      testing: [
        'Unit tests for chunk boundaries, including the awkward cases of a single enormous paragraph and a document of many tiny ones.',
        'Integration tests over a small fixture corpus that assert retrieval returns a known passage for a known question.',
        'A regression run that fails the build when retrieval hit rate drops below its recorded baseline.',
      ],
      tradeoffs: [
        {
          decision: 'PostgreSQL with pgvector instead of a dedicated vector database',
          rationale:
            'Keeping vectors in the same transaction as their source rows removes an entire class of consistency bug. A separate vector store becomes worth it only when the corpus outgrows a single Postgres instance.',
        },
        {
          decision: 'Rank fusion instead of score normalisation',
          rationale:
            'Normalising incomparable scores across two retrievers produced unstable rankings. Fusing by rank is less clever and measurably more predictable.',
        },
        {
          decision: 'Background worker instead of embedding inline on upload',
          rationale:
            'Uploads stay fast and failures become retryable, at the cost of a job queue and eventual consistency in what is searchable.',
        },
      ],
      lessons: [
        'Retrieval quality dominates everything downstream. A better prompt cannot rescue the wrong passages.',
        'Citations have to be structurally enforced, not politely requested in a prompt.',
        'An evaluation set was needed before any optimisation, otherwise every change is a guess with extra steps.',
      ],
      results: [],
    },
  },

  {
    id: 'agentic-task-assistant',
    title: 'Agentic Task Assistant',
    tagline: 'A tool-using agent with explicit state and human checkpoints.',
    summary:
      'An assistant that decomposes a goal into steps, calls typed tools with scoped permissions, and stops for approval before anything irreversible happens.',
    status: 'concept',
    featured: false,
    isPlaceholder: true,
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Zod'],
    repo: { label: 'Repository', href: null },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'placeholder',
      caption: 'Screenshot pending — replace with a capture of the run timeline and approval step.',
    },
    highlights: [
      'A visible run timeline: every step, tool call and result is recorded and inspectable.',
      'Typed tools with JSON-schema validation on arguments before anything executes.',
      'Two classes of tool — read-only, and mutating behind an explicit approval gate.',
      'Resumable runs that survive a restart because state lives in the database, not in a prompt.',
    ],
    contribution:
      'Planned as a solo build: tool registry and validation layer, run state machine, approval flow, and the timeline interface.',
    caseStudy: {
      disclaimer:
        'Concept brief — this project has not been built yet. The orchestration design below is a plan, not a description of working software.',
      problem:
        'Most "AI agent" demos are a chat box wired to a function call. They break the moment a task needs more than one step, because nothing tracks what has already happened, nothing bounds what a tool is allowed to touch, and nothing stops the model from taking an irreversible action on the user\'s behalf.',
      intendedUsers:
        'Developers and operators who want an assistant to do multi-step work against internal systems, and who will only accept that if every action is auditable and reversible.',
      solution:
        'A run is treated as durable state rather than a conversation. The agent proposes the next step; a controller validates it against a typed tool registry, checks whether the tool is read-only or mutating, and either executes it or pauses the run for human approval. Every step is appended to an append-only log that the interface replays as a timeline.',
      dataFlow: [
        {
          label: '1 · Goal intake',
          detail:
            'The user states a goal. It is stored as a run record with declared scope, so later steps can be checked against what was actually asked for.',
        },
        {
          label: '2 · Plan',
          detail:
            'The model proposes an ordered plan. The controller validates that every referenced tool exists and that the plan stays inside the declared scope; an out-of-scope plan is rejected before any step runs.',
        },
        {
          label: '3 · Step execution',
          detail:
            'Each step\'s arguments are validated against the tool\'s schema. Read-only tools execute immediately; mutating tools create a pending approval instead.',
        },
        {
          label: '4 · Observe & continue',
          detail:
            'Tool results are appended to the log and fed back to the model, which either continues, revises the plan, or stops and reports the blocker.',
        },
        {
          label: '5 · Summarise',
          detail:
            'The run closes with a summary that links each claim to the step that produced it, so the outcome can be audited without reading the whole log.',
        },
      ],
      stack: [
        {
          label: 'Frontend',
          items: [
            'React timeline that replays a run step by step, including failures',
            'Approval panel showing the exact arguments a mutating tool would receive',
            'Live run status driven by server-sent events, not polling',
          ],
        },
        {
          label: 'Backend',
          items: [
            'Node.js and Express API with a run controller as the single execution path',
            'Typed tool registry where each tool declares its schema and whether it mutates state',
            'Append-only step log as the source of truth for run history',
          ],
        },
        {
          label: 'Data',
          items: [
            'PostgreSQL for runs, steps and approvals, with the log written transactionally per step',
            'A status column driving both resume-after-restart and the UI timeline',
            'Idempotency keys on mutating tools so a retried step cannot double-apply',
          ],
        },
      ],
      ai: {
        summary:
          'The model decides *what* to do next and never decides *whether it is allowed*. Authority sits in the controller, which is ordinary deterministic code.',
        model:
          'A hosted chat model with tool-calling support, used only for planning and argument proposal. Swappable, because no tool depends on a specific provider.',
        pipeline: [
          {
            label: 'Planner call',
            detail:
              'Given the goal, current run state and the tool catalogue, the model returns a proposed plan or the next single step.',
          },
          {
            label: 'Schema validation',
            detail:
              'Proposed arguments are parsed with Zod against the tool schema. Invalid arguments are returned to the model as a correctable error rather than executed.',
          },
          {
            label: 'Policy check',
            detail:
              'The controller classifies the step as read-only or mutating and enforces the approval requirement before any side effect.',
          },
          {
            label: 'Repair loop',
            detail:
              'A step may be retried a bounded number of times after validation or tool errors, and the loop terminates rather than retrying forever.',
          },
        ],
      },
      agentic: {
        summary:
          'The agentic behaviour comes from durable state, a bounded tool surface and enforced approval points — not from the model being asked to behave.',
        tools: [
          { name: 'search_records', purpose: 'Read-only lookup across the user\'s records.' },
          { name: 'read_document', purpose: 'Read a single document by id, scoped to the run owner.' },
          { name: 'draft_message', purpose: 'Compose a message without sending it.' },
          { name: 'send_message', purpose: 'Mutating: sends a drafted message. Requires approval.' },
          { name: 'update_record', purpose: 'Mutating: writes a field change. Requires approval.' },
          { name: 'request_clarification', purpose: 'Pauses the run and asks the user a question.' },
        ],
        stateManagement:
          'Run state — goal, plan, completed steps, pending approval, and the accumulated observations — lives in PostgreSQL. The model\'s context is reconstructed from that log at each step, so a restart resumes a run exactly where it stopped instead of losing it in a stateless prompt.',
        executionFlow: [
          'Load the run and its step log from the database.',
          'Rebuild model context: goal, scope, completed steps and their results.',
          'Ask the model for the next step or a revised plan.',
          'Validate tool existence, scope and arguments.',
          'If mutating: persist a pending approval and pause.',
          'If read-only: execute with a timeout, then append the result to the log.',
          'Repeat until the goal is met, the model stops, or a step budget is exhausted.',
        ],
        permissions: [
          'Every tool is declared read-only or mutating at registration; there is no default.',
          'Tools run with the requesting user\'s credentials, never with broad service authority.',
          'Scope is recorded at intake and re-checked at every step, so a plan cannot quietly widen it.',
          'Write access is denied by default and granted only through the approval gate.',
        ],
        humanApproval: [
          'Any mutating tool call pauses the run and presents the exact arguments before execution.',
          'Approvals are explicit, per call, and expire — a stale approval can never be replayed later.',
          'Low-confidence or out-of-scope plans are surfaced to the user rather than auto-corrected.',
          'An approved run can be stopped mid-flight; the remaining plan is discarded rather than resumed silently.',
        ],
      },
      errorHandling: [
        'Invalid tool arguments are returned to the model as a structured, correctable error.',
        'Each tool call has a timeout and a bounded retry count, so one stuck tool cannot hang a run.',
        'A step budget caps total iterations, which prevents a planner loop from burning tokens indefinitely.',
        'Mutating tools are idempotent by key, so a retried approval cannot apply twice.',
      ],
      security: [
        'Tool arguments are validated against a schema before reaching any handler — never string-interpolated into a query.',
        'Database access uses parameterised statements scoped by owner id.',
        'Mutating tools require a fresh approval token bound to one specific call.',
        'Tool results are treated as untrusted data when fed back to the model, not as instructions.',
      ],
      testing: [
        'A fake tool registry so controller behaviour is tested without any model call.',
        'Deterministic replay tests: a recorded step log must reproduce the same decisions on resume.',
        'Authorisation tests asserting every mutating tool is refused without an approval.',
        'Fault injection on a tool that times out, to prove the run terminates instead of looping.',
      ],
      tradeoffs: [
        {
          decision: 'A controller in ordinary code instead of a framework',
          rationale:
            'An agent framework hides exactly the decisions that matter here — permission checks, retries and resumability. Keeping the loop explicit costs some scaffolding and buys full auditability.',
        },
        {
          decision: 'Reconstructing context from the step log each turn',
          rationale:
            'It keeps the database as the single source of truth and makes runs survive a restart, at the cost of some token overhead per step.',
        },
        {
          decision: 'Approval per mutating call rather than per plan',
          rationale:
            'Approving a whole plan up front is faster but asks the user to authorise arguments they have not seen yet. Per-call approval is slower and considerably easier to defend.',
        },
      ],
      lessons: [
        'Durability is the feature that turns a demo into something usable; a restart must not lose the work.',
        'Validation belongs between the model and the side effect, never inside the prompt.',
        '"Agentic" is a property of the state machine, not of the model being called.',
      ],
      results: [],
    },
  },

  {
    id: 'fullstack-saas-application',
    title: 'Full-Stack SaaS Application',
    tagline: 'A multi-tenant product with subscriptions, roles and background jobs.',
    summary:
      'A conventional but properly built SaaS foundation: tenant-scoped data, subscription billing, role-based access and background processing that survives failures.',
    status: 'concept',
    featured: false,
    isPlaceholder: true,
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Stripe'],
    repo: { label: 'Repository', href: null },
    demo: { label: 'Live demo', href: null },
    preview: {
      kind: 'placeholder',
      caption: 'Screenshot pending — replace with a capture of the dashboard.',
    },
    highlights: [
      'Tenant isolation enforced in the data layer, so no query can accidentally span accounts.',
      'Stripe subscriptions where webhooks, not the browser, are the source of truth for entitlement.',
      'Role-based access control with a permission check at the route boundary, not in the UI.',
      'Background jobs with idempotency keys and retry backoff for email and report generation.',
    ],
    contribution:
      'Planned as a solo build: schema and migrations, auth and tenancy, billing integration, job worker and the product interface.',
    caseStudy: {
      disclaimer:
        'Concept brief — this project has not been built yet. It exists here to show the non-AI side of the stack: tenancy, billing and jobs, where correctness matters more than novelty.',
      problem:
        'Most portfolio projects skip the parts that make software commercially real. Multi-tenancy, billing state, roles and retryable jobs are exactly where shortcuts become security holes or data corruption, so this project is deliberately about getting those foundations right.',
      intendedUsers:
        'Small teams at companies that outgrow spreadsheets and need a shared, account-scoped tool with a subscription attached.',
      solution:
        'A single Next-level product core: an organisation is the tenant, every row is scoped to it, and entitlement is derived from webhook-confirmed subscription state. Access is decided server-side by permission, the UI only reflects that decision. Anything slow — exports, reports, email — runs in a worker with idempotency keys so a retry cannot duplicate work.',
      dataFlow: [
        {
          label: '1 · Authenticate',
          detail:
            'A session identifies the user; the active organisation is resolved server-side from membership, never taken from a request parameter.',
        },
        {
          label: '2 · Authorise',
          detail:
            'A route-level guard resolves the caller\'s permission for the requested resource and short-circuits with 403 before any handler code runs.',
        },
        {
          label: '3 · Scoped query',
          detail:
            'Data access goes through tenant-scoped repositories that inject the organisation id into every filter, so cross-tenant reads are structurally impossible rather than merely unwritten.',
        },
        {
          label: '4 · Entitlement',
          detail:
            'Feature gates read subscription state that was written by a verified webhook, and are enforced in the same layer as permissions.',
        },
        {
          label: '5 · Async work',
          detail:
            'Long tasks are queued with an idempotency key, processed with exponential backoff, and recorded so a duplicate delivery is detected instead of re-executed.',
        },
      ],
      stack: [
        {
          label: 'Frontend',
          items: [
            'React and TypeScript with typed API clients generated from shared schemas',
            'Server-driven capability flags so the UI cannot drift from real permissions',
            'Explicit loading, empty and error states on every data view',
          ],
        },
        {
          label: 'Backend',
          items: [
            'Node.js and Express with validation at the route boundary',
            'Centralised authorisation middleware rather than per-handler checks',
            'Idempotent webhook endpoints that verify signatures before trusting a payload',
          ],
        },
        {
          label: 'Data',
          items: [
            'PostgreSQL with Prisma migrations kept forward-only and reviewable',
            'Composite unique constraints that include the tenant id to catch leaks at the database level',
            'A job table acting as the queue, so retries are queryable and observable',
          ],
        },
      ],
      ai: null,
      agentic: null,
      errorHandling: [
        'Webhook handlers are idempotent: a replayed Stripe event updates state instead of double-applying it.',
        'Job retries use exponential backoff with a dead-letter state after a bounded attempt count.',
        'Database constraint violations are mapped to clear field-level validation errors instead of 500s.',
        'Every request carries a correlation id that appears in logs and in the error returned to the client.',
      ],
      security: [
        'Tenant scoping is applied in the data access layer, so a forgotten filter in a handler cannot leak another account\'s rows.',
        'Authorisation is enforced server-side; hiding a button is never treated as a control.',
        'Webhook payloads are signature-verified before any state change is accepted.',
        'Sessions are httpOnly and same-site, with rotation on privilege change.',
        'Password storage and reset tokens follow current hashing guidance; no secrets reach the client bundle.',
      ],
      testing: [
        'Integration tests against a real PostgreSQL instance, since row-level scoping is the thing most likely to break.',
        'Explicit multi-tenant leak tests: tenant A must receive nothing belonging to tenant B on every list endpoint.',
        'Webhook tests that replay the same event twice and assert a single state change.',
        'Permission matrix tests covering each role against each protected route.',
      ],
      tradeoffs: [
        {
          decision: 'Shared schema with a tenant column, not a database per tenant',
          rationale:
            'A database per tenant gives stronger isolation but multiplies migrations and connection handling. A tenant column with enforced scoping is the right trade until a compliance requirement says otherwise.',
        },
        {
          decision: 'Subscription state stored locally and driven by webhooks',
          rationale:
            'Querying the billing provider on every request would be simpler to write and far slower and less available. Local state plus verified webhooks is the standard trade.',
        },
        {
          decision: 'Postgres-backed job queue instead of a separate broker',
          rationale:
            'A dedicated broker is more capable, but the queue lives next to the data here and transactional enqueueing prevents lost jobs. It is the smaller, more correct choice at this scale.',
        },
      ],
      lessons: [
        'Multi-tenancy is a data-layer concern; a check in the handler is a bug waiting for the next endpoint.',
        'Webhooks must be treated as untrusted and replayable by default.',
        'Error handling on the happy path is half-finished software; the empty, loading and failed states are the feature.',
      ],
      results: [],
    },
  },
]

/** The project shown first, expanded by default. */
export const featuredProject = projects.find((project) => project.featured) ?? projects[0]
