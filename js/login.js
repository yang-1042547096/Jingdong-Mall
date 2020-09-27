function register() {

    // 获得request对象
    function getRequest() {
        if (window.XMLHttpRequest) { //判断浏览器中是否存在这个对象
            return new XMLHttpRequest();
        } else {
            return new ActiveXObject("Microsoft.XMLHTTP"); //IE6 IE5 的浏览器这样使用
        }
    }
    // 校验数据
    var httpRequest = getRequest();

    // 获取填写的账号
    var username = document.getElementsByClassName("login_name")[0].querySelector("input[type=text]").value;
    // 获取填写的密码
    var password = document.getElementsByClassName("login_psw")[0].querySelector("input[type=text]").value;

    httpRequest.open("GET", "http://192.168.0.254:8888/login?username=" + username + "&password=" + password);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var t = httpRequest.responseText;
            if (t) {
                // 添加本地存储
                localStorage.setItem("username_password", t);
                alert("登录成功");
                location.href = 'index.html';
            } else {
                alert('你的账户或密码错误')
            }
        }
    }
    httpRequest.send();
}
// 去注册
function zhuce() {
    location.href = 'register.html';
}