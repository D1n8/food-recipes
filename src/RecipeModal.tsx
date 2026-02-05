import axios from "axios";
import { useEffect, useState } from "react";

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
    strInstructions: string,
    [key: string]: string | null
}

interface IIngredient {
    name: string
    measure: string
}

function getIngredients(recipe: IRecipe): IIngredient[] {
    const ingredients: IIngredient[] = []

    for (let i = 1; i <= 20; i++) {
        const name = recipe[`strIngredient${i}`]
        const measure = recipe[`strMeasure${i}`]

        if (name && name.trim()) {
            ingredients.push({
                name,
                measure: measure ?? ''
            })
        }
    }

    return ingredients
}

function RecipeModal({ isOpen, onClose, id }: IRecipeModalProps) {
    const [recipe, setRecipe] = useState<IRecipe>()


    useEffect(() => {
        async function fetchRecipeById(id: string) {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            setRecipe(response.data.meals[0])
        }
        fetchRecipeById(id)
    }, [id, isOpen])


    const ingredients = recipe ? getIngredients(recipe) : []

    return (
        <>
            {
                isOpen && recipe ?
                    (
                        <main className='fixed flex justify-center items-center inset-0 bg-gray-900/60 z-10'>
                            <div className="p-5 w-2/5 h-[90vh] bg-gray-800 overflow-y-auto">
                                <div className="mb-5 flex justify-around items-center">
                                    <p className="text-m">{recipe.strCategory}</p>
                                    <p className="text-2xl">{recipe.strMeal}</p>
                                    <p className="text-m">{recipe.strArea}</p>
                                </div>


                                <img className="mb-5" src={recipe.strMealThumb} alt={recipe.strMeal} />
                                <ul className="mb-5">
                                    {ingredients.map((item, index) => (
                                        <li key={index}>
                                            {item.name} — {item.measure}
                                        </li>
                                    ))}
                                </ul>


                                <p className="mb-5">Instructions: {recipe.strInstructions}</p>
                                <button className="py-1 px-2 border-2 rounded border-blue-600 bg-blue-600 cursor-pointer" onClick={onClose}>Close</button >

                            </div>
                        </main >
                    )
                    :
                    null
            }
        </>
    );
}

export default RecipeModal;