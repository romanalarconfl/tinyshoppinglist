function PreparedItemButtons(productId, parentElementId, onDoneOrUndoButtonClickHandler, onDiscardButtonClickHandler) {
  _ = new Component(this, parentElementId, "prepared-list-row-buttons-section");

  this.renderChildren = () => {
    this.discardButton.render() 

    const addOrCancelIcon = database.preparedItemIsDone(productId) ? "./assets/undo-button.png" 
                                                                   : "./assets/checkmark-blue.png"

    this.addOrCancelButton = new ImageButton(addOrCancelIcon, "image-button", this.id, onDoneOrUndoButtonClickHandler)
    this.addOrCancelButton.render()    
  }

  this.onRenderContainer = () => {
    this.renderChildren();
  }

  this.onReloadContainer = () => {
    this.renderChildren();
  }

  this.discardButton = new ImageButton("./assets/cancel.png", "image-button", this.id, onDiscardButtonClickHandler)
 }

 
