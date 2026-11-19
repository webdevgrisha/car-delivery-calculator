function reformatLocation(location: string, auction: string) {
    if (location.trim() === '') return location;

    return auction === 'iaai' ? reformatIAAILocation(location) : reformatCopartLocation(location);
}

function reformatIAAILocation(location: string) {
    const locArr = location.split(' ');

    const locName = locArr.slice(0, -1);
    const state = locArr.at(-1);

    const newLoc = `${locName} ${state} - IAAI`;

    return newLoc;
}

function reformatCopartLocation(location: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, _, ...locName] = location.split(' ');

    const reformatName = locName.map((name) => name[0] + name.slice(1).toLowerCase()).join(' ');

    const newLoc = `${reformatName} (${state}) - Copart`;

    return newLoc;
}


export default reformatLocation;