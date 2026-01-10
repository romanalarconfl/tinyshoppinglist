function Objects() {
    this.registerInfo = [];

    this.register = (objectId, functionId, func) => {
        this.registerInfo.push(
            {
                objectId: objectId,
                functionId: functionId,
                func: func
            }
        );
    }

    this.call = (functionId, objectId, target) => {
        const foundObjects = this.registerInfo.filter(object => object.objectId === objectId)
        const objectEntry = foundObjects.find(object => object.functionId === functionId)

        if(objectEntry != undefined) {
            objectEntry.func(target)
        }
    }
}

const objects = new Objects()
