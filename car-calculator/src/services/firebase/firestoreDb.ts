import { collection, getDocs, onSnapshot, doc, where, query, orderBy, DocumentData, getDoc } from 'firebase/firestore';
import { firestoreDb } from './firebaseConfig';


interface RowData {
    rowName?: string;
    rowsOrder?: string[];
    rowType: string;
    [key: string]: unknown; // Для других полей
}

interface RowsConfig {
    info: { [id: string]: RowData };
    result: { id: string; rowData: RowData };
    order: { id: string; rowData: RowData };
}


function subscribeOnTableUpdate(tableName: string, sortBy: string, setData: Function) {
    const tableRef = collection(firestoreDb, tableName);

    const q = query(tableRef, orderBy(sortBy, 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tableData = querySnapshot.docs.map(doc => ({ id: doc.id, rowData: doc.data() }));

        setData(tableData);
    })

    return unsubscribe;
}

function subscribeOnTableUpdateFrontEndSort(tableName: string, sortBy: string, setData: Function) {
    const tableRef = collection(firestoreDb, tableName);

    const q = query(tableRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tableData = querySnapshot.docs.map(doc => ({ id: doc.id, rowData: doc.data() }));

        tableData.sort((a, b) => {
            const valA = parseFloat(a.rowData[sortBy]);
            const valB = parseFloat(b.rowData[sortBy]);

            if (typeof valA === "number" && typeof valB === "number") {
                return valA - valB;
            }
            return 0;
        });

        setData(tableData);
    })

    return unsubscribe;
}

function subscribeOnTableSettingsUpdate(
    tableName: string,
    setData: Function
) {
    const tableRef = collection(firestoreDb, tableName);

    const unsubscribe = onSnapshot(tableRef, (querySnapshot) => {
        const initRowsConfig: RowsConfig = {
            info: {},
            result: {
                id: '',
                rowData: {
                    rowName: '',
                    rowType: ''
                },
            },
            order: {
                id: '',
                rowData: {
                    rowsOrder: [],
                    rowType: ''
                },
            },
        };

        querySnapshot.docs.forEach((doc) => {
            const row = { id: doc.id, rowData: doc.data() as RowData };
            const { rowType } = row.rowData;

            switch (rowType) {
                case 'info':
                    initRowsConfig.info[row.id] = row.rowData;
                    break;
                case 'result':
                    initRowsConfig.result = row;
                    break;
                case 'order':
                    initRowsConfig.order = row;
                    break;
            }
        });

        setData(initRowsConfig);
    });

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
    const collectionRef = collection(firestoreDb, tableName);

    const q = query(collectionRef, orderBy(columnName, 'asc'));

    const querySnapshot = await getDocs(q);

    const columnData: string[] = [];

    querySnapshot.forEach((doc) => {
        const docData = doc.data();

        columnData.push(docData[columnName]);
    });

    columnData.unshift(placeholder);

    return columnData;
}

async function generateRowId(tableName: string): Promise<string> {
    return doc(collection(firestoreDb, tableName)).id;
}

async function getTableData(tableName: string, sortByColName: string) {
    const collectionRef = collection(firestoreDb, tableName);

    const q = query(collectionRef, where('isShown', '==', true), orderBy(sortByColName, 'asc'));

    const querySnapshot = await getDocs(q);

    const tableRows: Record<string, DocumentData> = {};

    querySnapshot.forEach((doc) => {
        tableRows[doc.id] = doc.data();
    });

    return tableRows;
}

async function calcClientFee(auction: string, carPrice: string): Promise<number> {
    try {
        // Получение коллекции из Firestore
        const querySnapshot = await getDocs(
            collection(firestoreDb, `${auction.toLowerCase()}_auction_client_fee`)
        );

        if (querySnapshot.empty) {
            return NaN;
        }

        // Поиск подходящего документа
        const rowData = querySnapshot.docs.find((row) => {
            const salePriceRange = row.data()["Cena sprzedaży"];
            if (!salePriceRange) return false;

            const [a, b] = salePriceRange.split("-");
            const [numA, numB] = [parseFloat(a), parseFloat(b)];

            // console.log({ numA, numB });

            if (isNaN(numB)) {
                console.log('we here');
                return +carPrice >= numA;
            }

            return +carPrice >= numA && +carPrice <= numB;
        });

        if (!rowData) {
            return NaN;
        }

        console.log("rowData: ", rowData.data());
        console.log("value: ", Object.values(rowData.data()));
        // Расчет итоговой суммы
        const sum = Object.entries(rowData.data())
            .reduce((sum: number, [rowName, value]) => {
                if (rowName === 'Cena sprzedaży') return sum;

                if (value.endsWith("%")) {
                    const parsePreset = parseFloat(value);
                    return sum + (+carPrice * parsePreset) / 100;
                }
                return sum + parseFloat(value);
            }, 0);

        console.log('sum: ', sum);

        return sum;
    } catch (error) {
        console.error("Ошибка при расчете клиентской комиссии:", error);
        return NaN;
    }
}

console.log('sum: ', calcClientFee('iaai', '100000'));

export {
    subscribeOnTableUpdate,
    subscribeOnTableUpdateFrontEndSort,
    subscribeOnTableSettingsUpdate,
    subscribeOnFirstTableRecord,
    getColumnData,
    generateRowId,
    getFirstTableRecord,
    getTableData
}