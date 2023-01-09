This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Here you can find information about some of the projects that I have created.

## Getting Started

First, run the development server:

---
- npm run dev

---
Next, add [Showdown](https://github.com/showdownjs/showdown), [Mui](https://mui.com/), [React Activity Calendar](https://github.com/grubersjoe/react-activity-calendar) and [@types/js-yaml
](https://www.npmjs.com/package/@types/js-yaml):

---
- npm install showdown

- npm install @mui/material @emotion/react @emotion/styled

- yarn storybook

- npm i @types/js-yaml

---

Then, create [env.local](https://nextjs.org/docs/basic-features/environment-variables) in project parent folder and add your [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). 

---
- KEY=your_personal_token

---
Change my Github username "kariinmgdn" to your username in `pages/index.tsx`, `pages/[PageID].tsx` and `src/components/ProjectCard.tsx`


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the project:

---
- npm run dev

---

To display your projects, add portfolio folder in `src` folder with following structure:

src/portfolio
- /portfolio.yml (name, description)
- /image-small.png
- /README.md
- /images/img1.png, img2.png . . .