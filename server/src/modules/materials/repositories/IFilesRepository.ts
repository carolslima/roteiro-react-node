import File from '../infra/typeorm/entities/File';
import ICreateFileDTO from '../dtos/ICreateFileDTO';

export default interface IFilesRepository {
  create(data: ICreateFileDTO): Promise<File>;
  save(material: File): Promise<File>;
  delete(material_id: string): Promise<void>;
  findById(file_id: string): Promise<File | undefined>;
  findAllInMonth(provider_id: string): Promise<File[]>;
}
