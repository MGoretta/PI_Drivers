export const sortDrivers = (drivers, selectedOrder, selectDirection) => {
    let sortedDrivers = [...drivers];
    if (selectedOrder === "name") {
        sortedDrivers.sort((a, b) => {
            const nameA = `${a.name?.forename || a.forename || ""} ${a.name?.surname || a.surname || ""}`;
            const nameB = `${b.name?.forename || b.forename || ""} ${b.name?.surname || b.surname || ""}`;
            const compareOrder = nameA.localeCompare(nameB);
            return selectDirection === "ASC" ? compareOrder : -compareOrder;
        });
    } else if (selectedOrder === "dob") {
        sortedDrivers.sort((a, b) => {
            const dobA = new Date(a.dob);
            const dobB = new Date(b.dob);
            return selectDirection === "ASC" ? dobA - dobB : dobB - dobA;
        });
    }
    return sortedDrivers;
};
