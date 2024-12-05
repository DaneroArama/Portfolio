const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;
document.querySelector("h1").onmouseover = event => {
    let iteration = 0;

    clearInterval(interval);
    interval = setInterval(() => {
        event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return event.target.dataset.value[index];
                }

                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");

        if(iteration >= event.target.dataset.value.length){
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 50);
}
document.addEventListener("DOMContentLoaded", function() {
    const services = document.querySelectorAll('.service');

    function handleScroll() {
        const triggerBottom = window.innerHeight / 5 * 0.5;

        services.forEach(service => {
            const serviceTop = service.getBoundingClientRect().top;

            if (serviceTop < triggerBottom) {
                service.classList.add('scrolled-past');
            } else {
                service.classList.remove('scrolled-past');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set the effect on page load
});

const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 40;

// const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
const calcValue = (a, b) => (a/b*range-range/2).toFixed(1) // thanks @alice-mx

let timeout;
document.addEventListener('mousemove', ({x, y}) => {
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(y, window.innerHeight);
        const xValue = calcValue(x, window.innerWidth);

        cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

        [].forEach.call(images, (image) => {
            image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
        });

        [].forEach.call(backgrounds, (background) => {
            background.style.backgroundPosition = `${xValue*.45}px ${-yValue*.45}px`;
        })
    })
}, false);

document.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const container = document.querySelector('.home-container'); // Ensure this matches your HTML structure

    if (scrolled > 100) { // Adjust this threshold as needed
        container.classList.add('fading');
    } else {
        container.classList.remove('fading');
    }
    const scale = 1 + (scrolled / 1000); // Change the divisor to adjust sensitivity
    image.style.transform = `scale(${scale})`
});
