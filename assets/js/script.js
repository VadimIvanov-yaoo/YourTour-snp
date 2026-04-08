import '../styles/styles.scss'

const links = document.querySelectorAll('.find-tour__list-link')

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    links.forEach((el) => el.classList.remove('find-tour__list-link-active'))
    link.classList.add('find-tour__list-link-active')
  })
})

const header = document.querySelector('.header')
const logo = document.getElementById('logo')
const height = 450
let isFixed = false

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY
  if (scrollPosition >= height && !isFixed) {
    header.classList.add('header-fixed')
    header.classList.remove('header-hide')
    requestAnimationFrame(() => {
      header.classList.add('header-show')
    })
    logo.src = '/logo-black.svg'
    isFixed = true
  }

  if (scrollPosition < height && isFixed) {
    header.classList.remove('header-show')
    header.classList.add('header-hide')

    setTimeout(() => {
      header.classList.remove('header-fixed', 'header-hide')
      logo.src = '/logo.svg'
    }, 250)

    isFixed = false
  }
})

//validation
const phoneInput = document.getElementById('phone')
phoneInput.addEventListener('focus', (e) => {
  if (!e.target.value) {
    e.target.value = '+7 ('
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

function validatePhone(value) {
  if (value.startsWith('7')) {
    value = value.substring(1)
  }
  value = value.substring(0, 10)
  let formattedTel = ''

  if (value.length > 0) {
    formattedTel += '+7 (' + value.substring(0, 3)
  }
  if (value.length >= 4) {
    formattedTel += ') ' + value.substring(3, 6)
  }
  if (value.length >= 7) {
    formattedTel += '-' + value.substring(6, 8)
  }
  if (value.length >= 9) {
    formattedTel += '-' + value.substring(8, 10)
  }
  return formattedTel
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const validateName = (name) => /^[А-Яа-яЁё\s]+$/.test(name)
const validatePhoneNumber = (phone) =>
  /\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/.test(phone)

document
  .getElementById('tour-form__input__to')
  .addEventListener('input', formattedDate)
document
  .getElementById('tour-form__input__from')
  .addEventListener('input', formattedDate)

phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '')
  e.target.value = validatePhone(value)
})

function validateForm(e) {
  e.preventDefault()
  const dateFromValue = document.getElementById('tour-form__input__from').value
  const dateToValue = document.getElementById('tour-form__input__to').value
  const emailInput = document.getElementById('email').value
  const name = document.getElementById('name').value.trim()
  const phone = document.getElementById('phone').value.trim()
  const select = document.getElementById('tours').value

  if (
    !name ||
    !emailInput ||
    !dateFromValue ||
    !dateToValue ||
    !phone ||
    !select
  ) {
    alert('Введите все поля')
    return
  }

  if (!validateName(name)) {
    alert('Имя должно содержать только русские буквы')
    return
  }

  if (!validateEmail(emailInput)) {
    alert('Некорректный email')
    return
  }

  if (!validatePhoneNumber(phone)) {
    alert('Не правильный формат номера телефона')
    return
  }

  const [fromDay, fromMonth, fromYear] = dateFromValue.split('.')
  const dateFrom = new Date(fromYear, fromMonth - 1, fromDay)

  const [toDay, toMonth, toYear] = dateToValue.split('.')
  const dateTo = new Date(toYear, toMonth - 1, toDay)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (dateFrom < today || dateTo < today) {
    alert('Дата не может быть прошедшей')
    return
  }

  if (dateFrom > dateTo) {
    alert('Значение "Дата от" не должно превышать "Дата до"')
    return
  }
}
document.getElementById('tourForm').addEventListener('submit', function (e) {
  validateForm(e)
})

document.getElementById('submitBtn').addEventListener('click', function (e) {
  validateForm(e)
})
