function Image(imageURL, parentElementId) {
  this.imageId = "image_" + Math.random();
  this.parentElementId = parentElementId;
  this.imageURL = imageURL;

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
        htmlComponent.innerHTML += `
          <img id="${this.imageId}" src="${this.imageURL}" width="50px" height="50px"></image>
        `;
      }
  }
}