
export type OneEntityType = 'entity' | 'uniquename' | 'entitize';

export type PlainObject<T> = {
    [index: string]: T
}

export type AnyPlainObject = PlainObject<any>

export interface ApiOptions {
    endpoint: string
}

export type RequestMethodOptions = {
    name?: string
    fields?: string
}

export type ApiResult = {
    data: any
    errors?: any[]
}

export type ParamItem = {
    value: any
    type: string
}

export class Request<TM extends string> {

    private data: PlainObject<{ name: string, params?: PlainObject<ParamItem>, options?: RequestMethodOptions }> = {}

    constructor(private options: ApiOptions, private type: 'query' | 'mutation') { }

    protected add(name: TM, params: PlainObject<ParamItem> = {}, options: RequestMethodOptions = {}) {
        const key = options.name || name;
        if (this.data[key]) {
            throw new Error(`Name '${key}' is already defined`);
        }
        this.data[key] = { name: name, params: params, options: options };

        return this;
    }

    exec(): Promise<ApiResult> {
        const body = this.buildRequestBody();
        return fetch(this.options.endpoint, { method: 'POST', body: body, headers: { 'content-type': 'application/json' } })
            .then(response => response.json());
    }

    private formatParamKey(key: string, name: string) {
        return [key, name].join('_');
    }

    private buildQueryParams(): PlainObject<ParamItem> {
        return Object.keys(this.data).reduce<PlainObject<ParamItem>>((result, key) => {
            const data = this.data[key];
            if (!data.params) {
                return result;
            }
            Object.keys(data.params).forEach(name => {
                const paramKey = this.formatParamKey(key, name);
                result[paramKey] = data.params[name];
            });

            return result;
        }, {});
    }

    buildRequestBody(): { query: string, variables: AnyPlainObject } {
        const params = this.buildQueryParams();
        const paramsKeys = Object.keys(params);
        let query = [this.type, 'queryName(' + paramsKeys.map(key => '$' + key + ':' + params[key].type).join(', ') + ')', '{'];
        let fns: any[] = [];
        Object.keys(this.data).forEach(nameKey => {
            const data = this.data[nameKey];
            let fnQuery = [nameKey + ':' + data.name];
            if (data.params) {
                fnQuery.push('(');
                fnQuery.push(Object.keys(data.params).map(pKey => pKey + ':$' + this.formatParamKey(nameKey, pKey)).join(', '));
                fnQuery.push(')');
            }
            if (data.options.fields) {
                fnQuery = fnQuery.concat(['{', data.options.fields, '}']);
            }
            fns.push(fnQuery.join(' '));
        });
        query.push(fns.join(','));
        query.push('}');

        const variables = paramsKeys.reduce<AnyPlainObject>((result, key) => {
            result[key] = params[key].value;
            return result;
        }, {});

        return { query: query.join(' '), variables: variables };
    }

    protected buildOptions(entity: OneEntityType, options?: RequestMethodOptions) {
        options = options || {};
        options.fields = options.fields || defaultFields(entity);
        return options;
    }
}

function defaultFields(type: OneEntityType) {
    switch (type) {
        case 'entity':
            return `id name lang type wikiId wikiTitle`;
        case 'uniquename':
            return `key name lang entityId uniquename`;
        case 'entitize':
            return `concepts {index, value}
            entities {id name lang type wikiId wikiTitle data concepts {index value}}`;
    }
    return null;
}
