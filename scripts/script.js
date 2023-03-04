const apiload = async(key=0,sort=0) => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
        const data = await res.json();
        display(data.data.tools,key,sort);
    }
    catch (error) {
        console.log(error);
    }
}

const display = (data,key=0,sort=0) => {

    let newArray;
    if(key === 0){
        newArray = Array.prototype.slice.call(data, 0, 6);
    }else{
        newArray = data;
    }
    if(sort !== 0){
        newArray.sort(function(a, b) {
            const first = new Date(a.published_in);
            const second = new Date(b.published_in);
            return first - second;
          });
    }else{
        console.log("unsorted");
    }

    const container = document.getElementById("container");
    container.innerHTML = "";
    newArray.forEach(element => {
        const newCardContainer = document.createElement("div");
        newCardContainer.classList.add('card','px-3', 'py-4', 'm-3' ,'position-relative');
        newCardContainer.style.width = "25rem";
        newCardContainer.innerHTML = `<img src=${element.image}
                                                class="mx-auto card-img-top rounded" alt="..." style=height:205px;>
                   <p class="h4 bold mt-4">Features</p>`
                    // <ol class="features" style="font-size: 14px;">
                    // </ol>
        newOl = document.createElement("ol");
        newOl.style.fontSize = "14px";
        for(const i in element.features){
            list = document.createElement("li");
            list.innerHTML += `${element.features[i]}`;
            newOl.appendChild(list);
        }
        newCardContainer.appendChild(newOl);
        newCardContainer.innerHTML += `<hr class="my-0">
                    <p class="mt-4" style="font-weight: 700; font-size: 22px;">${element.name}</p>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center" style="width: max-content;">
                            <img src="./resources/calender.png" style="width:20px;" alt="">
                            <h1 class="h6 ms-2 m-0" style="color:#585858;">${element.published_in}</h1>
                        </div>
                    </div>
                    <div onClick="detailApi(${element.id})" class="rounded-circle text-center pt-1 position-absolute"
                            style="height: 32px; width:32px; background-color: #EB575720; right:22px; bottom:44px; padding-left: 2px;"
                                    role="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i class="fa-solid fa-arrow-right" style="color:#EB5757"></i>
                    </div>`
        container.appendChild(newCardContainer);
        })
    }

    document.getElementById("show-more").addEventListener('click', function(){
        document.getElementById('show-more').classList.add("d-none");
        apiload(1)
    });
    document.getElementById("sort-by-date").addEventListener('click', function(){
        document.getElementById('show-more').classList.add("d-none");
        apiload(1,1)
    })




    // single data details
const detailApi = async(id) =>{
    try {
        url = `https://openapi.programming-hero.com/api/ai/tool/${id.toString().padStart(2, '0')}`;
        const res = await fetch(url);
        const data = await res.json();
        loadDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const loadDetails = (data) =>{
    const description = document.getElementById("card-description");
    const image = document.getElementById("card-image");
    const demoHeading = document.getElementById("demo-heading");
    const demoResponse = document.getElementById("demo-response");
    const accuracy = document.getElementById("accuracy");
    description.innerText = data.description;

    //plan & pricing
    
    console.log(data.pricing);
    const price = document.getElementById("price1");
    const price2 = document.getElementById("price2");
    const price3 = document.getElementById("price3");
    const plan1 = document.getElementById("plan1");
    const plan2 = document.getElementById("plan2");
    const plan3 = document.getElementById("plan3");

    if(data.pricing !== null){
        price.innerText = data.pricing[0].price;
        price2.innerText = data.pricing[1].price;
        price3.innerText = data.pricing[2].price;
        plan1.innerText = data.pricing[0].plan;
        plan2.innerText = data.pricing[1].plan;
        plan3.innerText = data.pricing[2].plan;
    }else{
        price.innerText = "Free of Cost";
        price2.innerText = "Free of Cost";
        price3.innerText = "Free of Cost";
        plan1.innerText = "";
        plan2.innerText = "";
        plan3.innerText = "";
    }

    // features

    features = document.getElementById("features");
    features.innerHTML = "";
        for(let i in data.features){
            newInt = document.createElement("li");
            newInt.style.fontSize = "14px";
            newInt.innerText = data.features[i].feature_name;
            features.appendChild(newInt);
        }

    // integrations
    integrations = document.getElementById("integrations");
    integrations.innerHTML = "";
    if(data.integrations){
        for(let i in data.integrations){
            newInt = document.createElement("li");
            newInt.style.fontSize = "14px";
            newInt.innerText = data.integrations[i];
            integrations.appendChild(newInt);
        }
    }else{
        newInt = document.createElement("p");
        newInt.style.fontSize = "14px";
        newInt.innerText = "No Data Found";
        integrations.appendChild(newInt);
    }
    image.src = `${data.image_link[0]}`;
    if(data.input_output_examples === null){        
        demoHeading.innerText = "Can you give any example?";
        demoResponse.innerText = "No! Not yet! Take a break!!!";
    }else{
    demoHeading.innerText = data.input_output_examples[0].input;
    demoResponse.innerText = data.input_output_examples[0].output;   
    }
    if(!data.accuracy.score){
        accuracy.classList.add("d-none");
    }else{
        accuracy.innerText = `${data.accuracy.score*100}%`;
        accuracy.classList.remove("d-none");
    }
}
apiload()


