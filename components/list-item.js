function ListItem(product, parentElementId, onCheckboxChangeHandler) {
  _ = new Component(this, parentElementId, "list-item-row");

  this.onRenderContainer = () => {
    this.label.render()    
    this.checkbox.render() 
  }

  this.label = new Label(product.name, "list-item", this.id);
  this.checkbox = new Checkbox(product.selected, product.id, this.id, onCheckboxChangeHandler);
}
