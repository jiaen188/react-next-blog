import {IronSession} from 'iron-session';
import {IUserinfo} from 'store/userStore';

export type ISession = IronSession & Record<string, any>;

export interface IArticle {
  id: number;
  title: string;
  content: string;
  views: number;
  is_delete: boolean;
  user: IUserinfo;
  create_time: string;
  update_time: string;
}
