export type ClientRequest = {
  user_id: string;
  user_nit: string | null;
  user_name: string | null;
  user_lastname: string | null;
  date_of_birth: string | null;
  phone_number: string | null;
};

export type UpdateData = {
  user_nit: string | null;
  user_name: string | null;
  user_lastname: string | null;
  date_of_birth: string | null;
  phone_number: string | null;
};

