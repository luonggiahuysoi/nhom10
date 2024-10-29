const products = document.querySelector(".row");

window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

    if (loggedInUser) {
        document.getElementById('accoutname').innerText = loggedInUser.username;
        document.querySelector(".header__account i").className = 'fa fa-sign-in-alt';
    }
})

// Hàm bất đồng bộ
const getData = async () => {
    // ? link đến file Json
    const respone = await fetch("data.json");

    const data = await respone.json()
    // console.log(data)

    if (data) {
        // xoa dữ liệu cũ thay thế dữ liệu mới
        products.innerHTML = data.map((item) => {
            return `
            <div class="product-item">
                <img src="${item.image}" alt="">
                <div class="product-infor">
                    <h2 class="product-name">${item.name}</h2>
                    <p class="product-title">${item.title}</p>

                    <a href="./page/detail/detail.html?id=${item.id}" class="btn-views">Views</a>
                </div>
            </div>
            `
        }).join('');
    }
}

getData()  