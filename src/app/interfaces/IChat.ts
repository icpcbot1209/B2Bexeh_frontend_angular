import { IUser } from './IUser';

export interface IRespChat {
  id: string;
  users: string[];
  msgs: IMsg[];
  lastMessageTime: string;
  date: string;
}

export interface IChat {
  id: string;
  me: IUser;
  other: IUser;
  msgs: IMsg[];
  lastMessageTime: string;
  date: string;
}

export interface IMsg {
  senderId: string;
  content: any; // string || { action: string; value: any }
  timestamp: number;
  isRead: boolean;
}
