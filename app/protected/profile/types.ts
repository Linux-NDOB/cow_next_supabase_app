export type ServerResponse = {
  sucess: boolean;
  data: {
    data: [
      {
        user_id: string;
        user_nit: string;
        user_name: string;
        user_lastname: string;
        date_of_birth: Date;
        phone_number: string;
      },
    ];
  }[];
};

export type RequestedData =
  | {
      user_id: string;
      user_nit: string;
      user_name: string;
      user_lastname: string;
      date_of_birth: Date;
      phone_number: string;
    }[]
  | null;
