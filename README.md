# Project Catwalk Team Ocelot
 Project Catwalk comprises a complete redesign of the retail portal designed to address this concern and modernize the site.

 # Team Members
 - Daniel Politis
 - Jeff Liu
 - Yingchen Bai
 - Andrew Hang

# Updating the Repository

`git remote add upstream https://github.com/fec-project-catwalk-team-ocelot/project-catwalk-team-ocelot.git`

After you've done that, updating your repo is as simple as running the following:

- `git checkout main       // Your fork's main branch`
- `git pull upstream main  // Your class's main branch`

This will check out your branch and tell git to grab any changes made to the main repository and merge them into your branch.

# Pushing changes and making a pull request to main branch

- create a feature branch on your local machine and save and commit changes and push to your forked repository

```
   git checkout -b new-feature-branch
   git add .
   git commit -m “short yet descriptive message”
   git push origin new-feature-branch
```
- Then create a pull request to the main repo for reviewing and merging
   - github.com: click New pull request button



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
