function ButtonsList(parentElementId) {
  this.elementId = "buttons_" + Math.random()
  this.parentElementId = parentElementId

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

  this.onShowSelectionListClick = () => {
     database.setShowMainList()
     window.location.reload()
  }

  this.onPrepareListButtonClick = () => {
     database.buildPreparedList()
     database.setShowPreparedList()
     window.location.reload()
  }

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      htmlComponent.innerHTML += `
         <div id="${this.elementId}" class="button-items"></div>
      `

      if (htmlComponent != undefined) {
         (new Button("Limpiar todo", "basic-button", this.elementId, this.onResetButtonClick)).render()
         
         if(database.mainListShowing()) {
             (new Button("Preparar lista final", "basic-button", this.elementId, this.onPrepareListButtonClick)).render()
         } else if (database.preparedListShowing()) {
             (new Button("Agregar m&aacute;s", "basic-button", this.elementId, this.onShowSelectionListClick)).render()
         }
      }
  }
}