function PreparedList(parentElementId, onEmptyPreparedList) {
  this.elementId = "prepared_list_" + Math.random();
  this.itemsListId = "prepared_items_list_" + Math.random();
  this.parentElementId = parentElementId;
  this.listItems = [];

  this.handleMarkOrUnmarkProductAsDone = (productId) => {
    if (database.preparedItemIsDone(productId)) {
      database.unmarkPreparedItemAsDone(productId)
    } else {
      database.markPreparedItemAsDone(productId)
    }

    this.reload()
  }

  this.handleDiscardItem = () => {
    if(database.isPreparedListEmpty()) {
      onEmptyPreparedList() 
    } else {
      this.reload()
    }
  } 

  this.reload = () => {
      let htmlComponent = document.getElementById(this.elementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML = ""
         this.render();
      }   
  }

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `<div id="${this.elementId}" class="list-items"></div>`;

         this.listItems = [];
         let doneProducts = 0

         database.preparedList.forEach(dictionary => {
           const {done, product} = dictionary
           doneProducts += done ? 1 : 0; 
           this.listItems.push(new PreparedListItem(product, this.elementId, this.handleMarkOrUnmarkProductAsDone, this.handleDiscardItem))
         })

         if (this.listItems.length == doneProducts) {
           (new Notice("Se complet&oacute; la compra", "assets/checkmark.png", this.elementId)).render();
         }

         if (this.listItems.length > 0) {
           this.listItems.forEach(item => {
               item.render();
           });

           (new DummyItem("footer-dummy-item", this.elementId)).render();
         }
     }
  }
}