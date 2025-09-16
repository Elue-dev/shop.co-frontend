export interface Chat {
  id: string;
  last_message: LastMessage;
  last_message_at: string;
  user1: ChatUser;
  user2: ChatUser;
}

interface LastMessage {
  content: string;
  id: string;
  read_at: string;
  sender_id: string;
}

interface ChatUser {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
}
