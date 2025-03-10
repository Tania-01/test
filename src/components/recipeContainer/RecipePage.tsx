import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mealServices } from "../../services/recipeService";
import { IMeal } from "../../type/mealTypes";

const RecipePage = () => {
    const { idMeal } = useParams();
    const [recipe, setRecipe] = useState<IMeal | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!idMeal) return;

        setLoading(true);
        mealServices.getById(Number(idMeal))
            .then((data) => {
                if (data?.meals && data.meals.length) {
                    setRecipe(data.meals[0]);
                } else {
                    setError("Recipe not found.");
                }
            })
            .catch((error) => {
                console.error(error);
                setError("An error occurred while fetching the recipe.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idMeal]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!recipe) return <div>Recipe not found.</div>;

    return (
        <div>
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>Category: {recipe.strCategory}</p>
            <p>Origin: {recipe.strArea}</p>

            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name} - {ingredient.measure}
                    </li>
                ))}
            </ul>

            <h3>Instructions:</h3>
            <p>{recipe.strInstructions}</p>
        </div>
    );
};

export default RecipePage;
