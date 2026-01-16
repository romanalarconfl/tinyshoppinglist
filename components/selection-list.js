function SelectionList(parentElementId) {
  this.elementId = "list_" + Math.random();
  this.parentElementId = parentElementId;
  this.listItems = [];

  this.chackboxChangeHandler = (productId, checkStatus) => {
    database.productSelectionState(productId, checkStatus)
    database.print()
  }

  this.render = () => {
    database.products.forEach(product => {
      this.listItems.push(new ListItem(product, this.elementId, this.chackboxChangeHandler))
    })

    let htmlComponent = document.getElementById(this.parentElementId);

    if (htmlComponent != undefined) {
      htmlComponent.innerHTML += `
            <div id="${this.elementId}" class="list-items"></div>
         `;

      this.listItems.forEach(item => {
        item.render();
      });

      (new DummyItem("footer-dummy-item", this.elementId)).render()
    }
  }
}