function PreparedListItem(product, parentElementId, onMarkOrUnmarkProductAsDone, onDiscardItem) {
  _ = new Component(this, parentElementId, "list-item-row");

  this.productId = product.id;

  this.renderChildren = () => {
    this.label.render()
    this.preparedItemButtons.render();
  }

  this.checkLabelStrikeout = () => {
    if (database.preparedItemIsDone(this.productId)){
      this.label.strikeOut();
    }
  }

  this.onRenderContainer = () => {
    this.renderChildren();
  }

  this.onReloadContainer = () => {
    this.renderChildren();
  }

  this.afterRender = () => {
    this.checkLabelStrikeout()  
  }

  this.afterReload = () => {
    this.checkLabelStrikeout()  
  }

  this.onDoneOrUndoButtonClickHandler = (target) => {
    onMarkOrUnmarkProductAsDone(this.productId)
    this.reload();
  }

  this.onDiscardButtonClickHandler = (target) => {
    database.productSelectionState(this.productId, false)
    database.deletePreparedItem(this.productId)
    this.unmount();
    onDiscardItem()
  }

  this.label = new Label(product.name, "list-item", this.id)
  this.preparedItemButtons = new PreparedItemButtons(this.productId, this.id, this.onDoneOrUndoButtonClickHandler, this.onDiscardButtonClickHandler);
}
