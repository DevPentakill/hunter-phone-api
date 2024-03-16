//Creating a function that will fetch data from PH server
const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    //putting all the phones information in a variable called phones
    const phones = data.data;
    // console.log(phones);
    //passing that variable to the display method, this will
    displayPhones(phones);
}
//calling the loadphone function with every time website reload/load
loadPhone();

const displayPhones = (phones) =>{

    //Step 1 using dom to catch the empty container of HTML
    const phoneContainer = document.getElementById('phone-container');
    // console.log(phones);
    phones.forEach((phone,index) => {
        console.log(phone);
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
            <button class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `
        //step 4 Appending it to the empty container in HTML
        phoneContainer.appendChild(phoneCard);

    });
}