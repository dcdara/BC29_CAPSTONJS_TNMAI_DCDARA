
const cart = new Cart();
// const service = new Services();
const getEle = (id) => {
    return document.getElementById(id);
}

const getProduct = () => {
    ProductService.getListProductAPI()
        .then((products) => {
            render(products);
        })
        .catch(console.log);
};


const render = (products) => {
    const items = getEle("listProduct");

    items.innerHTML = products.reduce((content, product) => {
        return (
            content +
            `
        <div class="card__item col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card card__image product-under">
            <div class="card__image--hover">
                <img id="txtImage" class="card-img-top product__img" src="${product.hinhAnh}" alt="Card image">
            </div>
            <div class="card-body">
                <h6 id="txtName" class="text-center product__name">${product.tenSP}</h6>
                <h4 id="txtPrice" class="text-center product__price">${product.gia}</h4>
                <p id="txtDesc" class="card-text text-center">${product.moTa}
            </div>
            <button class="btn btn-success" onclick ="addToCart(${product.id})">ADD TO CART</button>
        </div>
        
</div>
        `
        );
    }, "");
};

const typeIphone = () => {
    let contentHTML = "";
    ProductService.getListProductAPI()
        .then((product) => {
            let arrSamsung = product;
            arrSamsung.forEach((product) => {
                if (product.type === "Iphone") {
                    contentHTML += `
                    <div id ="buyItems" class="card__item col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                    <div class="card card__image product-under">
                        <div class="card__image--hover">
                            <img id="txtImage" class="card-img-top product__img" src="${product.hinhAnh}" alt="Card image">
                        </div>
                        <div class="card-body">
                            <h6 id="txtName" class="text-center product__name">${product.tenSP}</h6>
                            <h4 id="txtPrice" class="card-title text-center product__price">${product.gia}</h4>
                            <p id="txtDesc" class="card-text text-center">${product.moTa}
                        </div>
                        <button class="btn btn-success" onclick ="addToCart(${product.id})">ADD TO CART</button>

                    </div>
            </div>
        `;
                }
            })
            getEle("listProduct").innerHTML = contentHTML;
        })
        .catch((error) => {
            console.log(error);
        });
}
const typeSamsung = () => {
    let contentHTML = "";
    ProductService.getListProductAPI()
        .then((product) => {
            let arrSamsung = product;
            arrSamsung.forEach((product) => {
                if (product.type === "Samsung") {
                    contentHTML += `
                    <div id ="buyItems" class="card__item col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                    <div class="card card__image product-under">
                        <div class="card__image--hover">
                            <img id="txtImage" class="card-img-top product__img" src="${product.hinhAnh}" alt="Card image">
                        </div>
                        <div class="card-body">
                            <h6 id="txtName" class="text-center product__name">${product.tenSP}</h6>
                            <h4 id="txtPrice" class="card-title text-center product__price">${product.gia}</h4>
                            <p id="txtDesc" class="card-text text-center">${product.moTa}
                        </div>
                        <button class="btn btn-success" onclick ="addToCart(${product.id})">ADD TO CART</button>

                    </div>
            </div>
        `;
                }
            })
            getEle("listProduct").innerHTML = contentHTML;
        })
        .catch((error) => {
            console.log(error);
        });
}

const selectType = () => {
    let select = getEle("type").value;
    if (select === "Iphone") {
        typeIphone();
    } else if (select === "Samsung") {
        typeSamsung();
    } else {
        getProduct();
    }
}


const addToCart = (productId, quantity = 1) => {
    ProductService.getProductAPI(productId)
        .then((product) => {
            const cartItem = new CartItem(product);
            cart.updateCartItem(cartItem, quantity);
            renderCart();
        })
        .catch(console.log);
};

const updateCartItemQuantity = (productId, quantity = 1) => {
    ProductService.getProductAPI(productId)
        .then((product) => {
            const cartItem = new CartItem(product);
            cart.updateCartItem(cartItem, quantity);
            renderCart();
        })
        .catch(console.log);
};

const renderCart = () => {
    const cartNumber = getEle("total-qty");
    const cartModalBody = getEle("renderCart");

    cartNumber.textContent = cart.cartItems.reduce(
        (number, cartItem) => number + cartItem.quantity, 0); // update cart item number

    cartModalBody.innerHTML = cart.cartItems.reduce((content, cartItem) => {
        return (
            content +=
            `
        <tr>
                <th scope="row">
                  <img class="img__cart"
                    src="${cartItem.product.hinhAnh}" alt=""></th>
                <td>${cartItem.product.tenSP}</td>
                <td>$${cartItem.product.gia}</td>
                <td><button class="btn btn-outline-danger" onClick="updateCartItemQuantity(${cartItem.product.id}, -1)">-</button>
                <span class="d-block d-sm-inline">${cartItem.quantity}</span>
                <button class="btn btn-outline-primary" onClick="updateCartItemQuantity(${cartItem.product.id})">+</button></td>
                <td></td>
                <td><i class="fa-solid fa-trash"></i></td>
              </tr>
        `
        );
    }, "");
};
getProduct();
