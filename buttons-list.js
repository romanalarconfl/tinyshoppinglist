function ButtonsList(parentElementId) {
  this.elementId = "buttons_" + Math.random()
  this.parentElementId = parentElementId

  this.chackboxChangeHandler = (productId, checkStatus) => {
    database.productSelectionState(productId, checkStatus)
    database.print()
  }

  this.onResetButtonClick = () => {
     database.setShowPreparedList(false)
     database.reset()
     window.location.reload()
  }

  this.onShowSelectionListClick = () => {
     database.setShowPreparedList(false)
     window.location.reload()
  }

  this.onPrepareListButtonClick = () => {
     database.setShowPreparedList(true)
     window.location.reload()
  }

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      htmlComponent.innerHTML += `
         <div id="${this.elementId}" class="button-items"></div>
      `

      if (htmlComponent != undefined) {
         (new Button("Limpiar todo", "basic-button", this.elementId, this.onResetButtonClick)).render()
         if (database.getShowPreparedList()) {
             (new Button("Agregar m&aacute;s", "basic-button", this.elementId, this.onShowSelectionListClick)).render()
         } else {
             (new Button("Preparar lista final", "basic-button", this.elementId, this.onPrepareListButtonClick)).render()
         }
      }
  }
}