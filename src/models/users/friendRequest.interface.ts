export interface FriendRequest {
    fromID: string; // a reference to the user id of the person the user has recived the request from
    status: Status; // see the enum below
}

export enum Status {
    Pending,
    Accepted,
    Declined
}