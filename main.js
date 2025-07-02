const nav = document.querySelector('nav');
window.addEventListener("scroll",function(){
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("sticky");
    }
    else {
        nav.classList.remove("sticky");
    }
})


function revealFunction() {
    const sr = ScrollReveal({duration:900, distance:'100px', easing:'ease-out'});
    sr.reveal('.reveal_left', {origin:'left', reset:'false'});
    sr.reveal('.reveal_top', {origin:'top',reset:'false' });
    sr.reveal('.reveal_right', {origin:'right', reset:'false'});
}

document.addEventListener('DOMContentLoaded', revealFunction)

