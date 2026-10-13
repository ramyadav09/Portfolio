# YT-Bot

A RAG-based YouTube chatbot that lets you ask questions about any YouTube video using AI.

## Stack
- **Backend**: FastAPI + LangChain + Mistral AI + ChromaDB
- **Frontend**: React + Vite + Tailwind CSS

## Setup

### Backend
```bash
cd RAG
python -m venv myenv
myenv\Scripts\activate
pip install -r requirements.txt
uvicorn api:app --reload
```

### Frontend
```bash
cd UI
npm install
npm run dev
```

Open http://localhost:5173, paste a YouTube URL, and start chatting.
