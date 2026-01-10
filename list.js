function List(listId, parentElementId) {
  this.listId = listId;
  this.elementId = "list-items";
  this.parentElementId = parentElementId;
  this.listOfProducts = [];

  this.chackboxChangeHandler = (productId, checkStatus) => {
    database.productSelectionState(productId, checkStatus)
    database.print()
  }

  this.makePreparedList = () => {
    database.products.forEach(product => {
      if(product.selected ) {
        this.listOfProducts.push(new PreparedListItem(product, this.elementId)) 
      }
    })
  }  

  this.makeNormalList = () => {
    database.products.forEach(product => {
       this.listOfProducts.push(new ListItem(product, this.elementId, this.chackboxChangeHandler)) 
    })
  }  

  this.render = () => {
      if (database.getShowPreparedList()) {
        this.makePreparedList()      
      } else {
        this.makeNormalList()
      }

      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `
            <p id="${this.elementId}" class="list-items"></p>
         `;

         this.listOfProducts.forEach(product => {
             product.render();
         })
      }
  }
}