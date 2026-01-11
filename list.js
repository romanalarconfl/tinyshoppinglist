function List(parentElementId) {
  this.elementId = "list_" + Math.random();
  this.parentElementId = parentElementId;
  this.listItems = [];

  this.chackboxChangeHandler = (productId, checkStatus) => {
    database.productSelectionState(productId, checkStatus)
    database.print()
  }

  this.makePreparedList = () => {
    database.preparedList.forEach(dictionary => {
      this.listItems.push(new PreparedListItem(dictionary.product, this.elementId))
    })
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
            <p id="${this.elementId}" class="list-items"></p>
         `;

         this.listItems.forEach(item => {
             item.render();
         })
      }
  }
}