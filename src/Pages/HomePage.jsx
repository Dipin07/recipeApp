import { Flashlight, Heart, HeartPulse, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';
import { getRandomColor } from '../lib/utils';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      setRecipes(res.data.meals || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault()
    fetchRecipes(e.target[0].value);
  }

  return (
    <div className='bg-[#faf9fe] p-10 flex-1'>
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className='input shadow-md flex items-center gap-2'>
            <Search size={'24'} />
            <input
              type="text"
              className='text-sm md:text-md grow'
              placeholder='What do you want to cook today'
            />
          </label>
        </form>

        <h1 className='font-bold text-3xl md:text-5xl mt-4'>
          Recommended Recipes
        </h1>
        <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>
          Popular choices
        </p>

        <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

          {/* Loading Skeleton */}
          {loading && (
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex w-52 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))
          )}

          {/* Recipes */}
          {!loading &&
            recipes.map((recipe, index) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe}
                {...getRandomColor()}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;