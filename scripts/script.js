const apiload = async(key=0) => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
        const data = await res.json();
        display(data.data.tools,key);
    }
    catch (error) {
        console.log(error);
    }
}

const display = (data,key=0) => {
    let newArray;
    if(key === 0){
        newArray = Array.prototype.slice.call(data, 0, 6);
    }else{
        newArray = data;
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
                    <div class="rounded-circle text-center pt-1 position-absolute"
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

apiload()


