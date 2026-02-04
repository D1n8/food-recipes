import { useState } from "react";

interface IRecipeModalProps {
    isOpen: boolean,
    onClose: () => void,
    id: string
}

interface IRecipe {
    idMeal: string,
    strMeal: string,
    strMealThumb: string,
    strArea: string,
    strCategory: string,
    strInstructions: string
}

function RecipeModal(props: IRecipeModalProps) {
    const [recipe, setRecipe] = useState()
    return (
        <main className='w-200 mx-auto my-10 text-white' >
            <button onClick={props.onClose}>Close</button>
        </main>
    );
}

export default RecipeModal;