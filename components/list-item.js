function ListItem(product, parentElementId, checkboxChangeHandler) {
  this.elementId = "list_item_" + Math.random()
  this.productId = product.id
  this.title = product.name
  this.selected = product.selected
  this.parentElementId = parentElementId
  this.checkboxChangeHandler = checkboxChangeHandler

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `
             <div id="${this.elementId}" class="list-item-row"></div>
         `;

         (new Label(this.title, "list-item", this.elementId)).render();
         (new Checkbox(this.elementId, this.selected, this.productId, checkboxChangeHandler)).render();
      }
  }
}
