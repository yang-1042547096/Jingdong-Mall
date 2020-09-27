// 获得request对象

function getRequest() {
    if (window.XMLHttpRequest) { //判断浏览器中是否存在这个对象
        return new XMLHttpRequest();
    } else {
        return new ActiveXObject("Microsoft.XMLHTTP"); //IE6 IE5 的浏览器这样使用
    }
}
// 加装IP
var ip = 'http://192.168.0.254:8888/';

// 封装轮播图函数

var httpRequest = getRequest();
httpRequest.open('GET', 'http://192.168.0.254:8888/showImages');
httpRequest.onreadystatechange = function () { //onreadystatechange 每次状态改变所触发事件的事件处理程序
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        var t = httpRequest.responseText;
        var arr = JSON.parse(t) //转化成JS对象
        // 拿到图片地址数组
        console.log(arr);

        //轮播的函数
        // 轮播图
        //轮播图下的点
        var ul = document.getElementById("u");
        for (var i = 0; i < arr.length; i++) {
            var li = document.createElement("li");
            li.index = i;
            li.onmousemove = function () {
                clearInterval(flag); //停止播放
                changeColor(this.index) //原点颜色改变
                document.getElementById("img").src = ip + arr[this.index].img;
            }
            li.onmouseout = function () {
                flag = setInterval(function () {
                    document.getElementById("img").src = ip + arr[count].img;
                    changeColor(count)
                    count++
                    if (count == arr.length) {
                        count = 0;
                    }
                }, 1000);
            }
            ul.appendChild(li)
        }
        // 轮播的函数
        var count = 0;

        function playImg() {
            document.getElementById("img").src = ip + arr[count].img;
            changeColor(count)
            count++
            if (count == arr.length) {
                count = 0;
            }
        }
        // 改变小圆圈的颜色
        function changeColor(n) {
            var lis = document.getElementsByTagName("li");
            for (var i = 0; i < lis.length; i++) {
                if (i == n) {
                    lis[i].style.backgroundColor = "orange";
                } else {
                    lis[i].style.backgroundColor = "#cccccc";
                }
            }
        }
        var flag = setInterval(function () {
            document.getElementById("img").src = ip + arr[count].img;
            changeColor(count)
            count++
            if (count == arr.length) {
                count = 0;
            }
        }, 1000);
    }
}
httpRequest.send();

// 主体详情
function main() {
    var httpRequest = getRequest();
    httpRequest.open('GET', 'http://192.168.0.254:8888/getBooks');
    httpRequest.onreadystatechange = function () { //onreadystatechange 每次状态改变所触发事件的事件处理程序
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var t = httpRequest.responseText;
            var arr = JSON.parse(t) //转化成JS对象
            console.log(arr);
            var item = document.getElementsByClassName('item')
            for (var i = 0; i < item.length; i++) {
                item[i].getElementsByClassName('item_img')[0].src = arr[i].img;
                item[i].getElementsByClassName('item_price')[0].innerHTML = arr[i].price;
                item[i].getElementsByClassName('item_name')[0].innerHTML = arr[i].name;
            }
        }
    }
    httpRequest.send();
}
main()

// 判断是否登录
if (localStorage.getItem("username_password")) { //判断是否登录
    document.getElementsByClassName("topbar-nav")[0].getElementsByTagName("a")[0].innerHTML = '你已登录';
}
// 加入购物车
function add_cart(a, b) {
    // 获取当前商品的信息
    var item_name = b.getElementsByClassName('item_name')[0].innerHTML;
    var item_price = b.getElementsByClassName('item_price')[0].innerHTML;
    var item_img = b.getElementsByClassName('item_img')[0].src;
    if (localStorage.getItem("username_password")) { //判断是否登录
        document.getElementsByClassName("topbar-nav")[0].getElementsByTagName("a")[0].innerHTML = '你已登录';
        var arr_obj = { //把当前信息做成对象
            name: item_name,
            price: item_price,
            img: item_img,
            number: 1
        };
        // 获取本地存储数组字符串，并改成数组
        var product_arr = JSON.parse(localStorage.getItem("product_arr"));

        if (product_arr) { //判断本地是否有所有的商品数组
            // localStorage.getItem("product_arr").indexOf(JSON.stringify(arr_obj));判断数组中是否有此对象
            if (localStorage.getItem("product_arr").indexOf(JSON.stringify(arr_obj)) == -1) { //判断商品数组里面是否有本商品，没有返回-1

                product_arr.push(arr_obj); //把本商品添加数组里去
                localStorage.setItem("product_arr", JSON.stringify(product_arr)) //把数组改成字符串添加到本地存储
            }
        } else {
            //本地存储没有所有商品字符串就添加
            var product_arr = [];
            product_arr.push(arr_obj);
            localStorage.setItem("product_arr", JSON.stringify(product_arr))
            console.log(product_arr);
        }
        alert('已加入购物车');

    } else {
        //未登录
        // 跳转登录页面
        location.href = 'login.html';

    }
}

// 商品详情页面
function merchandise_news(a, b) {
    // 获取当前商品的信息
    var item_name = b.getElementsByClassName('item_name')[0].innerHTML;
    var item_price = b.getElementsByClassName('item_price')[0].innerHTML;
    var item_img = b.getElementsByClassName('item_img')[0].src;
    var merchandise_arr = [{ //把当前信息做成对象
        name: item_name,
        price: item_price,
        img: item_img
    }];
    localStorage.setItem("merchandise_arr", JSON.stringify(merchandise_arr))


    location.href = 'commodity_details.html';
}