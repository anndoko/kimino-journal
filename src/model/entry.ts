export class Entry {
  id: string;
  title: string;
  text: string;
  img: string;
  avatar: string;
  timestamp: any;
  location: Array<number>;
}

export class Setting {
  dailyNotification: any;
  regularNotification: any;
}