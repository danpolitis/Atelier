# Project Catwalk Team Ocelot
 Project Catwalk comprises a complete redesign of the retail portal designed to address this concern and modernize the site.

 # Team Members
 - [Daniel Politis](https://github.com/danpolitis)
 - [Jeff Liu](https://github.com/theycallmejeff)
 - [Yingchen Bai](https://github.com/pppbyc)
 - [Andrew Hang](https://github.com/DrewHang)

# Git Feature Branch Workflow

- [Link to workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- github main repository is the single source of truth

   ## steps for workflow
   1. Fork and clone the shared repository to your local machine
      - Keep the master/main branch clean, never commit changes to your local master/main branch
      - to pull changes from shared repo on main branch use: `$git pull`
   2. All changes must be done on a new 'feature' branch on your local machine
      - checkout a new branch on your local repo to make new features
      - use `$git checkout -b [name_of_feature]`
   3. To submit features for code review
      - commit and push your changes to your forked repository and submit a pull request
         - `$git push origin [name_of_feature]`
      - make sure the branches are correctly selected on github.com
      - once the pull request is submitted, add a comment and tag a teammate to request a code review
   4. Delete the branch on sucessful merge from the main repo to keep the repo clean

   ## Merge Conflicts
   Occur when multiple pull requests are made on the same file to the shared repository
   Can be solved one of two ways:
   1. Complete top level pull request and pull down from the master branch on your local machine
      - Complete code review for first request
      - For subsequent pull requests, the user that submitted that pull request must
      pull changes to your local machine from shared repo
      - Checkout your feature branch that is associated with the pull request using `$git checkout [name_of_feature]`
      - Merge the main into your feature branch using `$git merge [name_of_feature]` to handle conflicts on your local machine.
      - commit and push changes to update the pull request
   2. Rebase
      - if there are multiple pull requests on the same file with conflicts
      - rebase the top-most commit with your commit

 # Front-End-Dependencies

 - Front-End MVC
    - ReactJS (`$npm i react react-dom`)
 - Asset compilation + loading
    - Webpack (`$npm install --save-dev webpack`)
    - Webpack-dev

 - CSS Frameworks
    - Bootstrap
     - (`$npm i boostrap`)
     - [Link to Bootstrap!](https://getbootstrap.com/)

 # Server
 - MVC
   - ExpressJS (`$npm i express`)
