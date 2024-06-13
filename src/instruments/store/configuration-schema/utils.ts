/*
This function is implemented to fix typechecker issues for JSONSchemaType - it should be removed once new major version of AJV fixes the issue below.
@see https://github.com/ajv-validator/ajv/issues/1664
*/
export function optional<T>(schema: T): T & { nullable: true } {
  return schema as T & { nullable: true };
}
