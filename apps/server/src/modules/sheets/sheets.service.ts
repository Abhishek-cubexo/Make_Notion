import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { join } from "path";
import XlsxPopulate from 'xlsx-populate';
import { inputFileConfigs } from "../../utils/inputSheetConfig";
import { outputFileConfigs } from "../../utils/outputSheetConfig";

@Injectable()
export class SheetService {
    
    public async getSheet(file, body){
        if(!file){
            throw new NotAcceptableException('Excel sheet must be provided!')
        }

        const workbook = await XlsxPopulate.fromDataAsync(file.buffer);
        const sheetNames = [];

        workbook.sheets().forEach((sheet) => {
            sheetNames.push(sheet.name());
        });
        const sheet = workbook.sheet(inputFileConfigs[body.input_format].EAN["sheet_name"]);
        
        if(!sheet){
            throw new NotFoundException('No such sheet available!');
        }

        const internalModel = {
            inputSheets: {
                
            }
        };

        const usedRange = sheet.usedRange();

        const startCell = usedRange.startCell();
        const endCell = usedRange.endCell();

        let count = outputFileConfigs[body.output_format].EAN["row"] - 1;
        for (let rowNumber = startCell.rowNumber()-1; rowNumber < endCell.rowNumber(); rowNumber++) {
            let col = outputFileConfigs[body.output_format].EAN["column"];
            count++;
            for (let colNumber = startCell.columnNumber()-1; colNumber <  endCell.columnNumber(); colNumber++) {
                const cell = usedRange.cell(rowNumber, colNumber);
                internalModel.inputSheets[col+count] = cell.value();
                col = String.fromCharCode(col.charCodeAt(0) + 1);
            }
        }

        const excelStream = await this.writeSheet(internalModel);

        return excelStream;
    }

    private async writeSheet(internalModel){
        
        const workbook = await XlsxPopulate.fromFileAsync(join(process.cwd(), 'apps/server/src/assets/products.xlsx'));
        const sheet = workbook.sheet(1);

        for(let key in internalModel.inputSheets){
            sheet.cell(key).value(internalModel.inputSheets[key]);
        }

        const excelStream = await workbook.outputAsync({ stream: true });
        return excelStream;
    }
}