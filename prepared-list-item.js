function PreparedListItem(product, parentElementId) {
  this.elementId = "prepared_list_" + Math.random()
  this.productId = product.id
  this.preparedListItemId = "prepared-list-item-" + product.id;
  this.buttonsSectionId = "prepared-list-item-buttons-" + product.id;
  this.title = product.name
  this.parentElementId = parentElementId

  this.onDoneButtonClickHandler = (target) => {
    this.doneButton.disable()
    this.label.strikeOut()
    database.markPreparedItemDone(this.productId)
  }

  this.onDiscardButtonClickHandler = (target) => {
    database.productSelectionState(this.productId, false)
    database.deletePreparedItem(this.productId)

    if(database.isPreparedListEmpty()) {
      database.setShowMainList()
    }

    window.location.reload()
  }

  this.label = new Label(this.title, "list-item", this.preparedListItemId)
  this.doneButton = new Button("Listo", "prepared-list-button", this.buttonsSectionId, this.onDoneButtonClickHandler)
  this.discardButton = new Button("Descartar", "prepared-list-button", this.buttonsSectionId, this.onDiscardButtonClickHandler)

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `
             <div class="list-item-row">
                <div id="${this.preparedListItemId}" ></div>
                <div id="${this.buttonsSectionId}" class="prepared-list-row-buttons-section" ></div>
             </div>
         `;

         this.label.render();
         this.discardButton.render();
         this.doneButton.render();

         if (database.preparedItemIsDone(this.productId)) {
            this.label.strikeOut()
            this.doneButton.disable() 
         }
      }
  }
}