function Database() {
    this.productsListKey = "shopping-list-products"
    this.preparedListKey = "prepared-list"
    this.currentWindowKey = "current-window"

    const MAIN_LIST = "main-list";
    const PREPARED_LIST = "prepared-list"

    this.products = []
    this.preparedList = []
    
    this.load = () => {
      try { 
        this.products = JSON.parse(localStorage.getItem(this.productsListKey)) || [];
        this.preparedList = JSON.parse(localStorage.getItem(this.preparedListKey)) || [];

        if(this.products == undefined || this.products == null || this.products.length == 0) {
            getProducts().forEach(product => {
                this.addProduct(product)
            })
        } 

        if(this.preparedList == undefined || this.preparedList == null) {
            this.preparedList = [];
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

    this.savePreparedItems = (preparedList = this.preparedList) => {
      try {
        localStorage.setItem(this.preparedListKey, JSON.stringify(preparedList));
        this.preparedList = preparedList 
      } catch (e) {
        console.log("savePreparedItems: An error has occurred: " + e);
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

    this.buildPreparedList = () => {
      let preparedList = []
      this.products.forEach(product => {
        if (product.selected) {
          preparedList.push({ 
            done: this.preparedItemIsDone(product.id), 
            product: product 
          })  
        }
      });

      this.savePreparedItems(preparedList)
    }

    this.clearPreparedList = () => {
      this.preparedList = []
      try {
        localStorage.setItem(this.preparedListKey, JSON.stringify([]));
      } catch (e) {
        console.log("clearPreparedList: An error has occurred: " + e);
      } 
    }

    this.markPreparedItemDone = (productId) => {
        let itemIndex = this.preparedList.findIndex(preparedItem => preparedItem.product.id === productId); 
        
        if (itemIndex != -1) {
          const product = this.preparedList[itemIndex].product 

          this.preparedList[itemIndex] = { done: true, product: product }
          this.savePreparedItems()
        }
    }

    this.deletePreparedItem = (productId) => {
        const filteredItems = this.preparedList.filter(preparedItem => preparedItem.product.id !== productId); 
        
        if (filteredItems != undefined) {
          this.savePreparedItems(filteredItems)
        }
    }

    this.preparedItemIsDone = (productId) => {
        let item = this.preparedList.find(preparedItem => preparedItem.product.id === productId); 
        if (item != undefined) {
            return item.done;
        }

        return false;
    }

    this.isPreparedListEmpty = () => {
      return this.preparedList.length === 0 || false
    }

    this.reset = () => {
        localStorage.setItem(this.productsListKey, JSON.stringify([]));
        localStorage.setItem(this.preparedListKey, JSON.stringify([]));
        this.setShowMainList();
        this.load()
    }

    this.setShowMainList = () => {
        localStorage.setItem(this.currentWindowKey, MAIN_LIST);  
    }

    this.setShowPreparedList = () => {
        localStorage.setItem(this.currentWindowKey, PREPARED_LIST);  
    }

    this.mainListShowing = () => {
        return localStorage.getItem(this.currentWindowKey) === MAIN_LIST  
    }

    this.preparedListShowing = () => {
        return localStorage.getItem(this.currentWindowKey) === PREPARED_LIST  
    }

    this.forceResetWhenLoading = () => {
      this.reset()
      alert("WARNING: Database has been reset when loading")
    }

    this.load()
    //this.forceResetWhenLoading()
    this.print()
}

const database = new Database()