export interface AuthSuccess {
  success: true;
  data: Data;
  token: string;
}

export interface AuthError {
  success: false;
  error: string;
}

export type AuthResponse = AuthSuccess | AuthError;
export interface Data {
  id: string;
  name: string;
  status: string;
  type: string;
  user: User;
  metadata: null;
  plan: string;
  role: string;
  inserted_at: Date;
  updated_at: Date;
  settings: Settings;
  deleted_at: null;
}

export interface Settings {
  "2fa_enabled": boolean;
}

export interface User {
  id: string;
  tag: string;
  metadata: null;
  inserted_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  updated_at: Date;
  confirmed_at: null;
  deleted_at: null;
  phone: string;
  last_login_at: Date;
}
