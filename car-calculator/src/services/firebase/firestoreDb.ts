import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firestoteDb } from './firebaseConfig';


async function subscribeOnTableUpdate(tableName: string, setData: Function) {
    const tableRef = collection(firestoteDb, tableName);

    const unsubscribe = onSnapshot(tableRef, (querySnapshot) => {
        const tableData = querySnapshot.docs.map(doc => ({ id: doc.id, rowData: Object.values(doc.data()) }));

        setData(tableData);
    })
    
    return unsubscribe;
}


export {
    subscribeOnTableUpdate,
}