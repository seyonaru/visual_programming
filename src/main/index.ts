import { readFile, writeFile } from 'node:fs/promises';

export function csvToJSON(input: string[], delimiter: string): object[] {
    if (!Array.isArray(input) || input.length === 0) {
        throw new Error('input cannot be non-empty');
    }

    if(typeof delimiter != 'string' || delimiter.length === 0) {
        throw new Error('delimiter cannot be non-empty');
    }
    const firstline = input[0];
    if(!firstline) {
        throw new Error('first line is undefined');
    }

    const headers: string[] = firstline.split(delimiter);

    if(headers.length === 0) {
        throw new Error("headers cannot be non-empty");
    }

    const result: object[] = [];

    for (let i = 0; i < input.length; i++){
        const currentline = input[i];
        if(!currentline) {
            continue;
        }

        const values = currentline.split(delimiter);

        if(values.length != headers.length) {
            throw new Error(`Row ${i} has ${values.length} values, expected ${headers.length}`);
        }

        const obj : Record<string, string> = {};
        for (let j = 0; j < headers.length; j++){
            const header = headers[j];
            const value = values[j];
            if (header !== undefined && value !== undefined) {
                obj[header] = value;
            }
        }

        result.push(obj);
    }
    return result;
}

export async function formatCSVFiletoJSONFile (input: string, output: string, delimiter: string): Promise<void> {
    const CSVdata = await readFile(input, 'utf-8');

    const lines = CSVdata.trim().split('\n');

    const JSONdata = csvToJSON(lines, delimiter);

    const JSONoutput = JSON.stringify(JSONdata, null, 2);

    await writeFile(output, JSONoutput, 'utf-8');
}