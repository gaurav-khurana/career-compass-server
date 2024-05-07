export default interface postJobDto {
  id: number;
  company_name: string;
  job_position: string;
  date: string;
  status: string;
  role: string;
  duties: string;
  requirements: string;
}

export interface userDetailsDto {
  id?: number;
  username: string;
  password: string;
}
