
export type PlainObject<T> = {
    [index: string]: T
}

export type AnyPlainObject = PlainObject<any>

export interface ApiOptions {
    endpoint: string
}

export type RequestMethodOptions = {
    name?: string
    body?: string
}

export class Request<TM extends string> {

    private data: PlainObject<{ params?: AnyPlainObject, options?: RequestMethodOptions }> = {}

    constructor(private options: ApiOptions, private type: 'query' | 'mutation') { }

    protected add(name: TM, params: AnyPlainObject = {}, options: RequestMethodOptions = {}) {
        const key = options.name || name;
        if (this.data[key]) {
            throw new Error(`Name '${key}' is already defined`);
        }
        this.data[key] = { params: params, options: options };

        return this;
    }

    exec() {
        const body = this.buildBody();
        return fetch(this.options.endpoint, { method: 'POST', body: body })
            .then(response => response.json());
    }

    private buildBody() {
        return '';
    }
}

export class Query extends Request<'entityById' | 'entitiesByIds'> {
    constructor(options: ApiOptions) {
        super(options, 'query');
    }

    entityById(params: { id: string }, options?: RequestMethodOptions) {
        return this.add('entityById', params, options);
    }
}
