/**
 * Provides a generic way of converting JSON objects to a CSV format
 * This thing can handle strings with ,
 */
import IExportObjectToCsv from "./IExportObjectToCsv";

export default class ExportObjectToCsv implements IExportObjectToCsv {
    objectsToCSV = (arr: any): string => {
        if (arr && arr !== undefined && Object.keys(arr).length > 0) {
            const array = [Object.keys(arr[0])].concat(arr);
            return array.map(row =>
                Object.values(row).map(value =>
                    typeof value === 'string' ? JSON.stringify(value) : value).toString()).join('\n');
        }
        return '';

    }
}
