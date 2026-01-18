function Notice(caption, imageURL, noticeSubclass, parentElementId) {
  _ = new Component(this, parentElementId, "notice-layout" + (noticeSubclass ? " " + noticeSubclass : ""));

  this.onRenderContainer = () => {
    this.label.render();    
    this.image.render(); 
  }

  this.label = new Label(caption, "notice-caption", this.id);
  this.image = new Image(imageURL, this.id);
}
