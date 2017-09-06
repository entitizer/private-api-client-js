
import 'whatwg-fetch';
import { ApiOptions } from './request';
import { Query } from './query';
import { Mutation } from './mutation';

export class ApiClient {
    constructor(private options: ApiOptions) { }

    query() {
        return new Query(this.options);
    }
    mutation() {
        return new Mutation(this.options);
    }
}
