import { Controller, Get, Redirect, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';

@Controller('/')
export class GeneralResolversController {
  @Get('/download-table')
  getTable(@Res({ passthrough: true }) res): StreamableFile {
    const file = createReadStream('./test.xlsx');
    file.addListener('end', () => {
      return res.redirect('/download-table1')
    })
    res.set({
      'Content-Type': 'application/xlsx',
      'Content-Disposition': 'attachment; filename="table.xlsx',
    });
    return new StreamableFile(file);
  }

  
}
