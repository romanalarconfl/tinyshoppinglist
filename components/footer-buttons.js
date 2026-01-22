function FooterButtons(parentElementId, onResetButtonClick, onPrepareListButtonClick, onShowMainListClick) {
  _ = new Component(this, parentElementId, "footer-buttons");

  this.onRenderContainer = () => {
    this.cleanAllButton.render()    
    this.prepareListButton.render() 
  }

  this.cleanAllButton = new Button("Reiniciar", "basic-button", this.id, onResetButtonClick);
  this.prepareListButton = (database.mainListShowing()) ? 
      new Button("Preparar lista", "basic-button", this.id, onPrepareListButtonClick) : 
      new Button("Modificar", "basic-button", this.id, onShowMainListClick);
}
