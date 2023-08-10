import { Module } from "@nestjs/common";
import { SheetController } from "./sheets.controller";
import { SheetService } from "./sheets.service";
import { MulterModule } from "@nestjs/platform-express";    
import { memoryStorage } from 'multer';


@Module({
    imports: [
        MulterModule.register({
            storage: memoryStorage()
        })
    ],
    controllers: [SheetController],
    providers: [SheetService]
})

export class SheetsModule {};