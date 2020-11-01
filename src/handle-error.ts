import { error as logError } from "@actions/core";

const handleError = (error: unknown, handle = logError) => {
  if (typeof error !== "string" && !(error instanceof Error)) {
    throw new TypeError(`Caught error of unexpected type: ${typeof error}`);
  }

  handle(error);
};

export { handleError };
