export type IUserinfo = {
  userId?: number | null;
  nickname?: string;
  avatar?: string;
};
export interface IUserStore {
  userInfo: IUserinfo;
  // eslint-disable-next-line no-unused-vars
  setUserInfo(value: IUserinfo): void;
}

const userStore = (): IUserStore => {
  return {
    userInfo: {},
    setUserInfo: function (value) {
      this.userInfo = value;
    },
  };
};

export default userStore;
