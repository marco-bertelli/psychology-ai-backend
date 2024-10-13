import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';

import logger from '../logger/index';
import * as _ from 'lodash';

export function generateActions<T>(model: Model<T>, populationOptions?: string[]) {
    const actions: Record<string, Function> = {};

    actions.index = async function ({ querymen: { query, cursor } }: any, res: Response) {
        const resultsPromise = model.find(query)
            .skip(cursor.skip)
            .limit(cursor.limit)
            .sort(cursor.sort)
            .populate(populationOptions)
            .exec();

        const countPromise = model.countDocuments(query);

        const [results, count] = await Promise.all([resultsPromise, countPromise]);

        res.set('Odin-Count', count as unknown as string);
        res.send(results);
    };

    actions.show = async function ({ params: { id } }: Request, res: Response) {

        const result = await model.findById(id).populate(populationOptions);

        if (!result) {
            return res.status(404).send();
        }

        res.send(result);
    };

    actions.create = async ({ body }: Request, res: Response) => {
        let createdEntity;

        try {
            createdEntity = await model.create(body);
        } catch (err) {
            logger.error(err);
            return res.status(400).send(err);
        }

        const entity = await model.findById(createdEntity._id).populate(populationOptions);

        res.send(entity);
    };

    actions.update = async ({ body, params: { id } }: Request, res: Response) => {
        const entity = await model.findById(id) as Document<T>

        if (!entity) {
            return res.status(404).send();
        }

        for (const key in body) {
            if (
                !_.isUndefined(body[key]) &&
                entity.get(key) !== body[key]
            ) {
                (entity as any)[key] = null;
                (entity as any)[key] = body[key];
                entity.markModified(key);
            }
        }

        await entity.save();

        res.send(entity)
    };

    actions.destroy = async function ({ params: { id } }: Request, res: Response) {
        const entity = await model.findById(id);

        if (_.isNil(entity)) {
            return res.status(404).send();
        }

        await entity.remove();

        res.status(204).send();
    };

    return actions;
}