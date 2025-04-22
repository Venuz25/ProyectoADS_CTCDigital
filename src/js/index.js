const items = document.querySelectorAll('.carrusel-item');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let current = 0;

function showSlide(index) {
  items.forEach(item => item.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  items[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

leftArrow.addEventListener('click', () => {
  const newIndex = (current - 1 + items.length) % items.length;
  showSlide(newIndex);
});

rightArrow.addEventListener('click', () => {
  const newIndex = (current + 1) % items.length;
  showSlide(newIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});
