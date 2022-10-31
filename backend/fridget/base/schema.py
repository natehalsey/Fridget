import ormar
import databases
import sqlalchemy

from typing import Optional
from pydantic import json
from .config import Settings

DATABASE_URL = Settings.DATABASE

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

class BaseMeta(ormar.ModelMeta):
    metadata = metadata
    database = database


class User(ormar.Model):
    class Meta(BaseMeta):
        tablename="users"
    
    id: int = ormar.Integer(primary_key=True)
    username: str = ormar.String(max_length=20)
    hashed_password: str = ormar.String(max_length=20)
    
class Area(ormar.Model):
    class Meta(BaseMeta):
        tablename="areas"
    
    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=30, unique=True)

class Category(ormar.Model):
    class Meta(BaseMeta):
        tablename="categories"
    
    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=50, unique=True)
    
class Ingredient(ormar.Model):
    class Meta(BaseMeta):
        tablenmae="ingredients"
    
    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=500, unique=True)
    description: Optional[str] = ormar.Text(nullable=True)
    type: Optional[str] = ormar.String(max_length=50, nullable=True)

class Measurement(ormar.Model):
    class Meta(BaseMeta):
        tablename="measurements"
    
    id: int = ormar.Integer(primary_key=True)
    measurement: str = ormar.String(max_length=500, unique=True)
     
class Recipe(ormar.Model):     

    class Meta(BaseMeta):
        tablename="recipes"

    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=100)
    category: Category = ormar.ForeignKey(Category)
    area: Area = ormar.ForeignKey(Area)
    instructions: Optional[str] = ormar.Text(nullable=True)
    ingredients_measurements: json = ormar.JSON(nullable=True)
    image_url: Optional[str] = ormar.String(max_length=200, nullable=True)
    source: Optional[str] = ormar.String(max_length=500, nullable=True)


class RecipeIngredientMeasurement(ormar.Model):
    class Meta(BaseMeta):
        tablename="recipes_ingredients_measurements"
        constraints =[ormar.UniqueColumns("ingredient", "measurement", "recipe")]
    
    id: int = ormar.Integer(primary_key=True)
    ingredient: Ingredient = ormar.ForeignKey(Ingredient)
    measurement: Measurement = ormar.ForeignKey(Measurement)
    recipe: Recipe = ormar.ForeignKey(Recipe)