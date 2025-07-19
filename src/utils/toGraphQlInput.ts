type GraphQLPrimitive = string | number | boolean | null;
type GraphQLValue = GraphQLPrimitive | GraphQLValue[] | GraphQLInput;
interface GraphQLInput {
    [key: string]: GraphQLValue;
}

export function toGraphQLInput(obj: GraphQLInput): string {
    const serialize = (value: GraphQLValue): string => {
        if (value === null) {
            return 'null';
        }
        if (typeof value === 'string') {
            return `"${value.replace(/"/g, '\\"')}"`;
        }
        if (typeof value === 'number' || typeof value === 'boolean') {
            return `${value}`;
        }
        if (Array.isArray(value)) {
            return `[${value.map(v => serialize(v)).join(', ')}]`;
        }
        if (typeof value === 'object') {
            return `{ ${Object.entries(value)
                .map(([k, v]) => `${k}: ${serialize(v)}`)
                .join(', ')} }`;
        }
        return '';
    };

    return Object.entries(obj)
        .map(([key, value]) => `${key}: ${serialize(value)}`)
        .join('\n');
}
