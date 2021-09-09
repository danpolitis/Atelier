# Project Catwalk Team Ocelot
 Project Catwalk comprises a complete redesign of the retail portal designed to address this concern and modernize the site.

 # Team Members
 - Daniel Politis
 - Jeff Liu
 - Yingchen Bai
 - Andrew Hang

# Git Feature Branch Workflow

- https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
- github main repository is the single source of truth

   ## steps for workflow
   1. Fork and clone the shared repository to your local machine
      - Keep the master/main branch clean, never commit changes to your local master/main branch
      - to pull changes from shared repo on main branch use: `git pull`
   2. All changes must be done on a new 'feature' branch on your local machine
      - checkout a new branch on your local repo to make new features
      - use `git checkout -b [name_of_feature]`
   3. To submit features for code review
      - commit and push your changes to your forked repository and submit a pull request
         - `git push origin [name_of_feature]`
      - make sure the branches are correctly selected on github.com
      - once the pull request is submitted, add a comment and tag a teammate to request a code review

   ## Merge Conflicts
   Occur when multiple pull requests are made on the same file to the shared repository
   Can be solved one of two ways:
   1. Complete top level pull request and pull down from the master branch on your local machine
      - Complete code review for first request
      - pull changes to your local machine from shared repo
      -
   2. Rebase
      - rebase your pull requests

 # Front-End-Dependencies

 - Front-End MVC
    - ReactJS ($npm i react / $npm i react-dom)
 - Asset compilation + loading
    - Webpack ($npm install --save-dev webpack)
    - Webpack-dev

 - CSS Frameworks
    - Bootstrap
     - ($npm i boostrap)
     - [Link to Bootstrap!](https://getbootstrap.com/)

 # Server
 - MVC
   - ExpressJS ($npm i express)

added a few lines of text for testing feature pull request
