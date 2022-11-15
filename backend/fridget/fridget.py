
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fridget.ingredients.views import router as IngredientRouter
from fridget.recipes.views import router as RecipeRouter
from fridget.users.views import router as UserRouter

app = FastAPI()


origins = [
    "https://localhost:3000",
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(IngredientRouter)
app.include_router(RecipeRouter)
app.include_router(UserRouter)