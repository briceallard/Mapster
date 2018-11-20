export interface Message {
    fromID: string; // reference to the user id the message was sent from
    toID: string; // reference to the user id the message is intended for
    message: string; // the message itself
    read: boolean; // has the message been read or not (or at least opened, we know how that goes)
    timestamp: string; // timestamp of when the message was sent
}