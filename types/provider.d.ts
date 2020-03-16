type StructureDataFn = (data: InfographicData) => InfographicDataTransformed;
type ParseDataFn = (data: string) => InfographicData;
type GetRemoteDataFn = () => Promise<string>;
