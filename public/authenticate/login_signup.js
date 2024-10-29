document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem tài khoản mặc định đã được tạo chưa
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};

    // Thêm tài khoản mặc định nếu chưa tồn tại
    const defaultUsername = 'nhom10cntt16b';
    const defaultPassword = 'Nhom10cntt16b';
    if (!users[defaultUsername]) {
        users[defaultUsername] = {
            username: defaultUsername,
            password: defaultPassword,
            fullname: 'Nhom10 CNTT16B',
            email: 'nhom10cntt16b@gmail.com'
        };
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Kiểm tra người dùng có đăng nhập hay không
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const logoutBtn = document.getElementById('logoutBtn');
    const accoutname = document.getElementById('accoutname');

    // Hiển thị tên người dùng và nút Logout nếu đã đăng nhập
    if (loggedInUser) {
        logoutBtn.style.display = 'block';
        accoutname.innerHTML = `<span>Xin chào, ${loggedInUser.username}</span>`;
    } else {
        logoutBtn.style.display = 'none';
    }

    // Xử lý sự kiện khi nhấn nút Logout
    logoutBtn.addEventListener('click', () => {
        // Xóa dữ liệu người dùng khỏi localStorage
        localStorage.removeItem('loggedInUser'); // Xóa thông tin người dùng đã đăng nhập

        // Optional: Xóa toàn bộ localStorage nếu cần
        // localStorage.clear();

        // Chuyển hướng về trang đăng nhập
        window.location.href = 'authenticate/login_signup.html';
    });
});

// Các hàm đăng ký và đăng nhập ban đầu
document.querySelectorAll('.infor-item .btn').forEach((button) => {
    button.addEventListener('click', () => {
        // Thêm class log-in
        document.querySelector('.container').classList.toggle('log-in');
    });
});

function register(event) {
    event.preventDefault();

    let username = document.getElementById('redUsername').value.trim();
    let password = document.getElementById('regPassword').value.trim();
    let email = document.getElementById('regEmail').value.trim();
    let fullname = document.getElementById('regFullname').value.trim();
    let regMesseger = document.getElementById('regMesseger');

    // Các biểu thức kiểm tra ký tự
    let lowerCaseLeter = /[a-z]/g;
    let upperCaseLeter = /[A-Z]/g;
    let number = /[0-9]/;

    // Kiểm tra nhập đầy đủ chưa
    if (!username || !password || !email || !fullname) {
        regMesseger.innerText = "Vui lòng điền đầy đủ thông tin!";
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
        regMesseger.innerText = "Mật khẩu phải dài ít nhất 8 ký tự";
        return;
    }

    // Kiểm tra có chứa ký tự in thường không
    if (!lowerCaseLeter.test(password)) {
        regMesseger.innerText = "Mật khẩu phải chứa chữ cái thường";
        return;
    }

    // Kiểm tra có chứa ký tự in hoa không
    if (!upperCaseLeter.test(password)) {
        regMesseger.innerText = "Mật khẩu phải chứa chữ in hoa";
        return;
    }

    // Kiểm tra có chứa số không
    if (!number.test(password)) {
        regMesseger.innerText = "Mật khẩu phải chứa một số";
        return;
    }

    let user = {
        username: username,
        password: password,
        fullname: fullname,
        email: email,
    };

    // Lấy danh sách người dùng từ localStorage
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};

    // Kiểm tra tên người dùng đã tồn tại chưa
    if (users[username]) {
        regMesseger.innerText = 'Tên người dùng đã tồn tại!';
    } else {
        users[username] = user;

        // Lưu danh sách người dùng vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        regMesseger.innerText = "Đăng ký thành công!";
        regMesseger.style.color = 'blue';
    }
}

function login(event) {
    event.preventDefault();

    let username = document.getElementById('LoginUsername').value.trim();
    let password = document.getElementById('LoginPassword').value.trim();
    let loginMessenger = document.getElementById('login-messenger');

    // Lấy danh sách người dùng từ localStorage
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};

    // Kiểm tra xem người dùng có tồn tại không
    let storedUser = users[username];
    // console.log(storedUser);

    if (storedUser && storedUser.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser))
        window.location.href = '../../public/test1.html';
    } else {
        loginMessenger.innerText = "Tên người dùng hoặc mật khẩu không hợp lệ!";
        loginMessenger.style.color = "red";
    }
}
