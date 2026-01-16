function ButtonsList(onResetButtonClick, 
                     onShowMainListClick, 
                     onPrepareListButtonClick,
                     onCheckboxChangeHandler,
                     parentElementId) {
  this.elementId = "buttons_" + Math.random()
  this.parentElementId = parentElementId

  this.onResetButtonClick = onResetButtonClick;
  this.onShowMainListClick = onShowMainListClick;
  this.onPrepareListButtonClick = onPrepareListButtonClick;
  this.checkboxChangeHandler = onCheckboxChangeHandler;

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      htmlComponent.innerHTML += `
         <div id="${this.elementId}" class="footer-buttons"></div>
      `

      if (htmlComponent != undefined) {
         (new Button("Limpiar todo", "basic-button", this.elementId, this.onResetButtonClick)).render()
         
         if(database.mainListShowing()) {
             (new Button("Preparar lista", "basic-button", this.elementId, this.onPrepareListButtonClick)).render()
         } else if (database.preparedListShowing()) {
             (new Button("Agregar m&aacute;s", "basic-button", this.elementId, this.onShowMainListClick)).render()
         }
      }
  }
}