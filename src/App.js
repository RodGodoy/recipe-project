import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe.js';
import Banner from './Banner.js';

const App = () => {

  const APP_ID = '2602feb3';
  const APP_KEY = '17cf479bdc1f1139c6625c7260444834';


  const [recipes, setRecipes] = useState([]);  //empty array set to take in value for 'recipes' through function 'setRecipes'
  const [search, setSearch] = useState('');   //empty string to change into value for 'search' keywords through function 'setSearch'
  const [query, setQuery] = useState('');
  const [banner, setBanner] = useState(true); //new

  // useEffect to trigger something to happen every time page is rendered
  useEffect(() => {        //happens every time page is rendered 
     getRecipes();         //triggers 'getRecipes'
  }, [query]);                  // will run every time the query value is updated
/////////////////////////////////////////////////////////////////////////////


  //calling out to the API
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data);
    setRecipes(data.hits);
  };
  /////////////////////////

  //updating the search value
  const updateSearch = e => {           //e = event
    
    setSearch(e.target.value);
  };
//////////////////////////////

///set the query to search
  const getSearch = e => {
    e.preventDefault();  //stop the refresh? 
    setQuery(search); //the query turns into the search
    setSearch(''); //set search back into an empty string
    hideBanner();
  };
///////////////////////////

/////////////////new 9/30


const hideBanner = () => {
    setBanner(false);
}


   return( 
     <div className="App">
    
      <br>
      </br>

      <h1> The Recipe Finder</h1>
      
       <form onSubmit={getSearch} className="search-form">
         <input 
         className="search-bar" 
         type="text" 
         value={search} 
         onChange={updateSearch}/>

         <button 
           className="search-button" 
           type="submit"
           >search!               
         </button>

       </form>

       <br>
      </br>
       <div>
        {banner ? <Banner/> : null}
      </div>

      <br></br>

     

       <div className="recipes">

       {recipes.map(recipe =>(             //mapping out the recipes thus making a list of every recipe in 'data.hits' or 'recipes'
       <Recipe
         key={recipe.recipe.label}
         title={recipe.recipe.label}
         servingAmm={recipe.recipe.yield} 
         calories={recipe.recipe.calories}
         image={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}
         url={recipe.recipe.url}/>
       ))}

       </div>



     </div>
   )
}

export default App;
