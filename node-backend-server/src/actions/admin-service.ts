import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as express from 'express';
import * as dbUtils from '../utils/db-utils';

export function setCoordinatesService(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const locationData = req.body;
  dbUtils.setCoordinates(locationData).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    next(err);
  });
};

export function getCoordinatesService(req: express.Request, res: express.Response, next: express.NextFunction): void {
  dbUtils.getCoordinates().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    next(err);
  });
};