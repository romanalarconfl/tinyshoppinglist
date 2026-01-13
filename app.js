function App(parentElementId) {
  this.appId = "app_" + Math.random(); 
  this.parentElementId = parentElementId;

  this.showNoSelectedItemsNotice = false;
  
  this.render = () => {
      this.buildComponents();

      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `<div id="${this.appId}"></div>`;

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

  this.createList = () => {
    if(database.preparedListShowing()) {
        return new PreparedList(this.appId);
    }

    return new List(this.appId);
  }

  this.chackboxChangeHandler = (productId, checkStatus) => {
    database.productSelectionState(productId, checkStatus)
    database.print()
  }

  this.onResetButtonClick = () => {
     database.clearPreparedList()
     database.setShowMainList()
     database.reset()
     window.location.reload()
  }

  this.onShowMainListClick = () => {
     database.setShowMainList()
     window.location.reload()
  }

  this.onPrepareListButtonClick = () => {
     database.buildPreparedList()

     if(!database.isPreparedListEmpty()) {
       database.setShowPreparedList()
       window.location.reload()
     } else {
       this.showNoSelectedItemsNotice = true;
       this.reload();

       setTimeout(() => {
           this.showNoSelectedItemsNotice = false;
           this.reload();
       }, 2000);
     }
  }

  this.buildComponents = () => {
     this.components = [new Header("Lista de compras", "Productos en general", this.appId)];

     if (this.showNoSelectedItemsNotice) {
       this.components.push(new Notice("No se eligieron productos!", "assets/warning.png", this.appId));
     }  

     this.components.push(this.createList())
     this.components.push(new ButtonsList(this.onResetButtonClick, 
                                          this.onShowMainListClick, 
                                          this.onPrepareListButtonClick,
                                          this.onCheckboxChangeHandler,
                                          this.parentElementId));

  }
}