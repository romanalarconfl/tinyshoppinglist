function PreparedList(parentElementId) {
  this.preparedItemsListId = "prepared_items_list_" + Math.random();
  this.doneItemsListId = "done_items_list_" + Math.random();
  this.elementId = "prepared_list_" + Math.random();
  this.parentElementId = parentElementId;
  this.listItems = [];

  this.markProductAsDoneItem = (productId) => {
    database.markPreparedItemDone(productId)
    this.reload()
  }

  this.reload = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML = ""
         this.render();
      }   
  }

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `
            <div>
              <div id="${this.preparedItemsListId}" class="list-items"></div>
              <div id="${this.doneItemsListId}" class="prepared-list-list-items"></div>
            </div>  
         `;

         this.preparedItems = [];
         this.doneItems = [];

         database.preparedList.forEach(dictionary => {
           if (database.preparedItemIsDone(dictionary.product.id)){
             this.doneItems.push(new PreparedListItem(dictionary.product, this.doneItemsListId, this.markProductAsDoneItem))
           } else {
             this.preparedItems.push(new PreparedListItem(dictionary.product, this.preparedItemsListId, this.markProductAsDoneItem))
           }
         })

         if (this.preparedItems.length > 0) {
           if (this.doneItems.length == 0) {
              (new Notice("A&uacute;n no se inici&oacute; la compra", "assets/empty-list.png", this.preparedItemsListId)).render();
           }
           this.preparedItems.forEach(item => {
               item.render();
           })
         } else {
            (new Notice("Se complet&oacute; la compra", "assets/checkmark.png", this.preparedItemsListId)).render();
         }

         if (this.doneItems.length > 0) {
           this.doneItems.forEach(item => {
               item.render();
           })
         }
      }
  }
}