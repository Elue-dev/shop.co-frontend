export type Message = {
  id: string;
  content: string;
  sender: Sender;
  inserted_at: string;
  read_at: string | null;
};

export interface Sender {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
}
