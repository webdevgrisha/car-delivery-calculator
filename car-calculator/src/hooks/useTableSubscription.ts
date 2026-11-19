import { useEffect, useRef } from "react";
import { subscribeOnTableUpdate, subscribeOnTableUpdateFrontEndSort } from "../services/firebase/firestoreDb";


type SortType = 'front' | 'back';

function useTableSubscriptiontsts<T>(
    tableName: string,
    sortByColName: string,
    updateDataFunc: React.Dispatch<React.SetStateAction<T>>,
    sortType: SortType = 'back') {

    const updateDataRef = useRef(updateDataFunc);
    updateDataRef.current = updateDataFunc;

    useEffect(() => {
        const subscribeFunc = sortType === 'front'
            ? subscribeOnTableUpdateFrontEndSort
            : subscribeOnTableUpdate;
        const unsubscribeFunc = subscribeFunc(
            tableName,
            sortByColName,
            (data: T) => updateDataRef.current(data),
        );

        return unsubscribeFunc;
    }, [tableName, sortByColName, sortType]);
}

export default useTableSubscriptiontsts;
