import { FriendRequest } from './friendRequest.interface';

export interface Notification {
    toID: string;
    fromID: string;
    notification: NotificationType; // see the enum type below
    // for example, a friend request may have a standard "<sender> wants to be your friend!"
    // a new message could have the actual message text, or say "<user> has sent you a message!"
    // nearby friend may say "Your friend <other user> is close!"
}

export interface Child extends Notification {
    
}

export enum NotificationType {
    FriendRequest,
    NewMessage,
    NearbyFriend
}