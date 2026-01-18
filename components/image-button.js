function ImageButton(imageURL, cssClass, parentElementId, onClickHandler) {
  _ = new Component(this, parentElementId, "");
  
  this.imageURL = imageURL;
  this.cssClass = cssClass;
  
  this.underlyingImageButtonId = "underlying-image-button-" + this.id;

  objects.register(`${this.id}`, 'image-button-Click', (target) => {
    onClickHandler(target)
  });

  this.setImage = (imageURL) => {
    this.imageURL = imageURL;
    this.reload();
  }

  this.content = () => {
    return `
      <button id="${this.underlyingImageButtonId}" class="${this.cssClass}" onclick="objects.call('image-button-Click', '${this.id}', this)">
        <img src="${this.imageURL}" width="24px" height="24px"></img>
      </button> 
    `;  
  }  
}

