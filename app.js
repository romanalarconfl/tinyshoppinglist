function App(parentElementId) {
  this.appId = "app_" + Math.random(); 
  this.parentElementId = parentElementId;

  this.currentNotice = null;
  
  this.render = () => {
      this.buildComponents();

      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `<div id="${this.appId}" class="app"></div>`;

         this.components.forEach(component => {
             component.render();
         })
      }
  }

  this.reload = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML = ""
         this.render()
      }
  }

  this.handleEmptyPreparedList = () => {
    database.setShowMainList()
    this.reload()
  }

  this.handleFinishShopping = () => {
    this.setupCurrentNotice(
      new Notice("Se complet&oacute; la compra", "assets/checkmark.png", "notice-success", this.appId)
    );
  }

  this.createList = () => {
    if(database.preparedListShowing()) {
        return new PreparedList(this.appId, this.handleEmptyPreparedList, this.handleFinishShopping);
    }

    return new SelectionList(this.appId);
  }

  this.chackboxChangeHandler = (productId, checkStatus) => {
    database.productSelectionState(productId, checkStatus)
    database.print()
  }

  this.onResetButtonClick = () => {
     database.clearPreparedList()
     database.setShowMainList()
     database.reset()
     this.reload()
  }

  this.onShowMainListClick = () => {
     database.setShowMainList()
     this.reload()
  }

  this.onPrepareListButtonClick = () => {
     database.buildPreparedList()

     if(!database.isPreparedListEmpty()) {
       database.setShowPreparedList()
       this.reload()
     } else {
       this.setupCurrentNotice(
           new Notice("No se eligieron productos!", "assets/warning.png", "notice-error", this.appId)
       );
     }
  }

  this.setupCurrentNotice = (notice) => {
    this.currentNotice = notice;

    setTimeout(() => {
      this.currentNotice = null;
      this.reload();
    }, 2000);

    this.reload();
  }

  this.buildComponents = () => {
     let subtitle = "Productos en general"; 
     if(database.preparedListShowing()) {
        subtitle = "Productos elegidos";
     }
     
     this.components = [new Header("Lista de compras", subtitle, this.appId)];

     if (this.currentNotice) {
        this.components.push(this.currentNotice)
     }  

     this.components.push(this.createList())
     this.components.push(new ButtonsList(this.onResetButtonClick, 
                                          this.onShowMainListClick, 
                                          this.onPrepareListButtonClick,
                                          this.onCheckboxChangeHandler,
                                          this.parentElementId));

  }
}