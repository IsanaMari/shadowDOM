function headerNavBar() {
    let btn = document.querySelector('.menu_btn');
    btn.addEventListener('click', function (e) {
        this.classList.toggle('active');
    })
}
headerNavBar()