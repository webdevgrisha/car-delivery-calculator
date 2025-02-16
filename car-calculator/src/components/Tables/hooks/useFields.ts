import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useState } from "react";
// import { FieldInfo } from "../../CustomTable/types";
import { AsyncFieldInfo } from "../interfaces";

function useFields(createFieldsFunc: () => AsyncFieldInfo[]) {
    const [getFields] = useState(() => createFieldsFunc());
    const [fields, setFields] = useState<AsyncFieldInfo[]>(() => initFields(getFields));

    useEffect(() => {
        const optionPromise: Promise<string[]>[] = getOptionPromise(getFields);

        Promise.all(optionPromise).then((parseOption: string[][]) => {
            const newFields = updateOption(getFields, parseOption);

            setFields(newFields);
        });
    }, []);

    return fields;
}

function initFields(getFields: AsyncFieldInfo[]) {
    const filedCopy: AsyncFieldInfo[] = cloneDeep(getFields);
    console.log('filedCopy: ', filedCopy);

    filedCopy.forEach((field: AsyncFieldInfo) => {
        if (field.tagName === 'input') return;

        if (Array.isArray(field.fieldConfig.selectionOptions)) return;

        field.fieldConfig.selectionOptions = [];
    });

    return filedCopy;
}

function getOptionPromise(getFields: AsyncFieldInfo[]) {
    const promiseArr = getFields.map((field: AsyncFieldInfo) => {
        if (field.tagName === 'input') return;

        if (Array.isArray(field.fieldConfig.selectionOptions)) return;

        return field.fieldConfig.selectionOptions;
    }).filter((value) => value !== undefined);

    return promiseArr;
}

function updateOption(getFields: AsyncFieldInfo[], parseOption: string[][]) {
    let currOption: number = 0;

    const filedCopy: AsyncFieldInfo[] = cloneDeep(getFields);

    filedCopy.forEach((field: AsyncFieldInfo) => {
        if (field.tagName === 'input') return;

        if (Array.isArray(field.fieldConfig.selectionOptions)) return;

        field.fieldConfig.selectionOptions = parseOption[currOption];

        currOption++;
    });

    return filedCopy;
}

export default useFields;