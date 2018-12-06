import { Notification } from './notifications.interface'

export interface FriendRequest extends Notification {
    status: Status; // see the enum below
}

export enum Status {
    Pending,
    Accepted,
    Declined
}