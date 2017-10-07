
import { Request, ApiOptions, RequestMethodOptions } from './request';

export type MutationActions = 'entityCreate' | 'entityUpdate' | 'uniqueNameCreate' | 'uniqueNameDelete' | 'entityImport';

export class Mutation extends Request<MutationActions> {
    constructor(options: ApiOptions) {
        super(options, 'mutation');
    }

    entityCreate(params: { data: any }, options?: RequestMethodOptions) {
        return this.add('entityCreate', { data: { value: params.data, type: 'EntityInput!' } }, this.buildOptions('entity', options));
    }
    entityUodate(params: { data: any }, options?: RequestMethodOptions) {
        return this.add('entityUpdate', { data: { value: params.data, type: 'EntityUpdateInput!' } }, this.buildOptions('entity', options));
    }
    uniqueNameCreate(params: { data: any }, options?: RequestMethodOptions) {
        return this.add('uniqueNameCreate', { data: { value: params.data, type: 'UniqueNameInput!' } }, this.buildOptions('uniquename', options));
    }
    uniqueNameDelete(params: { id: { key: string, entityId: string } }, options?: RequestMethodOptions) {
        return this.add('uniqueNameCreate', { id: { value: params.id, type: 'UniqueNameIDInput!' } }, this.buildOptions('uniquename', options));
    }
    entityImport(params: { id: string, lang: string }, options?: RequestMethodOptions) {
        return this.add('entityImport', { id: { value: params.id, type: 'String!' }, lang: { value: params.lang, type: 'String!' } }, this.buildOptions('entity', options));
    }
}

