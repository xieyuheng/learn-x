export async function getDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const db = window.indexedDB.open('offline-notes', 2)

    db.onerror = (event) => {
      reject(new Error('Fail to open database'))
    }

    db.onsuccess = (event) => {
      console.log('db.onsuccess', event)
      resolve((event.target as any)?.result)
    }

    db.onupgradeneeded = (event) => {
      console.log('db.onupgradeneeded', event)
      const database: IDBDatabase = (event.target as any).result

      database.deleteObjectStore('notes')

      database.createObjectStore('notes', {
        keyPath: 'createdAt',
      })
    }
  })
}
