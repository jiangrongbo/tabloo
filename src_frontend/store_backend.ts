import axios from "axios";

import {StoreInterface, DataFetchOptions, TableData} from "./store";


function transformValue(x: any): any {
    if (x === "inf") {
        return Infinity;
    } else if (x === "-inf") {
        return -Infinity;
    } else {
        return x;
    }
}


export class StoreBackend implements StoreInterface {
    url = "http://47.99.176.147:5000/"

    async fetchColumns(): Promise<string[]> {
        let response = await axios.get(`${this.url}/api/get_columns`)
        return response.data as string[];
    }

    async fetchNumPages(paginationSize: number, filter?: string): Promise<number> {
        let response = await axios.get(`${this.url}/api/get_num_pages`, {
            params: {
                paginationSize: paginationSize,
                filter: filter,
            },
        })
        return response.data as number;
    }

    async fetchData(opts: DataFetchOptions): Promise<TableData> {
        let response = await axios.get(`${this.url}/api/get_data`, {
            params: opts
        })
        console.log("Received response...");
        /*
        let tableData = response.data;
        console.log(tableData)
        let transformedData = fn.mapEntries(tableData, (k, v) => ({
          columnName: k,
          values: v as string[],
        }))
        console.log(transformedData)
        */
        if (typeof response.data === "string") {
            // Ugly axios bug: It swallows JSON.parse exceptions...
            // https://github.com/axios/axios/issues/1723
            // Try explicit parse to see exception...
            let parsed = JSON.parse(response.data) as TableData;
            return parsed;
        }
        let parsed = response.data as TableData;

        // Transform values to account for JSON sentinels
        for (let j = 0; j < parsed.length; j++) {
            for (let i = 0; i < parsed[j].values.length; i++) {
                parsed[j].values[i] = transformValue(parsed[j].values[i]);
            }
        }

        return parsed;
    }

}
