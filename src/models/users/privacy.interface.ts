export interface Privacy {
    viewAbility: Allowed; // the type of user as related the primary user that can see their activities, see enum below
    blockedUsers: string[]; // list of references to user id's 
}

export enum Allowed {
    All,
    Friends,
    None
}