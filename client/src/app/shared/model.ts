export interface Content {
  _id?: string;
  title: string;
  body: string;
  category: Category;
  attachment: File;
}

export interface User {
  _id?: any;
  email?: string;
  username: string;
}

export interface Category {
  _id?: string;
  name: string;
}
