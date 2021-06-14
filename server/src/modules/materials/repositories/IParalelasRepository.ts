import Material from '../infra/typeorm/entities/Material';
import IFindParalelasInDayFromProviderDTO from '../dtos/IFindParalelasInDayFromProviderDTO';

export default interface IParalelasRepository {
  findParalelasInDayFromProvider(
    data: IFindParalelasInDayFromProviderDTO,
  ): Promise<Material[]>;
}
