import { Photo } from './photo.interface'

export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    fullName: string;
    userName: string;
    registerDate: number;
    lastLogin: number;
    email: string;
    caseSensitive: string[]; // used for querying items in user profile that need to be case sensitive
    profileImage: string; // reference to the image the user has assigned as their profile pic
    publicImages: Photo[]; // reference to the collection of the users images they have chosen to make viewable to anyone
    privateImages: Photo[]; // reference to the collection of the users images they wish to be invisible to other users
    friendsList: string[]; // list of references to user id's
    city: string;
    country: string;
    gender: string;
    age: number;
    bio: string;
    private: boolean;
 }