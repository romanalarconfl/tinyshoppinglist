function PreparedListItem(product, parentElementId) {
  this.id = product.id
  this.preparedListItemId = "prepared-list-item-" + this.id;
  this.labelId = "prepared-list-item-label" + this.id;
  this.buttonId = "prepared-list-item-button-" + this.id;
  this.title = product.name
  this.parentElementId = parentElementId

  this.onDoneButtonClickHandler = (target) => {
    this.doneButton.disable()
    this.label.strikeOut()
  }

  this.label = new Label(product.id, this.title, this.preparedListItemId)
  this.doneButton = new Button(product.id, "Done", "prepared-list-button", this.preparedListItemId, this.onDoneButtonClickHandler)

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `
             <div id="${this.preparedListItemId}" class="list-item-row"></div>
         `;

         this.label.render();
         this.doneButton.render();
      }
  }
}