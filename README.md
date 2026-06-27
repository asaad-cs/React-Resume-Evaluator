# React Resume Evaluator

An AI-powered resume evaluation web app that analyzes uploaded resumes and delivers instant feedback on structure, readability, and overall quality.

## Features

- **Resume Upload & Parsing** — Upload a PDF resume; the backend extracts and processes the text automatically
- **AI Evaluation** — Powered by the OpenAI API to score and critique your resume across multiple dimensions
- **User Authentication** — Secure JWT-based registration and login flow
- **Protected Routes** — Authenticated-only access to the evaluator dashboard
- **Admin Panel** — Admin-only view for managing users and submissions

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v6 | Client-side routing |
| Axios | HTTP client |

### Backend
| Tool | Purpose |
|---|---|
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| SQLModel / SQLAlchemy | ORM & database layer |
| OpenAI SDK | LLM-powered evaluation |
| PyPDF | PDF text extraction |
| python-jose | JWT token handling |
| Passlib / bcrypt | Password hashing |

## Project Structure

```
React-Resume-Evaluator/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── EvaluatorPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Body.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── api/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
└── backend/
    ├── routers/
    │   ├── auth.py
    │   ├── evaluate.py
    │   └── admin.py
    ├── main.py
    ├── database.py
    ├── models.py
    ├── schemas.py
    ├── llm.py
    ├── pdf_utils.py
    ├── auth_utils.py
    └── requirements.txt
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- An OpenAI API key

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_jwt_secret_key
DATABASE_URL=sqlite:///./resume_evaluator.db
```

Start the API server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT |
| POST | `/evaluate/` | Upload and evaluate a resume |
| GET | `/admin/users` | List all users (admin only) |

## License

This project is open source and available under the [MIT License](LICENSE).
