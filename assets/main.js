function headerNavBar() {
    let btn = document.querySelector('.menu_btn'),
        header = document.querySelector('header')
    btn.addEventListener('click', function (e) {
        this.classList.toggle('active');
        header.classList.toggle('open')
    })
}
headerNavBar()

// function changeimg(link, e) {
//     link = document.getElementById("img").src;
//     var nodes = document.getElementById("thumb_img");
//     var img_child = nodes.children;
//     for (i = 0; i < img_child.length; i++) {
//         img_child[i].classList.remove('active')
//     }
//     console.log('opa')
//     e.classList.add('active');
//
// }

function opa() {
    let items = document.querySelectorAll('.carousel--items img'),
        selected = document.querySelector('.carousel--selected img');
    items.forEach(function (currentValue, index) {
        let url = currentValue.src;
        currentValue.addEventListener('click', function (e) {
            selected.src = this.src;
        })
    })
}
opa()