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
    document.querySelector('.backgroundWrapper').style.paddingTop =
      headerHeight + 'px'
  } else {
    header.classList.remove('header-fixed')
    document.querySelector('.backgroundWrapper').style.paddingTop = '0'
  }
})

function formattedDate(e) {
  const MAX_DAY = 31
  const MAX_MONTH = 12
  const MAX_YEAR = 9999
  const digits = e.target.value.replace(/\D/g, '').slice(0, 8)

  let day, month, year

  if (digits.length >= 1) {
    day = digits.slice(0, 2)
    if (day.length === 2 && parseInt(day, 10) > MAX_DAY) day = MAX_DAY
  }

  if (digits.length >= 3) {
    month = digits.slice(2, 4)
    if (month.length === 2 && parseInt(month, 10) > MAX_MONTH) month = MAX_MONTH
  }

  if (digits.length >= 5) {
    year = digits.slice(4, 8)
    if (year.length === 4 && parseInt(year, 10) > MAX_YEAR) year = MAX_YEAR
  }

  let formatted = day
  if (month) formatted += '.' + month
  if (year) formatted += '.' + year

  if (typeof formatted === 'undefined') formatted = ''
  e.target.value = formatted
}

document
  .getElementById('tour-form__input__to')
  .addEventListener('input', formattedDate)
document
  .getElementById('tour-form__input__from')
  .addEventListener('input', formattedDate)

//validation
document.getElementById('tourForm').addEventListener('submit', function (e) {
  const dateFrom = document.getElementById('tour-form__input__from').value
  const dateTo = document.getElementById('tour-form__input__to').value

  if (dateFrom > dateTo) {
    alert(`Значение "Дата от" не должно превышать "Дата до"`)
    e.preventDefault()
  }
})
