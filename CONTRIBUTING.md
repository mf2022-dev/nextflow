# Contributing to BioNXA

First off, thank you for considering contributing to BioNXA! It's people like you that make BioNXA such a great community.

## Where do I go from here?

If you've noticed a bug or have a feature request, [make one](https://github.com/mf2022-dev/bionxa/issues/new)! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

### Fork & create a branch

If this is something you think you can fix, then [fork BioNXA](https://github.com/mf2022-dev/bionxa/fork) and create a branch with a descriptive name.

A good branch name would be (where issue #38 is the ticket you're working on):

```bash
feature/38-add-new-tutorial
```

### Get the test suite running

Make sure you're able to run the tests locally before you start coding.

```bash
npm test
```

### Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first 😸

### Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with BioNXA's master branch:

```bash
git remote add upstream git@github.com:mf2022-dev/bionxa.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```bash
git checkout feature/38-add-new-tutorial
git rebase master
git push --force-with-lease origin feature/38-add-new-tutorial
```

Finally, go to GitHub and [make a Pull Request](https://github.com/mf2022-dev/bionxa/compare) 🚀

## Code of Conduct

We have a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect all contributors to adhere to. Please read it before contributing.
