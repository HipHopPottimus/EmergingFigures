let slideshow = document.getElementsByClassName("slideshow")[0];

let label = slideshow.getAttribute("data-label") != "none";

if(label){
    slideshow.append(slideshow.children[slideshow.childElementCount / 2].cloneNode(true));
    slideshow.insertBefore(slideshow.children[0].cloneNode(true), slideshow.getElementsByClassName("slide-label")[0]);
}


let currentSlide = 0;
let numSlides = slideshow.childElementCount;

if(label) numSlides /= 2;

window.updateTranslation = (instant) => {
    if(instant) slideshow.style.transition = "none";
    else slideshow.style.transition = "";
    slideshow.style.transform = `translateX(${currentSlide * -100}%)`;
    void slideshow.offsetHeight;
};

window.slide = (distance) => {
    currentSlide += distance;
    if(currentSlide >= numSlides){
        currentSlide = 0;
        updateTranslation(true);
        currentSlide += 1;
        updateTranslation();

    }
    else if(currentSlide < 0){
        currentSlide = numSlides - 1;
        updateTranslation(true);
        currentSlide -= 1;
        updateTranslation();
    }
    else updateTranslation();
}