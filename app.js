function App(parentElementId) {
  this.elementId = "app" 
  this.parentElementId = parentElementId;
  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `
           <div id="${this.elementId}">
              <div id="header-container" class="header-container"></div>
              <div id="list-container" class="list-container"></div>
           </div>   
         `;

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

  this.components = [
    new Header("Lista de compras", "Productos en general", "header-container"),
    new List("supermarket-list-id", "list-container"),
    new ButtonsList(this.elementId)
  ] 
}

const app = new App("main")