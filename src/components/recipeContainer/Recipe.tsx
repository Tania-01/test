// @ts-ignore
import style from './Recipe.module.css'
import React from 'react';
import {IMeal} from "../../type/mealTypes";
import {Link} from "react-router-dom";


interface MealCardProps {
    meal: IMeal;
}

const RecipeCard: React.FC<MealCardProps> = ({ meal }) => {
    return (
        <div className={style.recipe_card}>
            <img src={meal.strMealThumb} alt={meal.strMeal}className={style.recipeImg} />
            <h3>{meal.strMeal}</h3>
            <p>{meal.strCategory}</p>
            <p>{meal.strArea}</p>
            <p>{meal.strInstructions}</p>
            <a
                href={meal.strYoutube ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
            >
                Watch Recipe Video
            </a>
            <Link to={`/recipe/${meal.idMeal}`} className={style.link}>
                View Recipe
            </Link>
        </div>
    );
};

export default RecipeCard;
