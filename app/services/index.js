function Servcies() {
  this.getListProductApi = function () {
    return axios({
      url: "https://62ade255b735b6d16a3b84a1.mockapi.io/Products",
      method: "GET",
    });
  };

  this.deleteProductApi = function (id) {
    return axios({
      url: `https://62ade255b735b6d16a3b84a1.mockapi.io/Products/${id}`,
      method: "DELETE",
    });
  };

  this.addProductApi = function (product) {
    return axios({
      url: "https://62ade255b735b6d16a3b84a1.mockapi.io/Products",
      method: "POST",
      data: product,
    });
  };

  this.getProductById = function (id) {
    return axios({
      url: `https://62ade255b735b6d16a3b84a1.mockapi.io/Products/${id}`,
      method: "GET",
    });
  };

  this.updateProductApi = function (product) {
    return axios({
      url: `https://62ade255b735b6d16a3b84a1.mockapi.io/Products/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
