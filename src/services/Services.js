
class ProductService {
    static baseURL = "https://62ade255b735b6d16a3b84a1.mockapi.io/Products";
  
    static getListProductAPI() {
      return fetch(this.baseURL)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    }
  
    static getProductAPI(id) {
      return fetch(`${this.baseURL}/${id}`)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    }
  }
  