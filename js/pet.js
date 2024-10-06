// console.log('pet.js connected')

// load category btn
const loadCategories =async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategoryBtn(data.categories)
}
loadCategories();
// display btn
const displayCategoryBtn =(categories)=>{
    // console.log(categories);
    const buttonContainer =document.getElementById('category-btn')
    categories.forEach(category => {
        // console.log(category)
        // create dynamic btn
    const div =document.createElement('div')
   
    div.innerHTML = `
    <button class="btn w-full lg:w-72 lg:h-20 font-inter  lg:text-2xl lg:px-4 lg:py-2 border rounded-xl"><img class="w-9 h-9 lg:w-14 lg:h-14" src=${category.category_icon}>
    ${category.category}</button>
    `;
    buttonContainer.append(div);
    });

}

// loading spinner
const displaySpinner =() =>{
    document.getElementById('loading').style.display ="flex";

    setTimeout(function() {
        loadAllPets()
    }, 2000)
}
displaySpinner();

// load all pets
const loadAllPets =async() =>{
    document.getElementById('loading').style.display ="none"
    const res =await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data =await res.json()
    displayAllPets(data.pets);
}


// display all pets
const displayAllPets =(pets) =>{
    // console.log(pets);
    const cardContainer =document.getElementById('card-container')
  pets.forEach((pet) =>{
    const {image, breed, date_of_birth, gender, pet_name, price, petId} =pet;
    // console.log(pet)
    const div =document.createElement('div')
    div.innerHTML = `
    <div class="card bg-base-100 border p-3">
                <figure class="rounded-lg lg:w-[300px] lg:h-[200px]">
                  <img
                  class="object-cover w-full h-full"
                    src=${image}
                    alt="dog" />
                </figure>
                <div class="card-body font-lato">
                  <h2 class="card-title font-inter text-title font-extrabold">${pet_name}</h2>
                  <p class="text-para"><i class="fa-solid fa-qrcode mr-2"> </i> Breed: ${breed? `${breed}` :'Not available'}</p>
                  <p class="text-para"><i class="fa-regular fa-calendar mr-2"></i> Birth: ${date_of_birth? `${date_of_birth}` :'Not available'}</p>
                  <p class="text-para"><i class="fa-solid fa-mercury mr-2"></i> Gender: ${gender? `${gender}` : 'Not available'}</p>
                  <p class="text-para"><i class="fa-solid fa-dollar-sign mr-2"></i> Price: <span>${price? `${price} $` : 'Not available'}</span></p>
                  <hr>
                  <div class="flex gap-2 ">
                    <button class="btn "><i class="fa-regular fa-thumbs-up"></i></button>
                    <button class="btn text-btn font-bold">Adopt</button>
                    <button onclick=showDetails('${petId}') class="btn text-btn font-bold">Details</button>
                  </div>
                </div>
                
              </div>
    `;
    cardContainer.append(div);
  })
}

// load single  pet data
const showDetails =async(id)=>{

console.log(id)
const res =await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
const data =await res.json()
console.log(data.petData);
const {image, breed, date_of_birth, gender, pet_name, price, vaccinated_status, pet_details} =data.petData;
// display dynamic modal
const modal= document.getElementById('my_modal_5')
modal.innerHTML =`
    <div class="modal-box">
       <img class="w-full" src=${image}>
       <p class="py-4 font-extrabold font-inter text-2xl">${pet_name}</p>
       <div>
       <div class="flex justify-between font-lato">
       <p class="text-para"><i class="fa-solid fa-qrcode mr-2"> </i> Breed: ${breed? `${breed}` :'Not available'}</p>
       <p class="text-para"><i class="fa-regular fa-calendar mr-2"></i> Birth: ${date_of_birth? `${date_of_birth}` :'Not available'}</p>
        </div>
        <div class="flex justify-between font-lato">
        <p class="text-para"><i class="fa-solid fa-mercury mr-2"></i> Gender: ${gender? `${gender}` : 'Not available'}</p>
        <p class="text-para"><i class="fa-solid fa-dollar-sign mr-2"></i> Price: <span>${price? `${price} $` : 'Not available'}</span></p>
        </div>
        <div>
        <p class="text-para font-lato"> <i class="fa-solid fa-dollar-sign mr-2"></i> Vaccinated status: ${vaccinated_status? `${vaccinated_status}` : 'Not available'}</p>
        </div>
       </div>
       <div class="my-8 font-inter">
        <h2 class="font-bold">Details Information</h2>
        <p class="text-para">${pet_details}</p>
       </div>
       <div class="">
       <form method="dialog">
        
       <button class="btn text-btn w-full font-bold font-lato">Cancel</button>
       </form>
       </div>
    </div>
`


modal.showModal()
}


