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
            result: {
                id: '',
                rowData: {
                    rowName: '',
                },
            },
            order: {
                rowData: {
                    rowsOrder: [],
                },
            },
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

function subscribeOnFirstTableRecord(tableName: string, setData: Function) {
    const tableRef = collection(firestoteDb, tableName);

    const unsubscribe = onSnapshot(tableRef, (querySnapshot) => {
        if (querySnapshot.empty) {
            setData(null);
        } else {
            const doc = querySnapshot.docs[0];
            const row = { id: doc.id, rowData: doc.data() };
            console.log('doc data: ', doc.data());
            setData(row);
        }
    });

    return unsubscribe;
}

// rename
function getFirstTableRecord(tableName: string) {
    return getDocs(collection(firestoteDb, tableName)).then((query) => {
        const doc = query.docs[0];

        return { data: doc.data() };
    });
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

    return columnData;
}

async function generateRowId(tableName: string): Promise<string> {
    return doc(collection(firestoteDb, tableName)).id;
}

export {
    subscribeOnTableUpdate,
    subscribeOnTableSettingsUpdate,
    subscribeOnFirstTableRecord,
    getColumnData,
    generateRowId,
    getFirstTableRecord,
}