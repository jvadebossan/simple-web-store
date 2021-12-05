menu_button = document.getElementsByClassName('menu_icon')[0]
menu = document.getElementsByClassName('menu_mobile')[0]
body = document.getElementsByTagName('body')[0]
bar1 = document.getElementsByClassName('menu_bar')[0]
bar2 = document.getElementsByClassName('menu_bar')[1]
bar3 = document.getElementsByClassName('menu_bar')[2]

menu_button.addEventListener('click', () => {
    menu.classList.toggle('active')
    menu_button.classList.toggle('rotate')
    bar2.classList.toggle('some')
})

menu.addEventListener('click', () => {
    menu.classList.remove('active')
    menu.classList.remove('rotate')
})