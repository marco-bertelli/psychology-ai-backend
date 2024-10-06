import * as _ from 'lodash';
import logger from '../logger/index';

export function generateActions(actions: any, model: any, populationOptions?: any[]) {
    actions.index = async function ({ querymen: { query, cursor } }: any, res: any) {

        const results = await model.find(query)
            .skip(cursor.skip)
            .limit(cursor.limit)
            .sort(cursor.sort)
            .populate(populationOptions)
            .exec();

        const count = await model.countDocuments(query);

        res.set('Odin-Count', count);
        res.send(results);
    };

    actions.show = async function ({ params: { id } }: any, res: any) {

        const result = await model.findById(id).populate(populationOptions);

        if (!result) {
            return res.status(404).send();
        }

        res.send(result);
    };

    actions.create = async ({ body }: any, res: any) => {
        let createdEntity;

        try {
            createdEntity = await model.create(body);
        } catch (err) {
            logger.error(err);
            return res.status(400).send(err);
        }

        res.send(createdEntity);
    };

    actions.update = async ({ body, params: { id } }: any, res: any, next: any) => {
        const entity = await model.findById(id)

        if (!entity) {
            return res.status(404).send();
        }

        for (const key in body) {
            if (
                !_.isUndefined(body[key]) &&
                entity[key] !== body[key]
            ) {
                entity[key] = null;
                entity[key] = body[key];
                entity.markModified(key);
            }
        }

        await entity.save();

        res.send(entity)
    };

    actions.destroy = async function ({ params: { id } }: any, res: any) {
        const entity = await model.findById(id);

        if (_.isNil(entity)) {
            return res.status(404).send();
        }

        await entity.remove();

        res.status(204).send();
    };

    return actions;
}