import React, { useState, useEffect } from 'react';
import { mealServices } from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';

interface Recipe {
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    ingredients: { name: string; quantity: string }[];
}

const RecipeSelectionPage = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const { meals } = await mealServices.getAll();
                setRecipes(meals);
            } catch (error) {
                setError('Error fetching recipes');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleAddToCart = (recipe: Recipe) => {
        setSelectedRecipes((prevSelected) => [...prevSelected, recipe]); // Додаємо рецепт до вибраного кошика
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };


    const generateIngredientList = () => {
        const ingredients: { [key: string]: string } = {};
        selectedRecipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredients[ingredient.name]) {
                    ingredients[ingredient.name] = ingredients[ingredient.name] + ', ' + ingredient.quantity;
                } else {
                    ingredients[ingredient.name] = ingredient.quantity;
                }
            });
        });
        return Object.entries(ingredients).map(([name, quantity]) => (
            <li key={name}>
                {name}: {quantity}
            </li>
        ));
    };

    if (loading) {
        return <p>Loading recipes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>All Recipes</h1>
            <div>
                {recipes.length === 0 ? (
                    <p>No recipes available</p>
                ) : (
                    <ul>
                        {recipes.map((recipe) => (
                            <li key={recipe.idMeal}>
                                <h2>{recipe.strMeal}</h2>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} width="100" />
                                <button onClick={() => handleAddToCart(recipe)}>Add to Cart</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h2>Selected Recipes</h2>
            <div>
                {selectedRecipes.length === 0 ? (
                    <p>No recipes selected</p>
                ) : (
                    <div>
                        <ul>
                            {selectedRecipes.map((recipe) => (
                                <li key={recipe.idMeal}>
                                    <h3>{recipe.strMeal}</h3>
                                    <p>{recipe.strInstructions}</p>
                                    <h4>Ingredients:</h4>
                                    <ul>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>
                                                {ingredient.name}: {ingredient.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        <h3>Combined Ingredients for Selected Recipes</h3>
                        <ul>{generateIngredientList()}</ul>
                    </div>
                )}
            </div>
            <button onClick={handleGoToCart}>
                Go to Cart ({selectedRecipes.length} Recipes)
            </button>
        </div>
    );
};

export default RecipeSelectionPage;
