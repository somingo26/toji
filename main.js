// جلب العناصر من HTML
let title = document.getElementById('title');
let Pacht = document.getElementById('Pacht'); 
let Pvent = document.getElementById('Pvent');
let Qnt = document.getElementById('Qnt');
let total = document.getElementById('total');
let clas = document.getElementById('clas');
let categori = document.getElementById('categori');
let creat = document.getElementById('creat');
let mode = 'creat';
let index = null;

// دالة حساب الربح الإجمالي
function getTotal() {
    if (Pacht.value !== '' && Pvent.value !== '') {
        let result = parseFloat(Pvent.value) - parseFloat(Pacht.value);
        total.innerHTML = result + ' DH';
    } else {
        total.innerHTML = '';
    }
}

// تحديث المجموع عند تغيير المدخلات
Pacht.oninput = getTotal;
Pvent.oninput = getTotal;

// جلب البيانات من LocalStorage أو إنشاء مصفوفة جديدة
let addProduct = localStorage.dataProduct ? JSON.parse(localStorage.dataProduct) : [];

// دالة إنشاء منتج جديد
creat.onclick = function () {
    let product = {
        name: title.value,
        Price: Pacht.value,
        Pclien: Pvent.value,
        total: total.innerHTML,
    };

    if(mode === 'update'){
        addProduct[index] = product;
        mode = 'creat';
        creat.innerHTML = 'Create';
    } else {
        addProduct.push(product);
    }

    localStorage.dataProduct = JSON.stringify(addProduct);
    clearData();
    redData();
    title.focus();
};

// دالة مسح المدخلات بعد الإضافة
function clearData() {
    title.value = '';
    Pacht.value = '';
    Pvent.value = '';
    total.innerHTML = '';
}

// دالة عرض البيانات في الجدول
function redData() {
    let table = '';
    for (let A = 0; A < addProduct.length; A++) {
        table += `
        <tr>
            <td>${A + 1}</td>
            <td>${addProduct[A].name}</td>
            <td>${addProduct[A].Price}</td>
            <td>${addProduct[A].Pclien}</td>
            <td>${addProduct[A].total}</td>
            <td><button class="update" onclick="updatData(${A})"><i class='bx bx-pencil'></i></button></td>
            <td><button class="delete" onclick="deletData(${A})"><i class='bx bx-trash-alt'></i></button></td>
        </tr>
        `;
    }
    document.getElementById('tybody').innerHTML = table;
}

// عرض البيانات عند تحميل الصفحة
redData();

// دالة حذف البيانات
function deletData(A){
    addProduct.splice(A,1);
    localStorage.dataProduct = JSON.stringify(addProduct);
    redData();
}

// دالة تحديث البيانات
function updatData(A){
    title.value = addProduct[A].name;
    Pacht.value = addProduct[A].Price;
    Pvent.value = addProduct[A].Pclien;
    total.innerHTML = addProduct[A].total;
    creat.innerHTML = 'Update';
    mode = 'update';
    index = A;
}
function getshear(value){
    let table = '';
    for(let i = 0 ; i < addProduct.length ; i++){
        if(addProduct[i].name.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${addProduct[i].name}</td>
                <td>${addProduct[i].Price}</td>
                <td>${addProduct[i].Pclien}</td>
                <td>${addProduct[i].total}</td>
                <td><button class="update" onclick="updatData(${i})"><i class='bx bx-pencil'></i></button></td>
                <td><button class="delete" onclick="deletData(${i})"><i class='bx bx-trash-alt'></i></button></td>
            </tr>
            `;
        }
    }
    document.getElementById('tybody').innerHTML = table;
}
