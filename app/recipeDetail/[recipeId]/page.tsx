// import React, { use, useEffect, useState } from 'react';
// import Image from 'next/image';
// import duplex from "../../../public/Duplex.jpg";

// interface Recipe {
//   id: string;
//   img: string;
//   name: string;
//   ingredients: string[];
//   instructions: string[];

// }

// const recipes = [
//   {
//     id: "1b",
//     img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
//     name: 'Pasta',
//     ingredients: ['pasta', 'tomato', 'onion', 'garlic', 'olive oil'],
//     instructions: ['boil pasta', 'chop tomato', 'chop onion', 'chop garlic', 'fry onion and garlic in olive oil', 'add tomato', 'add pasta']
//   },
//   {
//     id: "2b",
//     img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
//     name: 'Pancakes',
//     ingredients: ['flour', 'milk', 'egg', 'sugar', 'baking powder', 'butter'],
//     instructions: ['mix flour, milk, egg, sugar, and baking powder', 'fry in butter']
//   }

// ]

// const RecipeDetail = ({params}:any) => {

  
//   console.log(params);
//   const recipe = recipes.find((recipe: Recipe) => recipe.id === params.recipeId);
//   return (
//     <>
//     <div className='flex justify-center'>
//       <div className='px-10 flex flex-col justify-center items-center'>
//         <Image 
//         src={duplex} 
//         alt="recipe" width={700} height={700} />
//         <h1 className='flex justify-center text-2xl'>{recipe?.name}</h1>
//         <button></button>
//       </div>

//       <div>
//         <h1 className='text-xl'>Ingredients:</h1>
//         <ul className='grid gap-5'>
//           {recipe?.ingredients.map((ingredient, index) => (
//             <li  key={index}> <span className='btn btn-primary rounded-lg'>{ingredient}</span></li>
//           ))}
//         </ul>
//       </div>
//     </div>
//     </>
//   )
// }

// export default RecipeDetail

import Image from 'next/image'
import React from 'react'

const getRecipeDetails = async (id: string) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const response = await res.json()
    return response;

}


const getCalorieCount = async(id: string) => {
    const ApiKey = "/kRFqaMb5vachFyMIROKUw==nvo8b0ysDzj99giS";
    const query = `${id} calories`;
    const res = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
        headers: {
            "X-Api-Key": ApiKey,
            "content-type": "application/json"
        }
    })
    const response = await res.json()
    return response;
}

const page = async ({ params }: any) => {
    const recipeDetails = await getRecipeDetails(params.recipeId)
    const details = recipeDetails.meals[0];
    const ingredients = Object.keys(details)
    .filter((key) => key.indexOf("ingredient") === 0)
    .map((ingKey) => (details[ingKey]?.length ? details[ingKey] : undefined))
    .filter(Boolean)
    console.log(details);
    const calorieCount = await getCalorieCount(details.strMeal)
    const calories = calorieCount[0]?.calories;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
     <div>
        <Image
          alt="Recipe"
          width={500}
          height={400}
          src={details.strMealThumb}
          className="w-full"
        />
      </div>
      <div className='p-5'>
      <h1 className='text-xl'>
          Recipe Name:{" "}
          <span className="font-bold text-2xl">{details.strMeal}</span>
        </h1>

        <div className="tags mt-3">
            <p className='text-xl'>Calorie Count: <span className='text-green-700 font-semibold'>{calories}</span></p>
          <p className="mb-3">Ingredients List: {ingredients || ""}</p>
          {ingredients.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-500 text-white px-2 py-1 inline-block rounded mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="tags mt-3">
          <span>Video Link: </span>
          <a
            className="text-blue-500"
            target="_blank"
            href={details.strYoutube}
            rel="noreferrer"
          >
            How to make {details.strMeal}
          </a>
        </div>
      </div>
    </div>
  )
}

export default page
