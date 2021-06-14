import Material from '../infra/typeorm/entities/Material';
import IFindChecklistInDayFromProviderDTO from '../dtos/IFindChecklistInDayFromProviderDTO';

export default interface IMaterialsRepository {
  findChecklistInDayFromProvider(
    data: IFindChecklistInDayFromProviderDTO,
  ): Promise<Material[]>;
}
