import { collection, getDocs, onSnapshot, doc, where, limit, query } from 'firebase/firestore';
import { firestoreDb } from './firebaseConfig';

function subscribeOnTableUpdate(tableName: string, sortBy: string, setData: Function) {
    const tableRef = collection(firestoreDb, tableName);

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
    const tableRef = collection(firestoreDb, tableName);

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
    const tableRef = collection(firestoreDb, tableName);

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
    return getDocs(collection(firestoreDb, tableName)).then((query) => {
        const doc = query.docs[0];

        return { data: doc.data() };
    });
}

async function getColumnData(tableName: string, columnName: string, placeholder: string = 'None'): Promise<string[]> {
    const querySnapshot = await getDocs(collection(firestoreDb, tableName));

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
    return doc(collection(firestoreDb, tableName)).id;
}


// async function fetchShippingCost() {
//     const q = query(
//         collection(firestoreDb, "delivery_by_ship"),
//         where("From", "==", 'California, CA'),
//         where("Destination", "==", 'Rotterdam'),
//         // where("Sedan", "!=", ""),
//         // limit(1)
//     );

//     try {
//         const querySnapshot = await getDocs(q);

//         querySnapshot.forEach((doc) => console.log('doc data: ', doc.data()));

//         if (querySnapshot.empty) {
//             console.log("No data found");
//             return null;
//         }

//         // Получение значения поля `colName` из первого найденного документа
//         const result = querySnapshot.docs[0].data();

//         console.log('fetchShippingCost: ', result);
//         return result;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         return null;
//     }
// }

// fetchShippingCost()


export {
    subscribeOnTableUpdate,
    subscribeOnTableSettingsUpdate,
    subscribeOnFirstTableRecord,
    getColumnData,
    generateRowId,
    getFirstTableRecord,
}