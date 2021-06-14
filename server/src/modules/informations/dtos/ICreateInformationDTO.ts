export default interface ICreateInformationDTO {
  content: string;
  all_providers?: boolean;
  user_id_send: string;
  user_id_from?: string;
  provider_id: string;
  read?: boolean;
  type: string;
}
