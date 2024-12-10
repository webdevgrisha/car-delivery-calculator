import { useEffect } from "react";
import { subscribeOnTableUpdate, subscribeOnTableUpdateFrontEndSort } from "../services/firebase/firestoreDb";


type SortType = 'front' | 'back';

function useTableSubscriptiontsts<T>(
    tableName: string,
    sortByColName: string,
    updateDataFunc: React.Dispatch<React.SetStateAction<T>>,
    sortType: SortType = 'back') {

    const subscribeFunc = sortType === 'front' ? subscribeOnTableUpdateFrontEndSort : subscribeOnTableUpdate;

    useEffect(() => {
        const unsubscribeFunc = subscribeFunc(
            tableName,
            sortByColName,
            updateDataFunc,
        );

        return unsubscribeFunc;
    }, []);
}

export default useTableSubscriptiontsts;