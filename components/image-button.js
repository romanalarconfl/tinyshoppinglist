function ImageButton(imageURL, cssClass, parentElementId, onClickHandler) {
  this.buttonId = "image-button_" + Math.random();
  this.imageURL = imageURL
  this.parentElementId = parentElementId;
  this.cssClass = cssClass;

  objects.register(this.buttonId, 'image-button-Click', (target) => {
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
          <button id="${this.buttonId}" class="${this.cssClass}" onclick="objects.call('image-button-Click', '${this.buttonId}', this)">
            <img src="${this.imageURL}" width="24px" height="24px"></img>
          </button> 
        `;
      }
  }
}
