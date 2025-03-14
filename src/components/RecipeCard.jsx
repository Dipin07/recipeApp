import React, { useState, useEffect } from 'react';
import { Heart, HeartPulse, Soup } from 'lucide-react';

const RecipeCard = ({ recipe, bg, badge }) => {
    const isGlutenFree = !recipe.strIngredient1?.toLowerCase().includes('flour') &&
        !recipe.strIngredient2?.toLowerCase().includes('flour'); // Basic check

    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.some((fav) => fav.strMeal === recipe.strMeal);
    });

    const addRecipeToFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.strMeal === recipe.strMeal);

        if (isRecipeAlreadyInFavorites) {
            favorites = favorites.filter((fav) => fav.strMeal !== recipe.strMeal);
            setIsFavorite(false);
        } else {
            favorites.push(recipe);
            setIsFavorite(true);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    return (
        <div>
            <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
                <a
                    href={`https://www.youtube.com/results?search_query=${recipe.strMeal} recipe`}
                    target='_blank'
                    className="relative h-32">
                    <div className='skeleton absolute inset-0' />
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
                        onLoad={(e) => {
                            e.currentTarget.style.opacity = 1;
                            e.currentTarget.previousElementSibling.style.display = "none";
                        }}
                    />
                    <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                        <Soup size={16} /> {recipe.strMeasure2}
                    </div>
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            addRecipeToFavorite();
                        }}
                        className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer">
                        {!isFavorite && <Heart size={20} className='hover:fill-red-500 hover:text-red-500' />}
                        {isFavorite && <Heart size={20} className='fill-red-500 text-red-500' />}
                    </div>
                </a>
                <div className="flex mt-1">
                    <p className="font-bold tracking-wide">{recipe.strMeal}</p>
                </div>
                <p className="my-2">{recipe.strArea}</p>
                <div className="flex gap-2 mt-auto">
                    {isGlutenFree && (
                        <div className={`flex gap-1 ${badge} items-center p-1 rounded-xl`}>
                            <HeartPulse size={16} />
                            <span className="text-sm tracking-tighter font-semibold">Gluten-free</span>
                        </div>
                    )}
                    <div className={`flex gap-1 ${badge} items-center p-1 rounded-xl`}>
                        <HeartPulse size={16} />
                        <span className="text-sm tracking-tighter font-semibold">Heart-healthy</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
