// 登录账户名
function nickname(obj) {
    var f = /^((1[3 5 7 8]\d{9})|(\w{2,8}@[a-z A-Z 0-9]{3,6}.com))$/.test(obj.value)
    message(f, obj)
}
// 输入密码
var psw;

function psw(obj) {
    psw = obj.value;
    var f = /^[0-9 a-z A-Z]{8,10}$/.test(obj.value);
    message(f, obj)
}
// 重复输入密码
function reusepsw(obj) {
    var f = obj.value == psw;
    message(f, obj);
}
// 提交注册
function checkSubmit() {
    var inps = document.getElementsByClassName("inp");
    var inp = inps[0].querySelectorAll("input[type=text]");
    var count = 0; //记录正确的个数
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].style.borderColor == "chartreuse") {
            count++;
        }
    }
    if (count == inp.length) {
        // 获得request对象

        function getRequest() {
            if (window.XMLHttpRequest) { //判断浏览器中是否存在这个对象
                return new XMLHttpRequest();
            } else {
                return new ActiveXObject("Microsoft.XMLHTTP"); //IE6 IE5 的浏览器这样使用
            }
        }
        // 发送注册数据
        var httpRequest = getRequest();
        var username = document.querySelector(".inp input:nth-of-type(1)").value;
        var password = document.querySelector(".inp input:nth-of-type(2)").value;
        httpRequest.open("GET", "http://192.168.0.254:8888/regsterUser?username=" + username + "&password=" + password);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var t = httpRequest.responseText;
                console.log(t);
                if (t == 1) {
                    alert('注册成功');
                    location.href = 'login.html';
                }
            }
        }
        httpRequest.send();

    } else {
        alert('保证每一项都填写正确在提交')
    }
}
// 提示信息
function message(result, obj) {
    if (result) {
        obj.style.borderColor = 'chartreuse'
    } else {
        obj.style.borderColor = 'red';
    }
}