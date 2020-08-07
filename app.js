/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 * 
 *
 */
function addKitten(event) {
  event.preventDefault()
  let form= event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: 6,
    mood:"Anxious",
  }
  kittens.push(kitten)
  saveKittens()
  form.reset()
}

/** 
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/** 
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""

  kittens.forEach(kitten => {
    template += `
    <div id= "${kitten.id}" class= "m-1 container card space-between ${kitten.mood}">

      <div class= "text-center text-hand" >
        ${kitten.name}
      </div>
      <div class= "m-1">
      <image src="http://robohash.org/${kitten.name}?set=set4" alt="Yikes dog!" class= "kitten ${kitten.mood} img" >
      </div>
      <div class = "card text-center">
        Mood:
        ${kitten.mood}
      </div>
      <div class= "card space-between d-flex justify-content-center">
      <button id= "${kitten.id}" class= "m-1 btn ${kitten.mood}" onclick= pet('${kitten.id}')> Pet </button>
      <button id= "${kitten.id}" class= "m-1 btn ${kitten.mood}" onclick= catnip('${kitten.id}')> Catnip </button>
      <button id= "${kitten.id}" class= "m-1 btn" onclick= abandon('${kitten.id}')> Abandon </button>
      </div>
    </div>`
  })

  document.getElementById("kittens").innerHTML = template
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id){
  let activeCat = findKittenById(id)
  let randnum = Math.random()
  if (randnum > .7) {
    activeCat.affection++;
    setKittenMood(id)
    saveKittens()
  }
  else {
    activeCat.affection--;
  }

  console.log(activeCat)
  
    saveKittens()
}

function abandon(id){
  let activeCat = findKittenById(id)
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1){throw new Error("Catastorphy")
}
kittens.splice(index, 1)
saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let activeCat = findKittenById(id)
  activeCat.affection = 5
  activeCat.mood = "Tolerant"
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * 
 */
function setKittenMood(id) {
  let activeCat = findKittenById(id)
  if (activeCat.affection > 6) {activeCat.mood = 'Happy'}
  if (activeCat.affection <= 5) {activeCat.mood = 'Tolerant'}
  if (activeCat.affection <= 3) {activeCat.mood = 'Angry'}
  if (activeCat.affection <= 0) {activeCat.mood = 'Gone'}

}

function getStarted(event) {
  event.preventDefault()
  document.getElementById("welcome").remove();
  loadKittens();
  drawKittens();

}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
