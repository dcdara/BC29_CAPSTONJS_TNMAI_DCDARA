var service = new Servcies();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function editProduct(id) {
  console.log(id);
  //Sửa lại title modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Sản Phẩm";

  //Thêm nút "Update" vào footer modal
  var footer = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  //getProductById
  service
    .getProductById(id)
    .then(function (result) {
      //show thông tin ra các thẻ input
      getEle("TenSP").value = result.data.tenSP;
      getEle("GiaSP").value = result.data.gia;
      getEle("screen").value = result.data.screen;
      getEle("backCamera").value = result.data.backCamera;
      getEle("frontCamera").value = result.data.frontCamera;
      getEle("hinhSP").value = result.data.hinhSP;
      getEle("MoTa").value = result.data.moTa;
      getEle("type").value = result.data.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getListProducts() {
  service
    .getListProductApi()
    .then(function (result) {
      renderListProducts(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProducts();


function renderListProducts(data) {
  var contentHTML = "";
  data.forEach(function (product, index) {
    // console.log(product);
    contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.tenSP}</td>
            <td>${product.gia}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>
                <img class="img-fluid" src="${product.hinhAnh
      }"  width="50"/>
            </td>
            <td>${product.moTa}</td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="editProduct(${product.id})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id
      })">Xoá</button>
            </td>
            
            
        </tr>
    `;
  });

  getEle("tblDanhSachSP").innerHTML = contentHTML;
}

/**
 * Xoa SP
 */
function deleteProduct(id) {
  service
    .deleteProductApi(id)
    .then(function () {
      //render table
      getListProducts();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").onclick = function () {
  //Sửa lại title modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Sản Phẩm";

  //Thêm nút "Add" vào footer modal
  // nên chỗ này phải truyền vào true để nó chạy cái if
  var footer = `<button class="btn btn-info" onclick="addProduct(true)">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

/**
 * Add Product
 */
function addProduct(isAdd) { // chỗ này mình nhận vào boolean isAdd nè
  var tenSP = getEle("TenSP").value;
  var giaSP = getEle("GiaSP").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var hinhSP = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;
  var type = getEle("type").value;

  var isValid = true;
  //Check validation
  if (isAdd) { // nếu isAdd là true thì chạy
    console.log("ran")
    //TenSP
    // mấy cái biến đâu có _ đằng trước đâu
    isValid &=
      validation.kiemTraRong(tenSP, "errorTenSP", "(*) Vui lòng nhập tên sản phảm") &&
      validation.kiemChuoiKiTu(
        tenSP,
        "errorTenSP",
        "(*) Vui lòng nhập chuỗi ký tự"
      );

    //gia
    isValid &= validation.kiemTraRong(
      giaSP,
      "errorGia",
      "(*) Vui lòng nhập giá"
    );

    //hinhAnh
    isValid &= validation.kiemTraRong(
      hinhSP,
      "errorHinhAnh",
      "(*) Vui lòng nhập hình ảnh"
    );

    //moTa
    isValid &= validation.kiemTraRong(
      moTa,
      "errorMoTa",
      "(*) Vui lòng nhập mô tả"
    );

    //type
    isValid &= validation.kiemTraRong(
      type,
      "errorType",
      "(*) Vui lòng nhập loại"
    );

    //check isValid
    if (!isValid) return;


    //doi tuong product
    var product = new Product("", tenSP, giaSP, screen, backCamera, frontCamera, hinhSP, moTa, type);

    service
      .addProductApi(product)
      .then(function () {
        //render table
        getListProducts();
        //close modal
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

/**
 * Delete Product
 */


/**
 * Update product
 */
function updateProduct(id) {
  var tenSP = getEle("TenSP").value;
  var giaSP = getEle("GiaSP").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var hinhSP = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;
  var type = getEle("type").value;

  var product = new Product(id, tenSP, giaSP, screen, backCamera, frontCamera, hinhSP, moTa, type);

  service
    .updateProductApi(product)
    .then(function () {
      //render table
      getListProducts();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

