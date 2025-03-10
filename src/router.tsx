import {createBrowserRouter, Navigate} from "react-router-dom";
import MainLayaout from "./components/MainLayaout";
import Recipes from "./components/recipeContainer/Recipes";
import RecipePage from "./components/recipeContainer/RecipePage";
import RecipeSelectionPage from "./components/recipeContainer/SelectedRecept";

const router= createBrowserRouter([
    {path:'', element:<MainLayaout/>,children:

            [
                {index: true,element:<Navigate to={"recipes"}/>},
                {path:'recipes', element:<Recipes/>},
                {path:"/recipe/:idMeal", element:<RecipePage />},
                {path:"/reciper/id", element:<RecipePage />},
                {path:"/select-recipes", element:<RecipeSelectionPage />}

]}
]);


export {router}