export default interface ICreateMaterialDTO {
  cm?: number;
  title?: string;
  duration?: number;
  type?: string;
  client?: string;
  signal_id?: string;
  position?: string;
  program?: string;
  include?: boolean;
  user_id_create: string;
  user_id_update: string;
  status: boolean;
  blank: boolean;
  details?: string;
  provider_id: string;
  list_position: number;
  file_id: string;
  schedule: Date;
}
