function FooterButtons(parentElementId, onResetButtonClick, onPrepareListButtonClick, onShowMainListClick) {
  _ = new Component(this, parentElementId, "footer-buttons");

  this.onRenderContainer = () => {
    this.cleanAllButton.render()    
    this.prepareListButton.render() 
  }

  this.cleanAllButton = new Button("Limpiar todo", "basic-button", this.id, onResetButtonClick);
  this.prepareListButton = (database.mainListShowing()) ? 
      new Button("Preparar lista", "basic-button", this.id, onPrepareListButtonClick) : 
      new Button("Agregar m&aacute;s", "basic-button", this.id, onShowMainListClick);
}
