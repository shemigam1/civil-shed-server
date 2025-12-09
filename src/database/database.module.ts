import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        // port: configService.get<number>('DB_PORT'),
      }),
      inject: [ConfigService],
    }),
  ],
  // providers: [
  //   {
  //     provide: DataSource,
  //     inject: [],
  //     useFactory: async () => {
  //       try {
  //         const dataSource = new DataSource({
  //           type: 'postgres',
  //           url: process.env.DATABASE_URL,
  //           // ssl: true,
  //           entities: [
  //             /*list of entities*/
  //           ],
  //         });
  //         await dataSource.initialize(); // initialize the data source
  //         console.log('Database connected successfully');
  //         return dataSource;
  //       } catch (error) {
  //         console.log('Error connecting to database');
  //         throw error;
  //       }
  //     },
  //   },
  // ],
})
export class DatabaseModule {}
