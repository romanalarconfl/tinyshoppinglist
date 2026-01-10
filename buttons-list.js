function ButtonsList(parentElementId) {
  this.elementId = "button-items" 
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
         const resetButton = new Button("reset-button", "Limpiar todo", "basic-button", this.elementId, this.onResetButtonClick)
         const prepareButton = new Button("prepare-list-button", "Preparar lista final", "basic-button", this.elementId, this.onPrepareListButtonClick)

         resetButton.render();
         prepareButton.render();
      }
  }
}