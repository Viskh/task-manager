export interface ITodo {
  _id: string,
  title: string,
  text: string,
  completed: boolean,
  user: string,
  category: string
}

export interface ICategory {
  _id: string,
  name: string
}

export interface IUser {
  _id: string,
  email: string,
  password: boolean,
  name: string,
  img: string
}