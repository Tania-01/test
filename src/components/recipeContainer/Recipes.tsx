import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./Recipe";
import Pagination from "../../pagination/Pagination";


const Recipes = () => {
    const [query, setQuery] = useState<string>("");
    const [meals, setMeals] = useState<any[]>([]);
    const [allMeals, setAllMeals] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
                setAllMeals(response.data.meals);
            } catch (err) {
                console.error("Error fetching meals:", err);
                setError("Failed to fetch meals");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMeals();
    }, []);

    useEffect(() => {
        if (!query) {
            setMeals(allMeals);
        } else {
            const filteredMeals = allMeals.filter(meal =>
                meal.strMeal.toLowerCase().includes(query.toLowerCase())
            );
            setMeals(filteredMeals);
        }
    }, [query, allMeals]);

    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

    const pageCount = Math.ceil(meals.length / itemsPerPage);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a meal..."
                value={query}
                onChange={handleSearchChange}
            />
            <div>
                {currentMeals.length > 0 ? (
                    currentMeals.map((meal: any) => (
                        <RecipeCard key={meal.idMeal} meal={meal} />
                    ))
                ) : (
                    <div>No meals found.</div>
                )}
            </div>


            <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Recipes;
