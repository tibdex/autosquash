import { debug, getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

import { autosquash } from "./autosquash";

const run = async () => {
  try {
    const autosquashLabel = getInput("label", {required: true});
    const token = getInput("github_token", { required: true });
    debug(JSON.stringify(context, undefined, 2));
    const github = getOctokit(token);
    await autosquash({ autosquashLabel, context, github });
  } catch (error) {
    setFailed(error.message);
  }
};

void run();
