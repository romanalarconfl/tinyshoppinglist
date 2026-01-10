function Button(id, caption, cssClass, parentElementId, onClickHandler) {
  this.buttonId = "button_" + id;
  this.caption = caption
  this.parentElementId = parentElementId;
  this.cssClass = cssClass;

  objects.register(this.buttonId, 'button-Click', (target) => {
      onClickHandler(target)
  });

  this.disable = () => {
      document.getElementById(this.buttonId).disabled = true
  }

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
        htmlComponent.innerHTML += `
          <button id="${this.buttonId}" class="${this.cssClass}" onclick="objects.call('button-Click', '${this.buttonId}', this)">
            ${this.caption}
          </button> 
        `;
      }
  }
}
