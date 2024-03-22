export interface FormData {
  id?: string;
  username?: string;
  email: string;
  password: string;
  dob?: Date;
  phone?: number;
  profilePicture?: string;
  gender?: string;
  interest?: string[];
  status?: boolean;
  createdAt?: Date;
  }

  export interface reduxData {
    _id: string;
    username: string;
    email: string;
    password: string;
    dob?: Date;
    phone?: number;
    profilePicture?: string;
    gender?: string;
    interest?: string[];
    status?: boolean;
    createdAt?: Date;
  }
  
  