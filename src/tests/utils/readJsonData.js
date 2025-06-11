

class ReadJson {

    async readJsonData(key, sheetData) {
        let sheetValues;
        let SKeysArray;
        const rowData = new Map();
        let index;
        if (sheetData != null && sheetData != undefined) {
            let lengthOfSheetData = sheetData.rows.length;
            if (lengthOfSheetData) {
                for (let i = 0; i < lengthOfSheetData; i++) {
                    sheetValues = Object.values(sheetData.rows[i]);
                    SKeysArray = Object.keys(sheetData.rows[i])
                    for (let j = 0; j < SKeysArray.length; j++) {
                        if (SKeysArray[j] == "Key" && sheetValues[j] == key) {

                            index = i;
                            cy.log("Key Matched Started Reading row data " + key)
                            for (let k = 0; k < SKeysArray.length; k++) {
                                rowData.set(SKeysArray[k], sheetValues[k])
                            }
                            break;
                        }
                    }
                }
            }
        }
        return rowData;
    }

} export default ReadJson