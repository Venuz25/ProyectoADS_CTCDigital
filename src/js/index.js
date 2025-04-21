const images = document.querySelectorAll('.carrusel-image');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let current = 0;

function showSlide(index) {
  images.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  images[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

leftArrow.addEventListener('click', () => {
  const newIndex = (current - 1 + images.length) % images.length;
  showSlide(newIndex);
});

rightArrow.addEventListener('click', () => {
  const newIndex = (current + 1) % images.length;
  showSlide(newIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});
