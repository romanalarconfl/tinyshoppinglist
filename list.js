function List(parentElementId) {
  this.elementId = "list_" + Math.random();
  this.parentElementId = parentElementId;
  this.listItems = [];

  this.chackboxChangeHandler = (productId, checkStatus) => {
    database.productSelectionState(productId, checkStatus)
    database.print()
  }

  this.makeNormalList = () => {
    database.products.forEach(product => {
       this.listItems.push(new ListItem(product, this.elementId, this.chackboxChangeHandler)) 
    })
  }  

  this.render = () => {
      if (database.mainListShowing()) {
        this.makeNormalList()
      } else if (database.preparedListShowing()) {
        this.makePreparedList()      
      }
      
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `
            <div id="${this.elementId}" class="list-items"></div>
         `;

         this.listItems.forEach(item => {
             item.render();
         })
      }
  }
}