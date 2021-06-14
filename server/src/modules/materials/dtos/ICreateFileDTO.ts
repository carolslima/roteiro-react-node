export default interface ICreateFileDTO {
  name: string;
  path: string;
  size: number;
  user_id_create: string;
  provider_id: string;
  schedule: Date;
  canceled?: boolean;
}
