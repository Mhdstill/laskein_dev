import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { existsSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join, parse } from 'path';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { v4 as uuidv4 } from 'uuid';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UploadFileService } from './upload-file.service';

@Controller('upload-file')
@ApiTags('Upload-file')
export class UploadFileController {
  constructor(private readonly _uploadFileService: UploadFileService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const filename: string =
            parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        const ext = extname(file.originalname);
        if (
          ext !== '.png' &&
          ext !== '.jpg' &&
          ext !== '.gif' &&
          ext !== '.pdf' &&
          ext !== '.jpeg'
        ) {
          return callback(
            new BadRequestException('Only .png .jpg .pdf .jpeg allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateUploadFileDto,
  })
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (files.length === 0) {
      throw new BadRequestException('No files were uploaded');
    }

    return {
      files: files.map((file) => ({
        url: `/upload-file/${file.filename}`,
      })),
    };
  }

  @Get(':id')
  async donwload(@Param('id') id: string, @Res() res) {
    // in case we need to change the file name
    // res.set({
    //   'Content-Disposition': 'attachment; filename="test.png"',
    // });
    if (!existsSync(join(process.cwd(), 'upload', id))) {
      throw new NotFoundException('File not found');
    }
    // const file = createReadStream(join(process.cwd(), 'upload', id));
    // return new StreamableFile(file);
    res.sendFile(join(process.cwd(), 'upload', id));
  }
}
