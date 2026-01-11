function Notice(caption, imageURL, parentElementId) {
  this.noticeId = "notice_" + Math.random();
  this.parentElementId = parentElementId;
  this.caption = caption;
  this.imageURL = imageURL;

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
        htmlComponent.innerHTML += `
          <div id="${this.noticeId}" class="notice-layout"></div>
        `;

        (new Label(this.caption, "notice-caption", this.noticeId)).render();

        if (this.imageURL !== undefined && this.imageURL !== "") {
          (new Image(this.imageURL, this.noticeId)).render();
        }
      }
  }
}