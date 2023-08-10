import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { SheetService } from "./sheets.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller()
export class SheetController {

    constructor(public readonly sheetService: SheetService) {};

    @Post('upload-bulk-products')
    @UseInterceptors(FileInterceptor('sheet'))
    public async getSheet(
        @UploadedFile() file,
        @Body() body
    ){
        return this.sheetService.getSheet(file, body);
    }
}