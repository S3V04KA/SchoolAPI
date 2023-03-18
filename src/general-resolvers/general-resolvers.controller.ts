import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';

@Controller('download-table')
export class GeneralResolversController {
  @Get('/')
  getTable(@Res({ passthrough: true }) res): StreamableFile {
    const file = createReadStream('./test.xlsx');
    res.set({
      'Content-Type': 'application/xlsx',
      'Content-Disposition': 'attachment; filename="table.xlsx',
    });
    return new StreamableFile(file);
  }
}
