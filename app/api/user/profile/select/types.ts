export type ClientId = string;

export type ClientRequest = {
  clientId: string;
};

export type ClientProfile = {
  user_id: string;
  user_nit: string | null;
  user_name: string | null;
  user_lastname: string | null;
  date_of_birth: string | null;
  phone_number: string | null;
}[];

export type ServerResponse =
  | { success: false; error: string }
  | { success: true; userProfileData: ClientProfile };
