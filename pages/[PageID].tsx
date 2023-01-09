import { Box, Button, Container, Typography } from "@mui/material";
import showdown from "showdown";
import { getRepository } from "../src/lib/github";
import Head from "next/head";

export async function getServerSideProps({
  params,
}: {
  params: { PageID: string };
}) {
  const pageID = params.PageID;
  const data = await getRepository("kariinmgdn", pageID, process.env.KEY);
  const repository = data.data.user.repository;

  if (!repository || !repository.object) {
    return { redirect: { destination: "/" } };
  }

  const converter = new showdown.Converter();
  const html = converter.makeHtml(repository.object.entries[0].object.text);

  return {
    props: {
      text: html,
      name: pageID,
      images: repository.object.entries[2].object.entries,
    },
  };
}

interface Props {
  text: string;
  name: string;
  images: { name: string }[];
}

export default function MyPerfectApp(props: Props) {
  return (
    <Container maxWidth="xl" className="ProjectPage-container">
      <Head>
        <title>{props.name}</title>
      </Head>
      <Typography variant="h2" component="h2" className="project-title">
        {props.name}
      </Typography>
      <Box className="items" justifyContent="center">
        <Box className="item">
          {props.images.map((image: { name: string }) => {
            return (
              <Box key={image.name}>
                <picture>
                  <img
                    className="image"
                    alt={image.name}
                    src={`https://raw.githubusercontent.com/kariinmgdn/${props.name}/main/src/portfolio/images/${image.name}`}
                  />
                </picture>
              </Box>
            );
          })}
        </Box>

        <Box className="item">
          <Typography variant="subtitle1" className="readMe">
            <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
          </Typography>

          <Typography
            variant="button"
            display="block"
            className="link"
            onClick={() =>
              window.open("https://github.com/kariinmgdn/" + props.name)
            }
          >
            PROJECT LINK TO GITHUB
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
