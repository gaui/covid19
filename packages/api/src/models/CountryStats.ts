import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Covid19ProviderCountryStats } from '../schema';

@ObjectType({ description: 'Country statistics' })
export class CountryStats implements Covid19ProviderCountryStats {
  @Field(() => Int, { description: 'Active cases' })
  active: number;

  @Field(() => Int, { description: 'Total cases' })
  cases: number;

  @Field(() => Int, { description: 'Cases today' })
  todayCases: number;

  @Field(() => Int, { description: 'Total deaths' })
  deaths: number;

  @Field(() => Int, { description: 'Deaths today' })
  todayDeaths: number;

  @Field(() => Int, { description: 'Total recovered' })
  recovered: number;

  @Field(() => Int, { description: 'Critical cases' })
  critical: number;

  @Field(() => Int, { description: 'In quarantine', nullable: true })
  quarantineIn?: number;

  @Field(() => Int, { description: 'Finished quarantine', nullable: true })
  quarantinePost?: number;

  @Field(() => Int, { description: 'In isolation', nullable: true })
  isolated?: number;

  @Field(() => Int, { description: 'Finished isolation', nullable: true })
  isolatedPost?: number;

  @Field(() => Int, { description: 'In hospital', nullable: true })
  hospitalized?: number;

  @Field(() => Int, { description: 'Total domestic samples', nullable: true })
  samples?: number;

  @Field(() => Int, { description: 'Total border samples', nullable: true })
  samplesBorder?: number;
}
