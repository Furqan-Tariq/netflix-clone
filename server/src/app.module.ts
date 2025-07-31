import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { MoviesModule } from "./movies/movies.module"
import { FavoritesModule } from "./favorites/favorites.module"
import { WatchLaterModule } from "./watch-later/watch-later.module"
import { PrismaModule } from "./prisma/prisma.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    FavoritesModule,
    WatchLaterModule,
  ],
})
export class AppModule {}
