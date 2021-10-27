# Atelier Products
> A complete frontend redesign of a retail web-portal to modernize an outdated client-facing platform. The new design showcases a list view of products and a detailed product page with an emphasis on a detailed product photos, related items carousel, questions and answer feature and a star review rating system.

<img src="./resources/atelier.gif" />

# Team Members
- [Daniel Politis](https://github.com/danpolitis)
- [Jeff Liu](https://github.com/theycallmejeff)
- [Yingchen Bai](https://github.com/pppbyc)
- [Andrew Hang](https://github.com/DrewHang)


<div align="center">
   <a href="https://github.com/danpolitis">
      <img style="border-radius: 50px" src="https://github.com/danpolitis.png?size=50">
   </a>
   <a href="https://github.com/theycallmejeff">
      <img style="border-radius: 50px" src="https://github.com/theycallmejeff.png?size=50">
   </a>
   <a href="https://github.com/pppbyc">
      <img style="border-radius: 50px" src="https://github.com/pppbyc.png?size=50">
   </a>
   <a href="https://github.com/DrewHang">
      <img style="border-radius: 50px" src="https://github.com/DrewHang.png?size=50">
   </a>
</div>

# Installation Instructions
```
$ npm install

## Add auth token to config.js
## there is an example file config.example.js

$ npm run build
$ npm run start

## Navigate to http://localhost:3000
```
# Git Feature Branch Workflow

All feature development takes place on a dedicated branch instead of the main branch. More information can be found [here](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).

## steps for workflow
```
## Clone master branch and update
git checkout main
git pull --rebase origin main

## Start work on a feature
git checkout -b feature-branch

## write code, commit, repeat
git add .
git commit

## rebase before pull request
git pull --rebase origin main

## push to a feature branch on YOUR fork
git push origin feature-branch

## make a pull request on GitHub and check if the action tests have passed

## if pull request is rejected
## fix bugs, commit
git add .
git commit
git pull --rebase origin main
git push origin feature-branch

## make a pull request on GitHub

## if pull request is accepted
git checkout master
git pull --rebase origin main
git branch -d feature-branch
```
 # Stack
### Frontend
<div>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
   <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />
   <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
</div>

### Backend
<div>
   <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
   <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
</div>


### Devtools
<div>
   <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
   <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white" />
   <img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white" />
</div>
