const axios = require('axios');
const path = require('path');
const fs = require('fs');


// let [drink] = process.argv.slice(2)
let drink;

if (process.argv.slice(2).length > 1) {
    drink = process.argv.slice(2).join("_");
    console.log(drink)
} else {
    [drink] = process.argv.slice(2);
    if (drink.includes("-")) {
        drink = drink.replace("-", "_");
    }
}

console.log(drink)

if (drink === undefined) {
    console.log(`The drink of the day is... soberity! jk, We couldn't find ${drink}`);
    process.exit(0);
}

async function getDrinks(arg) {
//   return axios
//     .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita', {
//       headers: {'Accept-Encoding': 'gzip,deflate,compress'},
//     })
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(err => {
//       console.log(err);
    //     });
    let res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${arg}`)
    let {strDrink, idDrink, strInstructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7} = res.data.drinks[0];
    console.log(strDrink)
    const content = {
        [strDrink]: {
            idDrink,
            strInstructions,
            ingredients: [
                {
                    strIngredient1,
                    strMeasure1
                },
                {
                    strIngredient2,
                    strMeasure2
                },
                {
                    strIngredient3,
                    strMeasure3
                },
                {
                    strIngredient4,
                    strMeasure4
                },
                {
                    strIngredient5,
                    strMeasure5
                },
                {
                    strIngredient6,
                    strMeasure6
                },
                {
                    strIngredient7,
                    strMeasure7
                },
            ]
        }
    }


    fs.writeFile(path.join(__dirname, 'data', 'drink.json'), JSON.stringify(content, null, 4), (err, file) => {
        if (err) { 
            console.error(err);
            process.exit(0);
        }

        console.log('File updated!')
    })
}

 getDrinks(drink);
