function Database() {
    this.productsListKey = "shopping-list-products"
    this.showPreparedListKey = "show-prepared-list"
    this.products = []
    
    this.setShowPreparedList = (value) => {
      try {
        localStorage.setItem(this.showPreparedListKey, value ? "YES" : "NO");
      } catch (e) {
        console.log("setShowPreparedList: An error has occurred: " + e);
      } 
    }

    this.getShowPreparedList = () => {
      try {
        return localStorage.getItem(this.showPreparedListKey) === "YES";
      } catch (e) {
        console.log("setShowPreparedList: An error has occurred: " + e);
        return false;
      } 
    }

    this.loadProducts = () => {
      try { 
        this.products = JSON.parse(localStorage.getItem(this.productsListKey)) || [];

        if(this.products == undefined ||this.products == null || this.products.length == 0) {
            getProducts().forEach(product => {
                this.addProduct(product)
            })
        } 
      } catch(e) {
        alert("Database Error " + e)
      }
    }

    this.saveProducts = (products = this.products) => {
      try {
        localStorage.setItem(this.productsListKey, JSON.stringify(products));
        this.products = products 
      } catch (e) {
        console.log("saveProducts: An error has occurred: " + e);
      } 
    }

    this.findProduct = (identifier) => {
        if (!this.products || !Array.isArray(this.products)) return undefined;
        return this.products.find(product => product.id === identifier);
    }

    this.findProductIndex = (identifier) => {
        if (!this.products || !Array.isArray(this.products)) return -1;
        return this.products.findIndex(product => product.id == identifier);
    }

    this.addProduct = (name) => {
        var newProducts = this.products;
        newProducts.push({
            id: Math.random(),
            name: name,
            selected: false
        }) 

        this.saveProducts(newProducts)
    }

    this.deleteProduct = (identifier) => {
       const newProducts = this.products.filter(product => product.id !== identifier);
       this.saveProducts(newProducts);
       this.print()
    }

    this.productSelectionState = (identifier, state) => {
       const product = this.findProduct(identifier);

       if (product != undefined) {
          product.selected = state
       }

       this.saveProducts(this.products);
       this.print()
    }

    this.print = () => {
        console.log("DATABASE CONTENT:\n" + localStorage.getItem(this.productsListKey))
    } 

    this.reset = () => {
        localStorage.setItem(this.productsListKey, JSON.stringify([]));
        this.loadProducts()
    }

    this.loadProducts()
    //this.reset()
    this.print()
}

const database = new Database()