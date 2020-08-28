import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients, servingAmm, url}) => {   //passing in the props from main component
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p>Servings: {servingAmm}</p>
            <p>Calories Per Serving: {Math.floor(calories / servingAmm)}</p>
            <img className={style.image} src={image} alt="" />
            <ol>
                {ingredients.map(ingredient =>(
                    <ul>{ingredient.text}</ul>
                ))}
            </ol>
        <br />
            <a href={url}>Full recipe and directions here</a>
        </div>


    );
}


export default Recipe;