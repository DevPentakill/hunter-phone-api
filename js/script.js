
//Creating a function that will fetch data from PH server
const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  //putting all the phones information in a variable called phones
  const phones = data.data;
  // console.log(phones);

  //implemented differently than the module system. This will stop the loading animation when the phones are shown
  spinLoader(false);

  //passing that variable to the display method, this will take the phones array and loop through each element and show them in UI
  displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

  //Step 1 using dom to catch the empty container of HTML
  const phoneContainer = document.getElementById('phone-container');
  //clearing all the previosuly loaded phones
  phoneContainer.textContent = '';

  //catching the show all button
  const showAll = document.getElementById('show-btn');

  if (phones.length > 12 && !isShowAll) {
    phones = phones.slice(0, 12);
    showAll.classList.remove('hidden');
  } else {
    showAll.classList.add('hidden');
  }

  phones.forEach((phone, index) => {
    // console.log(phone);

    // Step 2 create empty card
    const phoneCard = document.createElement('div');
    phoneCard.classList = "card w-72 bg-green-100 shadow-xl p-3 m-3";

    //Step 3 setup card content with inner html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="${phone.brand}" />
        </figure>
        <div class="card-body items-center">
          <h2 class="card-title">${phone.phone_name}</h2>

          <p class="text-center">${phone.phone_name} is the best value for money device irl</p>

          <h2 class="font-semibold text-amber-700">BDT ${index}0,000</h2>

          <div class="card-actions justify-center">
            <button onclick="showDeetz('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    //step 1 Appending it to the empty container in HTML
    phoneContainer.appendChild(phoneCard);

  });
  // spinLoader(false);
}

//handeling the search button
const searchClick = (isShowAll) => {
  const searchInput = document.getElementById('searchField');
  const searchText = searchInput.value;
  spinLoader(true);
  loadPhone(searchText, isShowAll);

}

//function to call spinner loader
const spinLoader = (isLoading) => {
  const spinDIv = document.getElementById('spin-load');

  if (isLoading) {
    spinDIv.classList.remove('hidden');
  } else {
    spinDIv.classList.add('hidden');
  }

}

//handling the show all button
const handleShowAll = () => {
  // console.log('angta lagse');
  searchClick(true);
}

//handeling the show details button in the phone cards
const showDeetz = async (slage) => {
  // console.log(slage);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slage}`);
  const data = await res.json();
  const phoneDeetz = data.data;
  displayDeetz(phoneDeetz);
}

//writing a function to display the phone details in the MODAL
const displayDeetz = (phoneDeetz) => {
  console.log(phoneDeetz);
  const phoneDeetzContainer = document.getElementById('show-deetz-container');
  phoneDeetzContainer.innerHTML = `
  <img src="${phoneDeetz.image}" alt="${phoneDeetz.brand}" class="mx-auto">
  <h3 class="font-bold text-lg">${phoneDeetz.name}</h3>
  <p class="py-2 text-sm">Contact Darius to grab this marvelous ${phoneDeetz.name}!</p>
  <p class="py-1 text-base text-slate-500"> <span class ="font-bold text-black">Storage:</span> ${phoneDeetz?.mainFeatures?.storage}</p>
  <p class="py-1 text-base text-slate-500"> <span class ="font-bold text-black">Display Size:</span> ${phoneDeetz?.mainFeatures?.displaySize}</p>
  <p class="py-1 text-base text-slate-500"> <span class ="font-bold text-black">Chipset:</span> ${phoneDeetz?.mainFeatures?.chipSet}</p>
  <p class="py-1 text-base text-slate-500"> <span class ="font-bold text-black">Memory:</span> ${phoneDeetz?.mainFeatures?.memory}</p>
  <p class="py-1 text-base text-slate-500"> <span class ="font-bold text-black">Slug:</span> ${phoneDeetz?.slug}</p>
  <p class="py-1 text-base text-slate-500"> <span class ="font-bold text-black">Release Date:</span> ${phoneDeetz?.releaseDate}</p>
  <p class="py-1 text-base text-slate-500"> <span class ="font-bold text-black">Brand:</span> ${phoneDeetz?.brand}</p>
  <p class="py-1 text-base text-slate-500"> <span class ="font-bold text-black">GPS:</span> ${phoneDeetz?.others?.GPS}</p>
  `;
}
//must use ? to avoid error in case the property doesn't exsit in object while accessing NESTED OBJECT DATA