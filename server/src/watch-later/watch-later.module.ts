import { Module } from '@nestjs/common';
import { WatchLaterController } from './watch-later.controller';
import { WatchLaterService } from './watch-later.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WatchLaterController],
  providers: [WatchLaterService],
})
export class WatchLaterModule {}
