export interface IIngredient {
    name: string;
    measure: string;
}

export interface IMealEntry {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    [key: string]: string | undefined;
}

export interface IMeal {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate?: string | null;
    strCategory?: string | null;
    strArea?: string | null;
    strInstructions?: string;
    strMealThumb?: string;
    strTags?: string | null;
    strYoutube?: string | null;
    ingredients?: IIngredient[];
    strSource?: string | null;
    strImageSource?: string | null;
    strCreativeCommonsConfirmed?: string | null;
    dateModified?: string | null;

}

export interface IMealEntries {
    meals: IMeal[];

}
export interface IRecipeWithIngredients extends IMeal {
    ingredients: IIngredient[];
}
