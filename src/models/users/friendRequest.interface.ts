export interface FriendRequest {
    fromName: string;
    fromID: string;
    toID: string;
    status: Status; // see the enum below
}

export enum Status {
    Pending,
    Accepted,
    Declined
}