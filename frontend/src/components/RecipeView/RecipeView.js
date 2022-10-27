import React, { Component } from "react";
export default class RecipeView extends Component{
    render() {
        console.log(this.props.recipes)
        return (
        <div style={{overflowY:"scroll"}}>
            <ul>
            {
            this.props.recipes.map(recipe => 
            (<li key={recipe.idMeal}>
                <img 
                    className="mealthumb"
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                />
                {recipe.idMeal}: {recipe.strMeal}
            </li>)
            )}
            </ul>
        </div>
        );
    }
}