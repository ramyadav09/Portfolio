# SmartFind — AI-Based Campus Lost & Found System

SmartFind is a centralized platform where students and staff report lost and
found items, and an AI layer suggests **potential matches** between them.
Ownership is never decided by AI: items are resolved only through a
verified, admin-reviewed claims workflow.

![status](https://img.shields.io/badge/tests-67%20backend%20%C2%B7%208%20frontend-brightgreen)

## Features

- **Reports** — structured lost & found reports (category, color, brand,
  location, approximate date/time, contact preference, photos, extra details)
  with full CRUD, resolution, and image uploads.
- **AI matching** — every approved report is embedded and compared against the
  opposite pool using weighted semantic + attribute similarity. Matches show a
  normalized score ("Potential Match: 91%") plus human-readable reasons.
- **Honest AI** — output is always labeled *potential*, with explanations and
  a disclaimer; users can dismiss matches. No provider configured? Matching
  falls back to deterministic scoring and everything still works.
- **Claims workflow** — claims require identifying details; admins approve or
  reject; approval resolves the item(s). Users cannot claim their own items.
- **Notifications** — in-app alerts for matches, claim outcomes, and report
  moderation (architecture is extensible to email).
- **Admin console** — dashboard analytics, report moderation, user and
  category management, match/claim review, and audit logs.
- **Search** — server-side keyword, category, location, status, and date
  filtering with pagination.
- **Security** — JWT auth with refresh, bcrypt hashing, server-side RBAC,
  validated uploads, consistent error envelope, audit trail.

## Architecture

```
React Frontend (Vite · TypeScript · Tailwind · Redux Toolkit)
        │ REST / JWT
        ▼
FastAPI Backend (modular monolith)
  endpoints → services/repositories → SQLAlchemy models
        │                └── AI abstraction (AIService → provider via env)
        ▼
PostgreSQL (+ pgvector)
```

Layered, provider-neutral, and deliberately a monolith — see
[docs/05-system-architecture.md](docs/05-system-architecture.md).

## Technology Stack

| Area | Choices |
|------|---------|
| Frontend | React 18, TypeScript, Vite, React Router, Redux Toolkit, Tailwind CSS, Axios, React Hook Form + Zod |
| Backend | Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy 2 (async), Alembic |
| Database | PostgreSQL 16 + pgvector |
| AI | Env-configurable providers: OpenAI-compatible, NVIDIA NIM, or local servers; optional vision; `NullAIService` fallback |
| Testing | pytest (+ TestClient/httpx), Vitest + React Testing Library, Playwright |
| Dev/Deploy | Git, Docker, Docker Compose |

## Project Structure

```
smartfind/
├── backend/
│   ├── app/
│   │   ├── ai/            # AIService interface + providers (env-selected)
│   │   ├── api/v1/endpoints/  # auth, items, matches, claims, notifications, users, admin, misc
│   │   ├── core/          # config, security, database, error handling
│   │   ├── models/        # SQLAlchemy models
│   │   ├── repositories/  # persistence layer
│   │   ├── schemas/       # Pydantic request/response schemas
│   │   └── services/      # matching engine, notifications, audit
│   ├── alembic/           # migrations (0001_initial)
│   ├── scripts/seed_admin.py
│   └── tests/             # unit + API/integration (pytest)
├── frontend/
│   └── src/
│       ├── components/    # common / items / matches reusable UI
│       ├── layouts/       # route guards
│       ├── pages/         # auth, dashboard, items, matches, claims, admin
│       ├── store/         # Redux slices
│       └── types/         # TS domain types
├── e2e/                   # Playwright end-to-end flow
├── docs/                  # 15 SE documents (proposal → traceability matrix)
├── docker-compose.yml
└── .env.example
```

## Quick Start (Docker)

```bash
cp .env.example .env      # set SECRET_KEY, JWT_SECRET_KEY, POSTGRES_PASSWORD
docker compose up --build
# Frontend: http://localhost:5173 · API docs: http://localhost:8000/docs
docker compose exec backend python -m scripts.seed_admin   # create the admin
```

The backend runs `alembic upgrade head` automatically on start, so a clean
database is fully migrated.

## Local Development

```bash
# 1. Database: PostgreSQL 15+ running locally (enable: CREATE EXTENSION vector;)
# 2. Backend
cd backend
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
cp ../.env.example .env    # edit DATABASE_URL and secrets
alembic upgrade head
uvicorn app.main:app --reload

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev                # proxies /api and /static to :8000
```

## Database Setup & Migrations

- Schema lives in `backend/app/models/models.py`; the initial migration is
  `backend/alembic/versions/0001_initial.py` (creates everything, including
  the `vector` extension when available).
- Apply: `alembic upgrade head` · Roll back: `alembic downgrade -1`.
- After model edits: `alembic revision --autogenerate -m "..."` (review it).

## Running Tests

```bash
cd backend && pytest -q           # 67 tests: unit + API/integration
cd frontend && npm test           # 8 component tests (Vitest + RTL)
npm run e2e                       # Playwright (needs the stack running)
cd frontend && npx tsc -b         # strict typecheck
```

## API Documentation

- Live OpenAPI/Swagger: **`http://localhost:8000/docs`** (ReDoc at `/redoc`).
- Human reference: [docs/07-api-documentation.md](docs/07-api-documentation.md).

## AI Architecture

```
Report text  ── preprocessing ──▶ AIService.generate_embedding()   (env-selected provider)
                                        │ unavailable? → token-overlap fallback
                                        ▼
              weighted score = 0.55·semantic + 0.15·category + 0.10·color
                             + 0.10·location + 0.10·date proximity
                                        ▼
              business rules (min score 0.35, dedupe, cap 10) → ItemMatch("potential")
                                        ▼
              explanation ("Same category", "Similar color", …) + owner notification
```

- Providers are swapped via `AI_PROVIDER` (openai / azure_openai / nvidia /
  local / empty); keys exist **only** in backend environment variables.
- Optional image analysis (`ENABLE_IMAGE_AI=true` + vision model) extracts
  category/color/brand from photos.
- Details: [docs/08-ai-design.md](docs/08-ai-design.md).

## Screenshots

> Placeholder — add screenshots of the dashboard, item detail with a match
> card, and the admin console here.

| Page | What to capture |
|------|-----------------|
| Dashboard | quick actions grid |
| Item detail | match card with score + reasons + disclaimer |
| Admin dashboard | stat cards |
| Matches page | potential matches list |

## Documentation

Full SE documentation lives in [`docs/`](docs/): project proposal,
feasibility study, SRS, requirements & use cases, architecture, database
design, API reference, AI design, security design, test plan/cases/report,
deployment guide, maintenance plan, and the requirements traceability matrix.

## Future Improvements

- Email/push notification channels (hooks already exist).
- Full in-SQL vector ranking (`ORDER BY embedding <=> query`) with an IVFFlat
  index as data grows.
- Image-to-image visual similarity when image AI is enabled.
- Multi-campus support (location hierarchy), saved searches, rate-limit
  dashboards, and token revocation lists.

## License

Academic project — see the course requirements.
