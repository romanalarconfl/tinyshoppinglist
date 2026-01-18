function App(parentElementId) {
  this.component = new Component(this, parentElementId, "app", this.onRender);

  this.createList = () => {
    if(database.preparedListShowing()) {
      return new PreparedList(this.id, this.handleEmptyPreparedList, this.handleFinishShopping);
    }

    return new SelectionList(this.id);
  }

  this.renderChildren = () => {
    this.header = new Header("Lista de compras", this.createSubtitle(), this.id)
    this.header.render();

    this.list = this.createList();
    this.list.render();

    this.footer = new FooterButtons(this.id, 
                                  this.onResetButtonClick, 
                                  this.onPrepareListButtonClick,  
                                  this.onShowMainListClick);
    this.footer.render();
  }

  this.onRenderContainer = () => {
    this.renderChildren();
  }

  this.onReloadContainer = () => {
    this.renderChildren();
  }

  this.handleEmptyPreparedList = () => {
    database.setShowMainList()
    this.render()
  }

  this.handleFinishShopping = () => {
    this.setupCurrentNotice(
      new Notice("Se complet&oacute; la compra", "assets/checkmark.png", "notice-success", this.id)
    );
  }

  this.createSubtitle = () => {
    let subtitle = "Productos en general"; 
    if(database.preparedListShowing()) {
      subtitle = "Productos elegidos";
    }

    return subtitle;
  }

  this.onResetButtonClick = () => {
     database.clearPreparedList()
     database.setShowMainList()
     database.reset()
     this.reload();
  }

  this.onShowMainListClick = () => {
     database.setShowMainList()
     this.render()
  }

  this.setupCurrentNotice = (notice) => {
    this.currentNotice = notice;
    this.currentNotice.render();

    setTimeout(() => {
      this.currentNotice.unmount();
    }, 2000);
  }

  this.onPrepareListButtonClick = () => {
     database.buildPreparedList()

     if(!database.isPreparedListEmpty()) {
       database.setShowPreparedList()
       this.render()
     } else {
       this.setupCurrentNotice(
         new Notice("No se eligieron productos!", "assets/warning.png", "notice-error", this.id)
       );
     }
  }
}
