const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const aboutCarousel = document.getElementById("aboutCarousel");
const carouselTrack = aboutCarousel.querySelector(".carousel-track");
const carouselSlides = aboutCarousel.querySelectorAll(".carousel-slide");
const carouselDots = aboutCarousel.querySelectorAll(".carousel-dot");
let currentSlide = 0;
let carouselTimer;

function showSlide(slideIndex) {
  currentSlide = (slideIndex + carouselSlides.length) % carouselSlides.length;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  carouselDots.forEach((dot, index) => {
    const isActive = index === currentSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => showSlide(currentSlide + 1), 4500);
}

aboutCarousel.querySelector(".carousel-button-prev").addEventListener("click", () => {
  showSlide(currentSlide - 1);
  startCarousel();
});

aboutCarousel.querySelector(".carousel-button-next").addEventListener("click", () => {
  showSlide(currentSlide + 1);
  startCarousel();
});

carouselDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startCarousel();
  });
});

aboutCarousel.addEventListener("mouseenter", () => clearInterval(carouselTimer));
aboutCarousel.addEventListener("mouseleave", startCarousel);
aboutCarousel.addEventListener("focusin", () => clearInterval(carouselTimer));
aboutCarousel.addEventListener("focusout", event => {
  if (!aboutCarousel.contains(event.relatedTarget)) startCarousel();
});

startCarousel();

const dateInput = document.getElementById("date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

dateInput.min = localToday;

document.getElementById("evaluationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = new FormData(this);
  const name = form.get("name");
  const phone = form.get("phone");
  const date = form.get("date");
  const time = form.get("time");
  const goal = form.get("goal");

  const formattedDate = date.split("-").reverse().join("/");

  // TROQUE pelo número de WhatsApp do studio, com DDI + DDD.
  // Exemplo: 5598999999999
  const whatsappNumber = "5598999999999";

  const message =
    `Olá! Quero agendar uma avaliação na TH GYM.%0A%0A` +
    `Nome: ${name}%0A` +
    `WhatsApp: ${phone}%0A` +
    `Data desejada: ${formattedDate}%0A` +
    `Horário: ${time}%0A` +
    `Objetivo: ${goal}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
});
