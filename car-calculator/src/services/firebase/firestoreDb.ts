import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore';
import { firestoteDb } from './firebaseConfig';

function subscribeOnTableUpdate(tableName: string, sortBy: string, setData: Function) {
    const tableRef = collection(firestoteDb, tableName);

    // console.log('tableName: ', tableName);

    const unsubscribe = onSnapshot(tableRef, (querySnapshot) => {
        const tableData = querySnapshot.docs.map(doc => ({ id: doc.id, rowData: doc.data() }));
        // console.log('tableData: ', tableData);
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

function subscribeOnTableSettingsUpdate(tableName: string, setData: Function) {
    const tableRef = collection(firestoteDb, tableName);

    const unsubscribe = onSnapshot(tableRef, (querySnapshot) => {
        const initRowsConfig = {
            info: {},
            result: {},
            order: {},
        };

        querySnapshot.docs.map(doc => {
            const row = { id: doc.id, rowData: doc.data() };

            const { rowType } = row.rowData;

            switch (rowType) {
                case 'info':
                    {
                        initRowsConfig.info[row.id] = row.rowData;
                    }
                    break;
                case 'result':
                    initRowsConfig.result = row;
                    break;
                case 'order':
                    initRowsConfig.order = row;
            }
        });

        setData(initRowsConfig);
    })

    return unsubscribe;
}

async function getColumnData(tableName: string, columnName: string, placeholder: string = 'None'): Promise<string[]> {
    const querySnapshot = await getDocs(collection(firestoteDb, tableName));

    const columnData: string[] = [];

    querySnapshot.forEach((doc) => {
        const docData = doc.data();

        if ('isShown' in docData && !docData.isShown) return;

        columnData.push(docData[columnName]);
    });

    columnData.sort().unshift(placeholder);

    console.log('column Data: ', columnData);
    return columnData;
}

async function generateRowId(tableName: string): Promise<string> {
    return doc(collection(firestoteDb, tableName)).id;
}

export {
    subscribeOnTableUpdate,
    subscribeOnTableSettingsUpdate,
    getColumnData,
    generateRowId
}