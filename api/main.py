from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import all routes
from .products import router as products_router
from .auth import router as auth_router
from .orders import router as orders_router

app.include_router(products_router)
app.include_router(auth_router)
app.include_router(orders_router)

@app.get("/")
def read_root():
    return {"message": "Hope Epicure API"}

# Vercel handler
def handler(request):
    return app(request)