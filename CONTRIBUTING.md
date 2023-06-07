# Contributing

Review the [Code of Conduct](CODE_OF_CONDUCT.md).

## Where to start
View [issues tagged with the *Good First Issues* label](https://github.com/sadanandpai/resume-builder/labels/good%20first%20issue) to find good first feature requests and bugs to fix.

Visit https://github.com/sadanandpai/resume-builder/issues to view all issues.

--- 

## Development

### Running the environment locally or in Docker

Run the environment locally or in Docker by following the instructions at [Running the environment](RUN_ENVIRONMENT.MD).

---

### Creating a template

TODO(sadanandpai): Per issue https://github.com/sadanandpai/resume-builder/issues/175, add instructions for how to create a template.

---

### Submit a change

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repo.
1. [Clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the forked repo.
    ```
    $ git clone FORKED_REPO
    ```
1. Install the dependencies
    ```
    $ yarn install
    ```
1. Check out a new branch based and name it to what you intend to do:
    ```
    $ git checkout -b BRANCH_NAME
    ```
1. Run the project
    ```
    $ yarn dev
    ```
1. Commit your changes

    1. [Commit](https://github.com/git-guides/git-commit) to the forked repository
        ```
        $ git commit -am 'Add some proper message'
        ```

        Please provide a git message that explains what you've done.

    1.  [Push](https://github.com/git-guides/git-push) to the branch
        ```
        $ git push origin BRANCH_NAME
        ```
    1. Make a [pull request](https://github.com/git-guides/git-pull) (PR). Ensure you send the PR to the `main` branch

    Once done, our developer will review the changes and merge to `main` branch.
