
import 'whatwg-fetch';
import { Query, ApiOptions } from './request';

export class ApiClient {
    constructor(private options: ApiOptions) { }

    query() {
        return new Query(this.options);
    }
}
