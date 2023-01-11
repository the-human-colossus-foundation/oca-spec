## Contributing

### Do you need an RFC?

Use an RFC to advocate substantial changes to the OCA specification, where
those changes need to be understood by developers who *use* OCA. Minor
changes are not RFC-worthy, and can be applied directly into the specification.

### Preparation

Before writing an RFC, consider exploring the idea on community calls
(see the [Decentralized Semantic WG](
https://www.meetup.com/pl-PL/geneve-new-technology-meetup-group/)),
or on [Community Channels](
https://oca.colossi.network/community.html). Encouraging feedback from maintainers is a good sign that you're on the right track.

### How to propose an RFC

  - Fork [the Spec repo](https://github.com/the-human-colossus-foundation/oca-spec).
  - Pick a descriptive folder name for your RFC within RFCs directory. Don't pick a number yet. The format for naming should be `XYZV-Name` where `XYZV` is the consecutive number based on already existing RFCs.
  - Create the folder and copy `0000-template.md` to `RFCs/<your folder name>/README.md`.
  - Fill in the RFC. [Use MUST and SHOULD per standard conventions](https://tools.ietf.org/html/rfc2119). Put care into the details: RFCs that do not present
    convincing motivation, demonstrate an understanding of the impact of the
    design, or are disingenuous about the drawbacks or alternatives tend to be
    poorly received. You can add supporting artifacts, such as diagrams and sample
    data, in the RFC's folder.
  - Assign a number to your RFC. Get the number by checking already merged RFCs and open PRs. Rename your folder from `<your folder name>` to `<your 4-digit number>-<your folder name>`. At the
    top of your README.md, modify the title so it is in the form: `<your 4-digit
    number>: Friendly Version of Your Title`. Commit your changes.
  - Commit and push your changes.
  - Submit a pull request.

Make sure that all of your commits satisfy the [DCO requirements](
https://github.com/probot/dco#how-it-works) of the repo and conform
to the license restrictions noted [below](#intellectual-property).

The RFC Maintainers will check to see if the process has been followed, and request
any process changes before merging the PR.

When the PR is merged, your RFC is now formally in the PROPOSED state.

### Changing an RFC Status

The lifecycle of an RFC is driven by the author or current champion of the RFC. To move an RFC along
in the lifecycle, submit a PR with the following characteristics:

- The PR should __ONLY__ change the RFC status.
- The PR comment should document why the status is being changed.
- Barring negative feedback from the community, the repo's maintainers should merge the PR after the deadline.
- Each PR would be announced during Decentralzied Semantic WG and if none objection would be reported the PR would be merged following week.


### How to get an RFC demonstrated

If your RFC is a feature, it's common (though not strictly required) for
it to go to a DEMONSTRATED state next. Write some code that embodies the
concepts in the RFC. Publish the code. Then [submit a PR](#changing-an-rfc-status) that adds your
early implementation to the [Implementations section](/0000-template.md#implementations),
and that changes the status to DEMONSTRATED. These PRs should be accepted
immediately.

### How to get an RFC accepted

After your RFC is merged and officially acquires the [PROPOSED status](
README.md#status--proposed), the RFC will receive feedback from the larger community,
and the author should be prepared to revise it. Updates may be made via pull request,
and those changes will be merged as long as the process is followed.

When you believe that the RFC is mature enough (feedback is somewhat resolved,
consensus is emerging, and implementation against it makes sense), [submit a PR](#changing-an-rfc-status) that
changes the status to [ACCEPTED](README.md#status--accepted). The status change PR
will remain open until the maintainers agree on the status change.

### How to get an RFC adopted

An accepted RFC is a standards-track document. It becomes an acknowledged
standard when there is evidence that the community is deriving meaningful
value from it.

After possitive feedback from the community an RFC would be incorporated into OCA Spec and would be archieved.

### Intellectual Property

This repository is licensed under an [EUPL-1.2](LICENSE). It is protected
by a [Developer Certificate of Origin](https://developercertificate.org/) on every commit.
This means that any contributions you make must be licensed in an EUPL-1.2-compatible
way, and must be free from patent encumbrances or additional terms and conditions. By
raising a PR, you certify that this is the case for your contribution.

### Signing off commits (DCO)

If you are here because you forgot to sign off your commits, fear not. Check out [how to sign off previous commits](#how-to-sign-off-previous-commits)

We use developer certificate of origin (DCO) in all repositories, so to get your pull requests accepted, you must certify your commits by signing off on each commit.

#### Signing off your current commit
  - `$ git commit -s -m "your commit message"`
  - To see if your commits have been signed off, run `$ git log`. Any commits including a line with `Signed-off-by: Example Author <author.email@example.com>` are signed off.
  - If you need to re-sign the most current commit, use `$ git commit --amend --no-edit -s`.

The `-s` flag signs off the commit message with your name and email.

#### How to Sign Off Previous Commits

1. Use `$ git log` to see which commits need to be signed off. Any commits missing a line with `Signed-off-by: Example Author <author.email@example.com>` need to be re-signed.
2. Go into interactive rebase mode using `$ git rebase -i HEAD~X` where X is the number of commits up to the most current commit you would like to see.
3. You will see a list of the commits in a text file. **On the line after each commit you need to sign off**, add `exec git commit --amend --no-edit -s` with the lowercase `-s` adding a text signature in the commit body. Example that signs both commits:

   ```
   pick 12345 commit message
   exec git commit --amend --no-edit -s
   pick 67890 commit message
   exec git commit --amend --no-edit -s
   ```

4. If you need to re-sign a bunch of previous commits at once, find the earliest commit missing the sign off line using `$ git log` and use that the HASH of the commit before it in this command:
   ```
	$ git rebase --exec 'git commit --amend --no-edit -n -s' -i HASH.
   ```
   This will sign off every commit from most recent to right before the HASH.

5. You will probably need to do a force push (`$ git push -f`) if you had previously pushed unsigned commits to remote.
