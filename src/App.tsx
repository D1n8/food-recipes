import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import RecipeModal from './RecipeModal'

interface ICategory {
  strCategory: string
}

interface IArea {
  strArea: string
}

interface IMeal {
  idMeal: string,
  strMeal: string,
  strMealThumb: string
}

function App() {
  const [categories, setCategories] = useState<ICategory[]>()
  const [area, setArea] = useState<IArea[]>()
  const [meals, setMeals] = useState<IMeal[]>()
  const [seletedCategory, setSelectedCategory] = useState('')
  const [seletedArea, setSelectedArea] = useState('')
  const [seletedName, setSelectedName] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')

  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      setCategories(response.data.meals)
    }

    async function fetchArea() {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      setArea(response.data.meals)
    }

    async function fetchRandomMeal() {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      setMeals(response.data.meals)
    }

    fetchCategories()
    fetchArea()
    fetchRandomMeal()
  }, [])

  async function handleFetchByCategory(e: React.MouseEvent<HTMLLIElement>) {
    setSelectedArea('')
    setSelectedName('')
    setSelectedCategory(e.currentTarget.textContent)
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.textContent}`)
    setMeals(response.data.meals)
  }

  async function handleFetchByArea(e: React.MouseEvent<HTMLLIElement>) {
    setSelectedCategory('')
    setSelectedName('')
    setSelectedArea(e.currentTarget.textContent)
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.target.textContent}`)
    setMeals(response.data.meals)
  }

  async function handleFetchByName() {
    setSelectedArea('')
    setSelectedCategory('')

    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${seletedName}`)
    setMeals(response.data.meals)
  }

  function handleSelectMeal(id: string) {
    setSelectedId(id)
    setIsOpen(true)
  }

  return (
    <div className='w-200 mx-auto my-10 text-white' >
      <div className="flex gap-25 mb-5">
        <div className="input-container">
          <input className='mr-2 p-1 border-2 rounded border-blue-600 text-white'
            value={seletedName} type="text" id="input" placeholder='Name of food'
            onChange={(e) => setSelectedName(e.target.value)} />
          <button className='py-1 px-2 border-2 rounded border-blue-600 bg-blue-600 cursor-pointer' onClick={handleFetchByName}>Search</button>
        </div>
        {
          seletedCategory &&
          <h2 className='text-xl'>{seletedCategory}</h2>
        }

        {
          seletedArea &&
          <h2 className='text-xl'>{seletedArea}</h2>
        }

      </div>

      <main className='flex justify-between'>
        <div className="categories-container">
          <h3 className='text-xl mb-4'>Categories</h3>
          <ul className="categories-list">
            {
              categories &&
              categories.map(item => (
                <li key={item.strCategory} className="p-2 not-last:border-b cursor-pointer hover:bg-gray-600" onClick={(e) => handleFetchByCategory(e)}>
                  {item.strCategory}
                </li>
              ))
            }
          </ul>
        </div>

        <div className="w-1/2 recipes-container">
          {
            meals &&
            <ul className="flex flex-col gap-2 align-center">
              {
                meals.map(item =>
                  <li key={item.idMeal} className="p-5 bg-gray-800 cursor-pointer hover:scale-103 transition duration-300 ease-in-out"
                    onClick={() => handleSelectMeal(item.idMeal)}>
                    <h3 className='mb-3'>{item.strMeal}</h3>
                    <img src={item.strMealThumb} alt={item.strMeal} />
                  </li>
                )
              }
            </ul>
          }
        </div>

        <div className="area-container">
          <h3 className='text-xl mb-4'>Area</h3>
          <ul className="area-list">
            {
              area &&
              area.map(item => (
                <li key={item.strArea} className="p-2 not-last:border-b cursor-pointer hover:bg-gray-600" onClick={(e) => handleFetchByArea(e)}>
                  {item.strArea}
                </li>
              ))
            }
          </ul>
        </div>
      </main>

      <RecipeModal isOpen={isOpen} onClose={() => setIsOpen(false)} id={selectedId} />
    </div>
  )
}

export default App
