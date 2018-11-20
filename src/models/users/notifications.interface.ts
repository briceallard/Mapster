export interface Notification {
    notification: NotificationType; // see the enum type below
    message: string; // The message associated with the notification
    
    // for example, a friend request may have a standard "<sender> wants to be your friend!"
    // a new message could have the actual message text, or say "<user> has sent you a message!"
    // nearby friend may say "Your friend <other user> is close!"
}

export enum NotificationType {
    FriendRequest,
    NewMessage,
    NearbyFriend
}