export interface User {
    firstName: string;
    lastName: string;
    userName: string;
    registerDate: string;
    lastLogin: string;
    email: string;
    // validated: boolean; Defined in firebase.User
    profileImage: string; // reference to the image the user has assigned as their profile pic
    publicImages: string; // reference to the collection of the users images they have chosen to make viewable to anyone
    privateImages: string; // reference to the collection of the users images they wish to be invisible to other users
    friendsList: string[]; // list of references to user id's
 }