function Button(caption, cssClass, parentElementId, onClickHandler) {
  this.buttonId = "button_" + Math.random();
  this.caption = caption
  this.parentElementId = parentElementId;
  this.cssClass = cssClass;

  objects.register(this.buttonId, 'button-Click', (target) => {
      onClickHandler(target)
  });

  this.disable = () => {
    const wrappedButton = document.getElementById(this.buttonId)

    if(wrappedButton != undefined) {
      wrappedButton.style.color = 'lightgray';  
    }
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
