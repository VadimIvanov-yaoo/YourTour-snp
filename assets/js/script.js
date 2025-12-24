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
const header__link = document.querySelector('.header__link')
const a = 450

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY

  if (scrollPosition >= a) {
    header.classList.add('header-fixed')
    header.classList.add('header__link-fixed')
  } else {
    header.classList.remove('header-fixed')
  }
})
