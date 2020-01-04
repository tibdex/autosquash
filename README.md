<h1 align="center">
  <img src="assets/autosquash.png" height="250" width="250" alt="Autosquash logo; adapted from https://dribbble.com/shots/2767743-WALL-E"/>
  <p>Autosquash</p>
</h1>

Autosquash automatically updates and merges your pull requests.

Autosquash is a simple and opinionated [JavaScript GitHub action](https://help.github.com/en/articles/about-actions#javascript-actions) integrating especially well in repositories with [branch protections](https://help.github.com/en/articles/about-protected-branches) with [strict status checks](https://help.github.com/en/articles/types-of-required-status-checks) protecting against [semantic conflicts](https://bors.tech/essay/2017/02/02/pitch/).

Pull requests with the `autosquash` label will be:

- [updated](https://developer.github.com/changes/2019-05-29-update-branch-api/) when new commits land on their base branch and make their status checks outdated.
- [squashed and merged](https://help.github.com/en/articles/about-pull-request-merges#squash-and-merge-your-pull-request-commits) once all the branch protections are respected:
  - The description of the pull request will become the message of the squashed commit.
  - The creator of the pull request will be the main author of the squashed commit. If other people authored commits in the pull request, they will be added as [co-authors](https://github.blog/changelog/2019-12-19-improved-attribution-when-squashing-commits/) of the squashed commit.

# Usage

- Add this [.github/workflows/autosquash.yml](.github/workflows/autosquash.yml) to your repository.
- [Add the `autosquash` label](https://help.github.com/en/articles/creating-a-label) to pull requests you want to merge.

# Why squash and merge?

Autosquash favors squash and merge over regular merge or rebase and merge for the follwing reasons:

## GitHub is merge oriented rather than rebase oriented

GitHub handles merge commits graciously. Indeed, it has a [web interface for resolving merge conflicts](https://help.github.com/en/articles/resolving-a-merge-conflict-on-github) and it helps the reviewer not wasting time reviewing conflict-free merge commits by displaying this:

![](assets/clean-merge.png)

On the other hand, rebasing a pull request rewrites its Git history and GitHub doesn't like that. For instance, clicking on a notification concerning changes in a pull request with rewritten history will give you this:

![](assets/disappeared.png)

The same thing will happen if you click on the file link of a [line comment](https://help.github.com/en/articles/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request) but the pull request was rebased since the comment was posted.

Another minor inconvenience with rebase and merge is that it's harder, when looking at the list of `master` commits, to know which commit comes from which pull request. You have to go to the actual commit page for GitHub to show you which pull request had it. With regular merge or squash and merge, GitHub adds a pull request link in the commit title so the pull request is always a single click away from the list of commits.

`git rebase` and `git push --force` are useful when prototyping a feature locally. They also allow to create a pull request with a clean initial Git history. But once you ask for a review and start collaborating on a pull request, it's best to stop using these commands.

This eliminates the rebase and merge option and leaves us with the regular merge or squash and merge ones.

## The pull request is the unit of change

It's nice to make small and atomic commits inside a big pull request but it's even nicer to make small and atomic pull requests.

The pull request is the unit of change:

- it is reviewed as a whole. All the commits have to be reviewed and approved since it's their aggregated changes that will be applied to `master` when merged.
- it is tested as a whole. CI providers only test the pull request's head commit. It's the only one guaranteed to not break the build and the tests. All the intermediate commits, as carefully crafted as they may be, might break `git bisect` if they land individually on `master`.

By the time a pull request is ready to be merged, its Git history will often contain commits addressing review comments, fixing tests, typos, or code formatting. There is no point in making these commits part of `master`'s history. We would rather gather all the pull request's commits into a single cohesive commit and put it on top of `master`. And that's where the Autosquash [WALL·E inspired](https://www.youtube.com/watch?v=WB8LrCWmGYw) logo and :package: emoji come from!

The regular merge option doesn't help keeping `master`'s history clean, so we're only left with the squash and merge one.

## Read more

- [Two years of squash merge](https://blog.dnsimple.com/2019/01/two-years-of-squash-merge/)
- [Utter disregard for Git commit history](https://zachholman.com/posts/git-commit-history/)
- [How to split pull requests](https://www.thedroidsonroids.com/blog/splitting-pull-request)
