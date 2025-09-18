export type Message = {
  id: string;
  content: string;
  sender: Sender;
  is_deleted: boolean;
  inserted_at: string;
  read_at: string | null;
};

export interface Sender {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
}

export interface DeleteMessage {
  chat_id: string;
  message_id: string;
}
