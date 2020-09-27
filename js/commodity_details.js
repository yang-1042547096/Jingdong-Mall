// 将本地存储的值给本页面
var merchandise = JSON.parse(localStorage.getItem("merchandise_arr"));
//获取商品本地存储信息
document.getElementById('item_name').innerHTML = merchandise[0].name;
document.getElementById('discount-price').innerHTML = merchandise[0].price;
document.getElementById('content_left').src = merchandise[0].img;

// 加入购物车
function add_cart() {
    // 获取当前商品的信息
    var item_name = document.getElementById('item_name').innerHTML;
    var item_price = document.getElementById('discount-price').innerHTML;
    var item_img = document.getElementById('content_left').src;
    if (localStorage.getItem("username_password")) { //判断是否登录
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

    } else { //未登录
        var o = prompt('你未登录，是否登录？请填是或否');
        if (o == '是') {
            location.href = 'login.html';
        }
    }
}