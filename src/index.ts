import { debug, setFailed } from "@actions/core";
import { context, GitHub } from "@actions/github";

import { autosquash } from "./autosquash";

const run = async () => {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (token === undefined) {
      throw new Error("Missing GITHUB_TOKEN environment variable");
    }

    debug(JSON.stringify(context, null, 2));
    const github = new GitHub(token);
    await autosquash({ context, github });
  } catch (error) {
    setFailed(error.message);
  }
};

run();
