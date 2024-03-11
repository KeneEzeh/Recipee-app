import Image from 'next/image';
import React from 'react';
import Converter from "../../converter/page";
import PriceModal from "../../price/page";
import { FaNairaSign } from "react-icons/fa6";

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

const getPrice = async () => {
    const res = await fetch("https://api.fastforex.io/fetch-all?api_key=86daf051df-ebc58089df-s9m54c")
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
    const calorieCount = await getCalorieCount(details.strMeal)
    const calories = calorieCount[0]?.calories;
    
    const data = await getPrice();
    const amount = data.results?.NGN;
    const rate = amount.toString().split('.')[0] as unknown as any;
    
    const naira = Math.floor(Math.random() * 1000);
    const formattedPrice = naira.toString() + '.00';
    const usd = (naira / rate).toFixed(3);
    
    const things = Object.keys(details).filter((key) => key.includes("strIngredient"));
    const measure = Object.keys(details).filter((key) => key.includes("strMeasure"));
    const every = things.map((thing, i) => { return Object.assign({}, {["ingredient"]: details[thing], ["measure"]: details[measure[i]]})});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
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
        <h2 className='text-xl'>
          Category:{" "}
          <span className="font-bold text-xl">{details.strCategory}</span>
        </h2>
        <table className='my-5'>
          <thead className='bg-red-400'>
            <tr>
              <th>Ingredients</th>
              <th>Measure</th>
            </tr>
          </thead>
          <tbody className='bg-red-200'>
            {every.map((item, i) => (
              <tr key={i} >
                <td>{item.ingredient}</td>
                <td>{item.measure}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5'>
          <h1 className='text-xl font-bold'>Instructions:</h1>
          <p className='mt-1'>{details.strInstructions}</p>
        
        </div>

        <div className="tags mt-3">
            <p className='text-xl font-semibold'>Calorie Count: <span className='text-green-700 font-semibold'>{calories || "Not available"}</span></p>
        </div>
        <div className=''>
          <div className='flex gap-2 items-center'>
            <p className='mt-6 text-xl'>Price: </p>
            <Converter ngnToUsdRate={naira}/>
          </div>
          <div className='mt-2'>

            <PriceModal usd={usd} rate={rate}/>
          </div>
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
