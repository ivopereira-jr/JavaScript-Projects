document.querySelector('.randomrecipe').addEventListener('click', getRecipe)
document.querySelector('.back').addEventListener('click', backHome)

let newcontents = document.querySelector('.newrecipe'),
  recipeContents = document.querySelector('.recipe-contents')

newcontents.addEventListener('click', newRecipe)

async function getRecipe() {
  try {
    document.body.classList.remove('back')
    document.body.classList.add('active')

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const data = await response.json()

    return createMeal(data.meals[0])

  } catch (err) {
    console.error(err)
  }

}

let recipeVideo = document.querySelector('.recipe-video iframe')
let recipeName = document.querySelector('.recipe-name h2')
let recipeIngredients = document.querySelector('.recipe-ingredients ul')
let recipePreparation = document.querySelector('.recipe-preparation p')
let recipeImage = document.querySelector('.recipe-img img')

function createMeal(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] != null && meal[`strIngredient${i}`] != "") {
      ingredients.push(`${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`)
    } else {
      break;
    }
  }

  let listIngredients = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')



  let url = meal.strYoutube.replace("watch?v=", "embed/")

  recipeVideo.src = url
  recipeName.innerHTML = meal.strMeal
  recipeIngredients.innerHTML = listIngredients
  recipePreparation.innerHTML = meal.strInstructions
  recipeImage.src = meal.strMealThumb
}


function newRecipe() {
  recipeContents.classList.add('newcontent')

  newcontents.disabled = true
  newcontents.style.cursor = 'not-allowed'

  setTimeout(() => {
    recipeContents.classList.remove('newcontent')

    newcontents.style.cursor = 'pointer'
    newcontents.disabled = false

  }, 2500)

  getRecipe()
}

function backHome() {
  document.body.classList.remove('active')
  document.body.classList.add('back')

  recipeVideo.src = ''

  window.scrollTo(0, 0)
}
