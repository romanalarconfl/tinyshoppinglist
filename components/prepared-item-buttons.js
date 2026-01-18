function PreparedItemButtons(productId, parentElementId, onDoneOrUndoButtonClickHandler, onDiscardButtonClickHandler) {
  _ = new Component(this, parentElementId, "prepared-list-row-buttons-section");

  this.renderChildren = () => {
    this.discardButton.render() 

    const addOrCancelIcon = database.preparedItemIsDone(productId) ? "./assets/cancel.png" 
                                                                      : "./assets/checkmark.png"

    this.addOrCancelButton = new ImageButton(addOrCancelIcon, "image-button", this.id, onDoneOrUndoButtonClickHandler)
    this.addOrCancelButton.render()    
  }

  this.onRenderContainer = () => {
    this.renderChildren();
  }

  this.onReloadContainer = () => {
    this.renderChildren();
  }

  this.discardButton = new ImageButton("./assets/discard-can.png", "image-button", this.id, onDiscardButtonClickHandler)
 }

 
