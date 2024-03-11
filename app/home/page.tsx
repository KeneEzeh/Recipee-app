import Link from 'next/link';
import React from 'react';


const getRecipes = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const recipes = await res.json();
    return recipes;
  }

const Home = async () => {

    const recipes = await getRecipes();
    // console.log(recipes);
  return (
    <>
    <div className="bg-[url('../public/recipe.jpeg')] bg-cover h-screen">
        <h1 className='text-center lg:text-7xl font-bold mb-5 sm:text-4xl'>Welcome!!!</h1>
        <h2 className='mb-3 text-2xl font-bold text-red-500'>Click on any region/area of your choice to view the recipies native to them</h2>
        <ul className='flex flex-wrap gap-5'>
            {recipes.meals.map((recipe: any, index: number) => (
                <Link href={`/recipePage/${recipe.strArea}`} className='bg-green-400 p-7 rounded-lg text-xl font-semibold transition-all duration-700 hover:scale-110' key={index}>{recipe.strArea}</Link>
            ))}
        </ul>
    </div>
      
    </>
  )
}

export default Home
