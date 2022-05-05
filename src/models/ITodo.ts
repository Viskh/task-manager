export interface ITodo {
  _id: string,
  text: string,
  completed: boolean,
  user: string
}

export interface IUser {
  _id: string,
  email: string,
  password: boolean,
  name: string,
  img: string
}