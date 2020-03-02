import * as Promise from 'bluebird';
import * as config from 'config';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express'
import { Stream } from 'stream';
let dbConnOrConfig: any = (config.has('db') && config.get('db')) ||
    (config.has('dbInfo') && config.get('dbInfo')) ||
    (config.has('database') && config.get('database'));
let uri: string;
const uri2 = "mongodb+srv://hawkEye:nopassword@hawkeyes-hhhrr.mongodb.net/test?retryWrites=true"

if (dbConnOrConfig.uri) {
    uri = dbConnOrConfig.uri;
    mongoose.connect(uri, { useNewUrlParser: true }, (err: any) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Succesfully Connected!");
        }
    });
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
} else {
    console.log("Cannot find config uri");
}

export interface Coordinates extends mongoose.Document {
    droneLocation: {
        velocity: number;
        coordinates: {
            x: number;
            y: number;
            z: number;
        }
    },
    droneId: string;
    imageData: any;
};

export const droneSchema = mongoose.Schema({
    droneId: { type: String, required: true },
    droneLocation: { type: Object, required: true },
    imageData: { type: Object, required: false },
});
export const streamSchema = mongoose.Schema({
    droneId: { type: String, required: true },
    imageData: { type: Object, required: false },
});


var coordinates = mongoose.model('coordinates', droneSchema);
var videoStream = mongoose.model('stream', streamSchema);

export function getCoordinates(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        coordinates.find({}, (err, coord) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(coord);
            }
        });
    });
}

export function setCoordinates(locationData: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        coordinates.collection.insertMany(locationData, (err, response) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
}

export function storeVideoStreamData(locationData: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        videoStream.collection.insertMany(locationData, (err, response) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
}

