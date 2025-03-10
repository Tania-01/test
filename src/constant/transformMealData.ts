import {IMeal} from "../type/mealTypes";

export const transformMealData = (mealData: any): IMeal => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = mealData[`strIngredient${i}`];
        const measure = mealData[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push({ name: ingredient, measure: measure || '' });
        }
    }
    return {
        idMeal: mealData.idMeal,
        strMeal: mealData.strMeal,
        strDrinkAlternate: mealData.strDrinkAlternate,
        strCategory: mealData.strCategory,
        strArea: mealData.strArea,
        strInstructions: mealData.strInstructions,
        strMealThumb: mealData.strMealThumb,
        strTags: mealData.strTags,
        strYoutube: mealData.strYoutube,
        ingredients: ingredients,
        strSource: mealData.strSource,
        strImageSource: mealData.strImageSource,
        strCreativeCommonsConfirmed: mealData.strCreativeCommonsConfirmed,
        dateModified: mealData.dateModified,
    } as IMeal;
};