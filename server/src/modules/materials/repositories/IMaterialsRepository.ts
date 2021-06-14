import Material from '../infra/typeorm/entities/Material';
import ICreateMaterialDTO from '../dtos/ICreateMaterialDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IUpdateMaterialDTO from '../dtos/IUpdateMaterialDTO';

export default interface IMaterialsRepository {
  create(data: ICreateMaterialDTO[]): Promise<Material[]>;
  save(data: Material[]): Promise<Material[]>;
  update(data: IUpdateMaterialDTO): Promise<Material>;
  offline(data: Material[]): Promise<Material[]>;
  delete(material_id: string): Promise<void>;
  deleteAllMaterialsWithFileId(data: Material[]): Promise<void>;
  findById(material_id: string): Promise<Material | undefined>;
  findByFileId(file_id: string): Promise<Material[] | undefined>;
  findByDate(date: Date, provider_id: string): Promise<Material | undefined>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Material[]>;
}
