const baseURL = 'https://www.themealdb.com/api/json/v1/1';

const searchMeal = '/search.php?s';
const categories = '/categories.php';
const mealById = '/lookup.php';

const urls = {
    meals: {
        base: `${baseURL}${searchMeal}`,
    },
    categories: {
        base: `${baseURL}${categories}`,
        byName:(categorie:string) =>`${baseURL}${categories}?c${categorie}`,
    },
    mealById: {

        getById: (id: number) => `${baseURL}${mealById}?i=${id}`,
    },
};

export { baseURL, urls };
