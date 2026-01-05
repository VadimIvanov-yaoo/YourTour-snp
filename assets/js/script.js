import '../styles/styles.scss'

const links = document.querySelectorAll(
  '#tour__link1, #tour__link2, #tour__link3, #tour__link4, #tour__link5'
)
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    links.forEach((el) => el.classList.remove('tour__list-link-active'))
    link.classList.add('tour__list-link-active')
  })
})

const header = document.querySelector('.header')
const headerHeight = header.offsetHeight
const height = 450

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY

  if (scrollPosition >= height) {
    header.classList.add('header-fixed')
    document.body.style.paddingTop = headerHeight + 'px'
  } else {
    header.classList.remove('header-fixed')
    document.body.style.paddingTop = '0'
  }
})

//validation

document.getElementById('tourForm').addEventListener('submit', function(e) {
  const dateFrom = document.getElementById("tour-form__input__from").value;
  const dateTo = document.getElementById("tour-form__input__to").value;

  if(dateFrom > dateTo) {
    alert(`Значение "Дата от" не должно превышать "Дата до"`);
    e.preventDefault();
  }
});
