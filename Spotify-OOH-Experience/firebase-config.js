import { dotenv } from './dependencies.js'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc, onSnapshot } from "firebase/firestore"

// Firebase configuration =====================================================
dotenv.config()

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
}

// Initialize Firebase =====================================================
const firebaseApp = initializeApp(firebaseConfig)

class FireStoreDB {
    static instance
    static collection = {}

    constructor(firebaseAppInstance) {

        if (FireStoreDB.instance) {
            return FireStoreDB.instance
        }

        this.database = getFirestore(firebaseAppInstance)
        FireStoreDB.collection = {
            'Leads': collection(this.database, 'Leads')
        }

        FireStoreDB.instance = this
    }

    getCollection = async (collectionName) => {
        const snapshot = await getDocs(collectionName)
        const list = snapshot.docs.map(doc => doc.data())
        return list
    }

    addNewDocumentTo = async (newDocument, collection) => {
        try {
            const document = newDocument
            const docRef = await addDoc(FireStoreDB.collection[collection], document);
            console.log(docRef.id);
        } catch (error) {
            console.log(error);
        }
    }

    updateRealTime = (collection, doSomething) => {
        const c = FireStoreDB.collection[collection]
        onSnapshot(c, doSomething)
    }
}

const fireStoreDB = new FireStoreDB(firebaseApp)
export default fireStoreDB