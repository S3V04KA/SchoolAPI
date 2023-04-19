import { Controller, Get, Redirect, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ComplexService } from 'src/complex/complex.service';

@Controller('/')
export class GeneralResolversController {
  constructor(private readonly cService: ComplexService) {}

  // @Redirect('/download-table1')
  @Get('/download-table')
  getTable(@Res({ passthrough: true }) res) {
    this.cService.getComplex();

    const file = createReadStream('./test.xlsx');
    file.addListener('end', () => {
      // res.status(200).send('Загрузка началась')
    });
    res.set({
      'Content-Type': 'application/xlsx',
      'Content-Disposition': 'attachment; filename="table.xlsx',
    });
    return new StreamableFile(file);
  }

  @Get('/get-current')
  getCurrent(@Res({ passthrough: true }) res) {
    return this.cService.getActual(-1).then(() => {
      const file = createReadStream('./test.xlsx');
      file.addListener('end', () => {
        // res.status(200).send('Загрузка началась')
      });
      res.set({
        'Content-Type': 'application/xlsx',
        'Content-Disposition': 'attachment; filename="table.xlsx',
      });
      return new StreamableFile(file);
    });
  }
}
