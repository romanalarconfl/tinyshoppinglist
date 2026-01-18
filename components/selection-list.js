function SelectionList(parentElementId) {
  _ = new Component(this, parentElementId, "list-items");

  this.listItems = [];

  this.handleCheckboxChange = (productId, checkStatus) => {
    database.productSelectionState(productId, checkStatus)
    database.print()
  }

  this.loadItems = () => {
    this.listItems = [];
    database.products.forEach(product => {
      this.listItems.push(new ListItem(product, this.id, this.handleCheckboxChange))
    })

    this.listItems.push(new DummyItem(this.id))

    this.listItems.forEach(item => {
      item.render();
    });
  }

  this.onReloadContainer = () => {
    this.loadItems();
  } 

  this.onRenderContainer = () => {
    this.loadItems();
  }
}