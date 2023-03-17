const add = document.querySelector('.btn-li-add')
const dropCourse = document.querySelector('.dropSection')
const drop = document.querySelector('.btn-li-drop')

add.addEventListener('click', () => {
    dropCourse.classList.remove('nact')
})

drop.addEventListener('click', () => {
    dropCourse.classList.add('nact')
})

// console.log(dropCourse)