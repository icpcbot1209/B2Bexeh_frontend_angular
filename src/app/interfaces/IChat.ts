export interface IRespChat {
  id: string;
  users: string[];
  msgs: IMsg[];
}

export interface IChat {
  id: string;
  me: any;
  other: any;
  msgs: IMsg[];
}

export interface IMsg {
  senderId: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}
