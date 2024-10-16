import { useEffect } from "react";
import { subscribeOnTableUpdate } from "../services/firebase/firestoreDb";


function useTableSubscriptiontsts <T>(tableName: string, sortByColName: string, updateDataFunc: React.Dispatch<React.SetStateAction<T>>) {
    useEffect(() => {
        const unsubscribeFunc = subscribeOnTableUpdate(
            tableName,
            sortByColName,
            updateDataFunc,
        );

        return unsubscribeFunc;
    }, []);
}

export default useTableSubscriptiontsts;