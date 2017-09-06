
import { Request, ApiOptions, RequestMethodOptions } from './request';

export type QueryActions = 'entityById' | 'entitiesByIds' | 'uniqueNamesByEntityId' | 'entityIdsByKeys' | 'entitize';

export class Query extends Request<QueryActions> {
    constructor(options: ApiOptions) {
        super(options, 'query');
    }

    entityById(params: { id: string }, options?: RequestMethodOptions) {
        return this.add('entityById', { id: { value: params.id, type: 'String!' } }, this.buildOptions('entity', options));
    }
    entitiesByIds(params: { ids: string[] }, options?: RequestMethodOptions) {
        return this.add('entitiesByIds', { ids: { value: params.ids, type: '[String]!' } }, this.buildOptions('entity', options));
    }
    uniqueNamesByEntityId(params: { entityId: string }, options?: RequestMethodOptions) {
        return this.add('uniqueNamesByEntityId', { entityId: { value: params.entityId, type: 'String!' } }, this.buildOptions('uniquename', options));
    }
    entityIdsByKeys(params: { keys: string[] }, options?: RequestMethodOptions) {
        return this.add('entityIdsByKeys', { keys: { value: params.keys, type: '[String]!' } }, this.buildOptions(null, options));
    }
    entitize(params: { context: { text: string, lang: string, country?: string } }, options?: RequestMethodOptions) {
        return this.add('entitize', { context: { value: params.context, type: 'ContextInput!' } }, this.buildOptions('entitize', options));
    }
}

