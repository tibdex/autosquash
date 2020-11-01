import { debug, getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

import { autosquash } from "./autosquash";
import { handleError } from "./handle-error";

const run = async () => {
  try {
    const autosquashLabel = getInput("label", { required: true });
    const token = getInput("github_token", { required: true });
    debug(JSON.stringify(context, undefined, 2));
    const github = getOctokit(token);
    await autosquash({ autosquashLabel, context, github });
  } catch (error: unknown) {
    handleError(error, setFailed);
  }
};

void run();
