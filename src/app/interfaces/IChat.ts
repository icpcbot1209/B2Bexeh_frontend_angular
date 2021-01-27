export interface IRespChat {
  id: string;
  users: string[];
  msgs: IMsg[];
  lastMessageTime: string;
  date: string;
}

export interface IChat {
  id: string;
  me: any;
  other: any;
  msgs: IMsg[];
  lastMessageTime: string;
  date: string;
}

export interface IMsg {
  senderId: string;
  content: any;
  timestamp: number;
  isRead: boolean;
}
