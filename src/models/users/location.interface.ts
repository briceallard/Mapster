export interface Location {
    // We don't want to use a GeoLocation object to save the locations as there
    // is a bunch of other data associated with it that we don't care about and 
    // would just bloat request responses.
    lat: number; // latitude
    lon: number; // longitude
    timestamp: number; // timestamp of where the location was saved
}