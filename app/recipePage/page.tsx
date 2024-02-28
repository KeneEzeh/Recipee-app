import Link from 'next/link'
import React from 'react'

// export const recipes = [
//   {
//     id: "1b",
//     name: 'Pasta',
//     ingredients: ['pasta', 'tomato', 'onion', 'garlic', 'olive oil'],
//     instructions: ['boil pasta', 'chop tomato', 'chop onion', 'chop garlic', 'fry onion and garlic in olive oil', 'add tomato', 'add pasta']
//   },
//   {
//     id: "2b",
//     name: 'Pancakes',
//     ingredients: ['flour', 'milk', 'egg', 'sugar', 'baking powder', 'butter'],
//     instructions: ['mix flour, milk, egg, sugar, and baking powder', 'fry in butter']
//   }

// ]
const getRecipes = async (type:any) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${type}`);
  const recipes = await res.json();
  return recipes;
}

const RecipeCard = async () => {
  // const res = await fetch('https://api.nutritionix.com/v1_1/search/apple?results=5&fields=item_name,brand_name,nf_calories&appId=5078e2bd&appKey=c3f04a2613152c376aa833085e20e832	—');
  // const recipesData = await res.json()
  // console.log(recipesData)
  const recipes = await getRecipes('Italian');
  console.log(recipes.meals);
  return (
    <>
    <div className='flex flex-wrap gap-5'>
    {recipes.meals.map(recipe => (
      <div key={recipe.idMeal} className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div
          className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src={recipe.strMealThumb}
            alt="card-image" />
        </div>
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
            {recipe.strMeal}
          </h5>
          {/* <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            <span className='text-xl text-green-800 font-semibold'>Ingredients:</span>  {recipe.ingredients.join(', ')}
          </p> */}
        </div>
        <div className="p-6 pt-0">
          <Link href={`/recipeDetail/${recipe.idMeal}`}>

          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button">
            Read More
          </button>
          </Link>
        </div>
      </div>
    ))}
    </div>
    </>
  )
}

export default RecipeCard
