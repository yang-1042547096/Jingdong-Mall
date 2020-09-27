// 判断是否登录
if (localStorage.getItem("username_password")) { //判断是否登录
    document.getElementsByClassName("topbar-nav")[0].getElementsByTagName("a")[0].innerHTML = '你已登录';
} else {
    alert('你未登录');
    location.href = 'login.html';
}

//购物车表格
var car = document.getElementById("car");
var total = 0; //购物车中单据数量
// 获得本地存储
var product_arr = JSON.parse(localStorage.getItem("product_arr"));
// 添加本地存储的商品
for (var i = 0; i < product_arr.length; i++) {
    var row = car.insertRow();
    row.insertCell().innerHTML = "<input type='checkbox' onclick='chooseChecked()'>"
    row.insertCell().innerHTML = '<img src=' + product_arr[i].img + ' >' + '<span id="product_name">' + product_arr[i].name + '</span>';
    row.insertCell().innerHTML = '¥' + '<span>' + product_arr[i].price + '</span>';
    row.insertCell().innerHTML = "<input type='button' value='-' onclick='changeNumber(this," + i + ")'/><input value='" + product_arr[i].number + "'/><input type='button' value='+' onclick='changeNumber(this," + i + ")'/>"
    row.insertCell().innerHTML = '¥' + '<span id="product_subtotal">' + parseInt(product_arr[i].number) * parseInt(product_arr[i].price) + '</span>'
    row.insertCell().innerHTML = "<input type='button' value='删除' onclick='deleteCurrentFood(this," + i + ")'/>"
    total++;
    document.getElementById("totalClass").innerHTML = total;
    // 全部商品
    document.getElementById("all_product").innerHTML = total;
}

// 删除购物车当前行数据
function deleteCurrentFood(obj, i) {
    car = document.getElementById("car");
    car.deleteRow(obj.parentNode.parentNode.rowIndex);
    total--;
    document.getElementById("totalClass").innerHTML = total;

    console.log(i);
    product_arr = JSON.parse(localStorage.getItem("product_arr"));
    product_arr.splice(i, 1);
    localStorage.setItem("product_arr", JSON.stringify(product_arr))
}
// 全选按钮

function selectAllFood(obj) {
    for (var i = 1; i < car.rows.length; i++) {
        car.rows[i].cells[0].firstChild.checked = obj.checked
    }
}

// 全选按钮是否要勾选
function chooseChecked() {
    var t = 0;
    for (var i = 1; i < car.rows.length; i++) {
        if (car.rows[i].cells[0].firstChild.checked) {
            t++;
        }
    }
    // 已选择t件商品
    document.getElementById("totalClass").innerHTML = t;
    document.getElementById("a").checked = t == car.rows.length - 1
}
// 数量的变化
function changeNumber(obj, i) {
    var n = obj.parentNode.children[1]; //数量的文本框
    var t = eval(n.value + obj.value + 1)
    product_arr[i].number = t;
    console.log(product_arr);
    localStorage.setItem("product_arr", JSON.stringify(product_arr))
    // 算小计数量
    if (t > 0) {
        n.value = t;
    }
    console.log(t);
    console.log(product_arr[i].price);
    obj.parentNode.parentNode.cells[4].children[0].innerHTML = t * parseInt(product_arr[i].price);
    if (t == 0) {
        obj.parentNode.parentNode.cells[4].children[0].innerHTML = product_arr[i].price;
    }
}

// 删除选中项
function deleteSelectedFood() {
    for (var i = car.rows.length - 1; i >= 0; i--) {
        if (car.rows[i].cells[0].firstChild.checked) {
            car.deleteRow(i);
            total--;
            // 全部商品
            document.getElementById("all_product").innerHTML = total;

            product_arr.splice(i - 2, 1);
        }
        localStorage.setItem("product_arr", JSON.stringify(product_arr))
    }
}
//结算
function pay() {
    var payPrice = 0;
    for (var i = car.rows.length - 1; i >= 2; i--) {
        if (car.rows[i].cells[0].firstChild.checked) {
            payPrice += parseInt(car.rows[i].cells[4].children[0].innerHTML);
            console.log(i);
            product_arr.splice(i - 2, 1);
            console.log(product_arr);
        }
        localStorage.setItem("product_arr", JSON.stringify(product_arr))
    }
    console.log(product_arr);
    document.getElementById("p").innerHTML = payPrice;
    alert('你将要付款' + payPrice + '元');
}