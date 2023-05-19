export interface ISignup {
  fullName: string,
  username: string,
  password: string,
  cycleLength: number,
  flowLength: number,
  firstFlow: Date,
}

export interface ILogin {
  username: string,
  password: string,
}

export interface IUserDetails {
  "id": number,
  "fullName": string,
  "username": string,
  "flow": {
    "id": number,
    "lastFlow": Date,
    "cycleLength": number
  },
  "createdAt": Date
}
