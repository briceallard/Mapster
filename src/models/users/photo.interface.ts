import { Location } from "./location.interface";

export interface Photo {
    image: string; // reference to storage location directory
    tag: string[]; // list of the keywords the photo has been tagged with
    location: Location; // Location object found in "location.interface.ts"
    likes: number; // an integer counter for the number of likes the image has recieved
    comments: string[]; // list of comments users have left on the the photo
    // There may need to be a limit of how long the messages can be.
}