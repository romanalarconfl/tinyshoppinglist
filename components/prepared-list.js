function PreparedList(parentElementId, onEmptyPreparedList, onFinishShopping) {
  _ = new Component(this, parentElementId, "list-items");

  this.listItems = [];

  this.handleMarkOrUnmarkProductAsDone = (productId) => {
    if (database.preparedItemIsDone(productId)) {
      database.unmarkPreparedItemAsDone(productId)
    } else {
      database.markPreparedItemAsDone(productId)
    }

    let doneProducts = 0
    database.preparedList.forEach(dictionary => {
      const {done} = dictionary
      doneProducts += done ? 1 : 0; 
    })

    if (this.listItems.length == doneProducts) {
      onFinishShopping()
    }
  }

  this.handleDiscardItem = () => {
    if(database.isPreparedListEmpty()) {
      onEmptyPreparedList() 
    }
  } 

  this.loadItems = () => {
    this.listItems = [];
    database.preparedList.forEach(dictionary => {
      const {product} = dictionary
      this.listItems.push(new PreparedListItem(product, this.id, this.handleMarkOrUnmarkProductAsDone, this.handleDiscardItem))
    })

    if (this.listItems.length > 0) {
      this.listItems.forEach(item => {
        item.render();
      });
    }

    this.dummyItem.render();
  }

  this.onReloadContainer = () => {
    this.loadItems();
  } 

  this.onRenderContainer = () => {
    this.loadItems();
  }

  this.dummyItem = new DummyItem(this.id);
}
