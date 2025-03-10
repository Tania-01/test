import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Для навігації на сторінку рецепта
import { urls } from "../../constant/urls";

const CategoryDropdown = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [meals, setMeals] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        axios.get(urls.categories.base)
            .then((response) => {
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setError("Failed to fetch categories");
            });
    }, []);

    useEffect(() => {
        if (!selectedCategory) return;
        setIsLoading(true);
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
            .then((response) => {
                setMeals(response.data.meals);
            })
            .catch((error) => {
                console.error("Error fetching meals by category:", error);
                setError("Failed to fetch meals");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [selectedCategory]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    if (error) return <div>{error}</div>;

    return (
        <div>
            <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.idCategory} value={category.strCategory}>
                        {category.strCategory}
                    </option>
                ))}
            </select>

            {isLoading ? (
                <div>Loading meals...</div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {meals && meals.length > 0 ? (
                        meals.map((meal: any) => (
                            <div key={meal.idMeal} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                                <Link to={`/recipe/${meal.idMeal}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img src={meal.strMealThumb} alt={meal.strMeal} width={200} />
                                    <h3>{meal.strMeal}</h3>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div>No meals found for this category.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;
