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
