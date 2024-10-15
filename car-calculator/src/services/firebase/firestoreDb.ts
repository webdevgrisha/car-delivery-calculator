import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore';
import { firestoteDb } from './firebaseConfig';

async function subscribeOnTableUpdate(tableName: string, sortBy: string, setData: Function) {
    const tableRef = collection(firestoteDb, tableName);

    const unsubscribe = onSnapshot(tableRef, (querySnapshot) => {
        const tableData = querySnapshot.docs.map(doc => ({ id: doc.id, rowData: doc.data() }));

        if (sortBy in tableData[0].rowData) {
            tableData.sort((a, b) => {
                const aData: string = a.rowData[sortBy];
                const bData: string = b.rowData[sortBy];

                return aData.localeCompare(bData);
            });
        }

        setData(tableData);
    })

    return unsubscribe;
}

async function getColumnData(tableName: string, columnName: string): Promise<string[]> {
    const querySnapshot = await getDocs(collection(firestoteDb, tableName));

    const columnData: string[] = [];

    querySnapshot.forEach((doc) => {
        const docData = doc.data();

        columnData.push(docData[columnName]);
    });

    columnData.sort().unshift('None');

    console.log('column Data: ', columnData);
    return columnData;
}

async function generateRowId(tableName: string): Promise<string> {
    return doc(collection(firestoteDb, tableName)).id;
}

export {
    subscribeOnTableUpdate,
    getColumnData,
    generateRowId
}