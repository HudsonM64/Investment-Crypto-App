import os
import sys

from mangum import Mangum


# Ensure the backend package is on the path when running in Vercel
CURRENT_DIR = os.path.dirname(__file__)
BACKEND_PATH = os.path.join(CURRENT_DIR, "..", "backend", "api")
sys.path.append(BACKEND_PATH)

# Import the FastAPI app defined in backend/api/api.py
from api import app  # type: ignore


# AWS/Lambda style handler Vercel uses for Python serverless functions
handler = Mangum(app)
