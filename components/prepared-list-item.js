function PreparedListItem(product, parentElementId, onMarkOrUnmarkProductAsDone, onDiscardItem) {
  this.elementId = "prepared_list_" + Math.random();
  this.productId = product.id;
  this.preparedListItemId = "prepared-list-item-" + product.id;
  this.buttonsSectionId = "prepared-list-item-buttons-" + product.id;
  this.title = product.name;
  this.parentElementId = parentElementId;

  this.onDoneOrUndoButtonClickHandler = (target) => {
    this.label.strikeOut()
    onMarkOrUnmarkProductAsDone(this.productId)
  }

  this.onDiscardButtonClickHandler = (target) => {
    database.productSelectionState(this.productId, false)
    database.deletePreparedItem(this.productId)
    onDiscardItem()
  }

  const addOrCancelIcon = database.preparedItemIsDone(this.productId) ? "./assets/cancel.png" 
                                                                      : "./assets/checkmark.png"

  this.label = new Label(this.title, "list-item", this.preparedListItemId)
  this.addOrCancelButton = new ImageButton(addOrCancelIcon, "image-button", this.buttonsSectionId, this.onDoneOrUndoButtonClickHandler)
  this.discardButton = new ImageButton("./assets/discard-can.png", "image-button", this.buttonsSectionId, this.onDiscardButtonClickHandler)

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
         this.addOrCancelButton.render();

         if (database.preparedItemIsDone(this.productId)) {
            this.label.strikeOut()
         }
      }
  }
}