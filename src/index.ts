import { debug, getInput, setFailed } from "@actions/core";
import { context, GitHub } from "@actions/github";

import { autosquash } from "./autosquash";

const run = async () => {
  try {
    const token = getInput("github_token", { required: true });
    debug(JSON.stringify(context, null, 2));
    const github = new GitHub(token);
    await autosquash({ context, github });
  } catch (error) {
    setFailed(error.message);
  }
};

run();
