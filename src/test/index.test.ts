import {describe, it, expect, vi} from 'vitest'
import {csvToJSON, formatCSVFiletoJSONFile} from '../main/index'
import {writeFile, readFile} from 'node:fs/promises'
import { afterEach, beforeEach } from 'node:test';

vi.mock('fs/promises');

describe('Convertion CSV type to JSON type', () => {
    describe('Correct data', ()=> { 
        it('Converts correctly with ;', () => {
            const input = ['p1;p2;p3;p4', '1;A;b;c', '2;B;v;d'];
            const result = csvToJSON(input, ';');

            expect(result).toEqual([
                { p1: '1', p2: 'A', p3: 'b', p4: 'c' },
                { p1: '2', p2: 'B', p3: 'v', p4: 'd' }
            ]);
        })

        it('Converts correctly with ,', () => {
            const input = ['p1,p2,p3,p4', '1,A,b,c', '2,B,v,d'];
            const result = csvToJSON(input, ',');

            expect(result).toEqual([
                { p1: '1', p2: 'A', p3: 'b', p4: 'c' },
                { p1: '2', p2: 'B', p3: 'v', p4: 'd' }
            ]);
        });

        it('returns empty array if only headers', () => {
            const input = ['p1;p2;p3,;p4'];
            const result = csvToJSON(input, ';');

            expect(result).toEqual([]);
        })
    });
    
    describe('Incorrect data', ()=> {
        it('Throws empty array error', ()=> {
            expect(csvToJSON([], ';')).toThrow('input cannot be non-empty')
        });

        it('Throws non-array error', ()=> {
            expect(csvToJSON('non-array' as any, ';')).toThrow('input cannot be non-empty');
        });

        it('Throws empty delimiter error', ()=> {
            const input = ['p1;p2;p3;p4', '1;A;b;c', '2;B;v;d'];
            expect(csvToJSON(input, '')).toThrow('delimiter cannot be non-empty');
        });

        it('Throws incorrect delimiter error', ()=> {
            const input = ['p1;p2;p3;p4', '1;A;b;c', '2;B;v;d'];

            expect(csvToJSON(input, null as any)).toThrow('delimiter cannot be non-empty');
        });

        it('Throws incomparible rows error', ()=> {
            const input = ['p1;p2;p3;p4', '1;A'];

            expect(csvToJSON(input, ';')).toThrow();
        });
    });
});

describe('Formatting files', ()=> {
    const mockReadFile = vi.mocked(readFile);
    const mockWriteFile = vi.mocked(writeFile);

    beforeEach(() => {
        vi.clearAllMocks();
    })

    afterEach(()=> {
        vi.resetAllMocks();
    })

    it('Works correctly', async ()=> {
        const CSVdata = 'p1;p2;p3;p4\n1;A;b;c\n2;B;v;d';
        const expectedResult = JSON.stringify([
            { p1: '1', p2: 'A', p3: 'b', p4: 'c' },
            { p1: '2', p2: 'B', p3: 'v', p4: 'd' }
        ], null, 2);

        mockReadFile.mockResolvedValue(CSVdata);

        await formatCSVFiletoJSONFile('input.csv', 'output.json', ';');

        expect(mockReadFile).toHaveBeenCalledTimes(1);
        expect(mockReadFile).toHaveBeenCalledWith('input.csv', 'utf-8');

        expect(mockWriteFile).toHaveBeenCalledTimes(1);
        expect(mockWriteFile).toHaveBeenCalledWith('output.json', expectedResult, 'utf-8');
    });

    it('Throws read file error', async ()=> {
        mockReadFile.mockRejectedValue(new Error('file not found'));

        await expect(formatCSVFiletoJSONFile('nonexicting.csv', 'output.json', ';'))
            .rejects
            .toThrow('file not found');

        expect(mockWriteFile).not.toHaveBeenCalled();
    });

    it('Throws incorrect CSV file error', async ()=> {
        mockReadFile.mockResolvedValue('p1;p2;p3;p4\n1;2');

        await expect(formatCSVFiletoJSONFile('input.csv', 'output.json', ';'))
            .rejects
            .toThrow();

        expect(mockWriteFile).not.toHaveBeenCalled();
    });

    it('Gets empty CSV file', async ()=> {
        const CSVdata = 'p1;p2;p3;p4';
        mockReadFile.mockResolvedValue(CSVdata);

        await formatCSVFiletoJSONFile('input.csv', 'output.json', ';');

        expect(mockWriteFile).toHaveBeenCalled();

        const callArgs = mockWriteFile.mock.calls[0];
        const JSONdata = callArgs[1] as string;
        const parsed = JSON.parse(JSONdata);

        expect(parsed).toEqual([]);
    })
})



