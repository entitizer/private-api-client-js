
import { ApiClient } from '../src';
import { describe, it } from 'mocha';

describe('Query', function () {
    const api = new ApiClient({ endpoint: process.env.ENDPOINT || 'http://localhost:41714/graphql' });
    const query = api.query();
    it('entityById', function (done) {
        query.entityById({ id: 'ENQ41' });
        const data = query.buildRequestBody();
        // console.log(data);
        done();
    });
});
