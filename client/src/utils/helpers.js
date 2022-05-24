export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('spring-shop', 1)
        let db, tx, store
        request.onupgradeneeded = function(e) {
            const db = request.result
            db.createObjectStore('products', { keyPath: '_id' })
            db.createObjectStore('cateogries', { keyPath: '_id' })
            db.createObjectStore('cart', { keyPath: '_id' })
        }

        request.onerror = function(e) {
            console.log('There was an error')
        }

        request.onsuccess = function(e) {
            db = request.result
            tx = db.transaction(storeName, 'readwrite')
            store = tx.objectStore(storeName)

            db.onerror = function(e) {
                console.log('error', e)
            }

            switch (method) {
                case 'put':
                    store.put(object)
                    resolve(object)
                    break
                case 'get':
                    const all = store.getAll()
                    all.onsuccess = function() {
                        resolve(all.result)
                    }
                    break
                case 'delete':
                    store.delete(object._id)
                    break
                default:
                    console.log('No valid method!')
                    break
            }

            tx.oncomplete = function() {
                db.close()
            }
        }
    })
}

export function validateEmail(email) {
    return String(email)
    .toLowerCase()
    .match(/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/)
}

export function formatTime (time) {
    let date = new Date(time)
    const month = date.toLocaleString('default', { month: 'long' })
    let formattedDate = `${month} ${date.getDate()}, ${date.getFullYear()}`
    let formattedTime = `${date.toLocaleTimeString()}`
    let formattedDateAndTime = `${formattedDate} ${formattedTime}`
    return formattedDateAndTime
}

export function total(strings) {
    strings = strings.map((string) => parseInt(string))
    const sum = strings.reduce((a,b) => a+b, 0)
    return sum
}