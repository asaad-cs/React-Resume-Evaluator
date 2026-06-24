from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import create_db
from routers import auth, evaluate, admin

app = FastAPI(title="Resume Evaluator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(evaluate.router, prefix="/evaluate")
app.include_router(admin.router, prefix="/admin")


@app.on_event("startup")
def on_startup():
    create_db()


@app.get("/")
def root():
    return {"message": "Hello from FastAPI!"}


@app.get("/ping")
def ping():
    return {"status": "ok"}


@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}
