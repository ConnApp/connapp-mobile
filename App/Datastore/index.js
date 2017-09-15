import Collection from './Collection.js'

class Mongoose {
  constructor(collections = ['Default']) {
    // Builds database file for each collection
    this.db = collections
      .map(collectionName => new Collection(collectionName))
      .reduce((finalObj, current) => {
        finalObj[current.name] = current
        return finalObj
      }, {})
  }

  syncAll () {
    return Promise.all(Object.keys(this.db).map(collectionName => {
      let collection = this.db[collectionName]
      return collection.sync({})
    }))
  }

  closeAllSockets () {
    Object.keys(this.db).reduce(collectionName => {
      let collection = this.db[collectionName]
      collection.closeSockets()
    })
  }
}

export default Mongoose
