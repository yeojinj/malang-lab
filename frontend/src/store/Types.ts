export type WordInfo = {
  word: string;
  time: number;
  roomId: number;
};

export type AwardInfo = {
  type: string;
  guest: {
    id: string;
    nickname: string;
    imagePath: string;
    roomId: number;
  };
};
