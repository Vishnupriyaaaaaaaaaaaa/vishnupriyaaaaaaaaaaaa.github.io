const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const counter = document.getElementById("counter");

let current = 0;


function updateBook(){

    pages.forEach((page,index)=>{

        page.classList.remove(
            "front",
            "back",
            "current"
        );


        if(index < current){

            page.classList.add("back");

        }
        else if(index === current){

            page.classList.add("current");

        }
        else{

            page.classList.add("front");

        }

    });


    counter.innerText =
    `${current+1} / ${pages.length}`;


}



nextBtn.addEventListener("click",()=>{


    if(current < pages.length-1){

        current++;

        updateBook();

    }


});



prevBtn.addEventListener("click",()=>{


    if(current > 0){

        current--;

        updateBook();

    }


});





function goPage(number){

    current = number;

    updateBook();

}




document.addEventListener(
"keydown",
(e)=>{


if(e.key==="ArrowRight" && current < pages.length-1){

current++;

updateBook();

}


if(e.key==="ArrowLeft" && current >0){

current--;

updateBook();

}


});



updateBook();
