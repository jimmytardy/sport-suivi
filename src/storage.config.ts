import { HttpException, HttpStatus } from '@nestjs/common'
import { extname, join } from 'path'
import { diskStorage } from 'multer'
import { existsSync, mkdirSync } from 'fs'
import { v4 as uuid } from 'uuid'
import { IRequestConnected } from './interfaces/request.interface'
import { ConfigService } from '@nestjs/config'

// Multer upload options
export const multerModuleFactory  = (configService: ConfigService) => ({
    dest: configService.get<string>('storage'),
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        // @ts-ignore
        destination: (req: IRequestConnected, _: any, cb: Function) => {
            const uploadPath = join(configService.get<string>('storage'), req.user._id.toString())
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath)
            }
            cb(null, uploadPath)
        },
        // File modification details
        filename: (_: any, file: any, cb: Function) => {
            // Calling the callback passing the random name generated with the original extension name
            console.log('new name', `${uuid()}${extname(file.originalname)}`)
            cb(null, `${uuid()}${extname(file.originalname)}`)
        },
    }),
})
