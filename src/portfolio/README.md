This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Here you can find information about some of the projects that I have created. <br>

All the info about the calendar and projects is pulled dynamically via [Github GraphQL API](https://docs.github.com/en/graphql). <br>

To see the result, follow this link: [https://kariinmgdn.vercel.app/](https://kariinmgdn.vercel.app/)

## Getting Started

First, run the development server and add [Showdown](https://github.com/showdownjs/showdown), [Mui](https://mui.com/), [React Activity Calendar](https://github.com/grubersjoe/react-activity-calendar) and [@types/js-yaml
](https://www.npmjs.com/package/@types/js-yaml):

---
- npm run dev

- npm install showdown

- npm install @mui/material @emotion/react @emotion/styled

- yarn storybook

- npm i @types/js-yaml

---

Then, create [env.local](https://nextjs.org/docs/basic-features/environment-variables) in project parent folder and add your [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). 

---
- KEY=token

---
Change my Github username "kariinmgdn" to your username in pages/index.tsx, pages/[ PageID ].tsx and src/components/ProjectCard.tsx

To display your projects, add portfolio folder in `src` folder.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the project:

---
- npm run dev

---

