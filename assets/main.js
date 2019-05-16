function headerNavBar() {
    let btn = document.querySelector('.menu_btn'),
        header = document.querySelector('header')
    btn.addEventListener('click', function (e) {
        this.classList.toggle('active');
        header.classList.toggle('open')
    })
}
headerNavBar()