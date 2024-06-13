import AJV, { type DefinedError, JSONSchemaType } from "ajv/dist/2019";
import schema, { type Options } from "./configuration-schema";

export class RebillyInstrumentsConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Rebilly Instruments Configuration Error";
  }

  trimStack() {
    Error.captureStackTrace(this, RebillyInstrumentsConfigError);
    return this;
  }
}

const ajv = new AJV({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
});

const validate = ajv.compile(schema);

export function sanitize(
  data: object & {
    form?: string | object;
    summary?: string | object;
  },
) {
  // cast data to be only json object
  return Object.assign(JSON.parse(JSON.stringify(data)), {
    // HTMLElement is turned into objects by JSON.stringify
    form: data.form,
    summary: data.summary,
  });
}

export function validateOptions(data: Partial<Options>) {
  const sanitizedData = sanitize(data);
  const valid = validate(sanitizedData);
  if (valid) {
    return sanitizedData;
  }

  (validate.errors as DefinedError[]).forEach((error) => {
    let errorMessage = ``;
    let instancePathReadable = error.instancePath
      .substring(1)
      .replace(/\//gi, ".");
    instancePathReadable = instancePathReadable.replace(
      /\.\d+/gi,
      (match) => `[${match.replace(".", "")}]`,
    );
    if (!instancePathReadable.length) {
      instancePathReadable = "options";
    }

    let nodes: JSONSchemaType<Options>;
    let schemaPath: string[];
    let value: string;
    switch (error.keyword) {
      case "if":
      case "false schema":
        // ignore keywords
        break;
      case "required":
        if (error.schemaPath.match(/(oneOf|anyOf)/)) {
          // ignore and allow their oneOf or anyOf keywords to handle error message
          break;
        }
        errorMessage = `${instancePathReadable} ${error.message}`;
        break;
      case "oneOf":
      case "anyOf":
        console.error(
          new RebillyInstrumentsConfigError(
            `${instancePathReadable} ${error.message}, see schemas below.`,
          ).trimStack(),
        );
        schemaPath = error.schemaPath.replace("#/", "").split("/");
        nodes = schema;
        schemaPath.forEach((item) => {
          nodes = nodes[item];
        });
        nodes.forEach((node: object) => {
          const displayNode = JSON.stringify(node, null, 2);
          console.error(
            `${instancePathReadable} ${error.keyword} schema.\n${displayNode}`,
          );
        });
        break;
      case "enum":
        value = instancePathReadable
          .split(".")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .reduce((acc: any, key) => acc[key], data);
        errorMessage = `${instancePathReadable} ${error.message}: ${error.params.allowedValues}. received: ${value}`;
        break;
      case "dependentRequired":
      case "maxLength":
      case "minItems":
      case "pattern":
        errorMessage = `${instancePathReadable} ${error.message}`;
        break;
      default:
        errorMessage = `Error with ${instancePathReadable} - See error message`;
        console.error(error);
        break;
    }
    if (errorMessage) {
      console.error(
        new RebillyInstrumentsConfigError(errorMessage).trimStack(),
      );
    }
  });

  console.error(
    new RebillyInstrumentsConfigError("Configuration is invalid").trimStack(),
  );
  return null;
}
