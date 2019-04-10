### Start

1. Download or clone repo `git clone https://github.com/yunaichun/yunaichun.github.io.git`
2. Enter the folder: `cd yunaichun.github.io/`
3. Install Ruby gems: `bundle install`
4. Start Jekyll server: `bundle exec jekyll serve`

---

### Deploy in Github pages in 2 steps

1. Change the variables `GITHUB_REPONAME` and `GITHUB_REPO_BRANCH` in `Rakefile`
2. Run `rake` or `rake publish` for build and publish on Github

---

### Using Rake tasks

* Create a new page: `rake page name="contact.md"`
* Create a new post: `rake post title="TITLE OF THE POST"`


[Reference](https://github.com/nandomoreirame/end2end)
