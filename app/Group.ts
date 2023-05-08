import { Mail } from "./GroupMails"

export interface Group {
    id: number,
    name: string,
    mails: [Mail]
}