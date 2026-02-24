import { Controller, Get } from '@nestjs/common';
import { StreamService } from './stream.service';

@Controller('streams')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get()
  findAll() {
    return this.streamService.findAll();
  }
}