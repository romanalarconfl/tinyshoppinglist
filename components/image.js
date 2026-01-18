function Image(imageURL, parentElementId) {
  _ = new Component(this, parentElementId, "");
  this.imageURL = imageURL;

  this.underlyingImageId = "underlying-image-" + this.id;

  this.reloadAsset = (imageURL) => {
    this.imageURL = imageURL;
    this.reload();
  }

  this.content = () => {
    return `
      <img id="${this.underlyingImageId}" src="${this.imageURL}" width="50px" height="50px"></image>
    `;  
  }  
}
