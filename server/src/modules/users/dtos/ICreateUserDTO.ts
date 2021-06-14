export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: number;
  provider_id: string;
}
