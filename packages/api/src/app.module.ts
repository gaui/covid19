import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { provider } from '../../core';
import { CountryStatsResolver } from './resolvers/stats';

@Module({
  imports: [
    GraphQLModule.forRoot({
      path: '/',
      useGlobalPrefix: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true
    })
  ],
  providers: [
    { provide: 'COVID19Provider', useValue: provider },
    CountryStatsResolver
  ]
})
export class AppModule {}
