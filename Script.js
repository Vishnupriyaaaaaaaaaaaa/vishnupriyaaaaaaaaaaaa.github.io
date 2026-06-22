const pages = document.querySelectorAll(".page");

const next = document.getElementById("next");
const prev = document.getElementById("prev");

const counter = document.getElementById("counter");


let current = 0;



function showPage(index){


if(index < 0 || index >= pages.length)
return;



pages[current].classList.remove("active");


current=index;


pages[current].classList.add("active");



counter.innerText =
`${current+1} / ${pages.length}`;


}




next.onclick=()=>{

showPage(current+1);

}



prev.onclick=()=>{

showPage(current-1);

}




function goPage(num){

showPage(num);

}




document.addEventListener(
"keydown",
(e)=>{


if(e.key==="ArrowRight")
showPage(current+1);



if(e.key==="ArrowLeft")
showPage(current-1);


});





let startX=0;


document.addEventListener(
"touchstart",
(e)=>{

startX=e.touches[0].clientX;

});



document.addEventListener(
"touchend",
(e)=>{


let endX=e.changedTouches[0].clientX;


if(startX-endX>50)
showPage(current+1);



if(endX-startX>50)
showPage(current-1);



});
