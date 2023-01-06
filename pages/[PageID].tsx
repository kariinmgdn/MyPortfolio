import { Box, Button, Container, Stack, Typography } from "@mui/material";
import showdown from "showdown";
import { getRepository } from "../src/lib/github";

export async function getServerSideProps({ params }: { params: {PageID: string} }) {
  
  const pageID = params.PageID;
  const data = await getRepository("kariinmgdn", pageID, process.env.KEY);
  const repository = data.data.user.repository;

  if (!repository || !repository.object) {
    return {redirect:{destination:"/"}};
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
    <Container maxWidth="xl">
        <Stack direction="column" spacing={10} justifyContent="center">
          <Stack direction="row" justifyContent="center">
            <Typography justifyContent="center" variant="h2" component="h2">
              {props.name}
            </Typography>
          </Stack>

          <Stack spacing={15} direction="row" justifyContent="center">
            <Stack spacing={3} direction="column" justifyContent="center">
              {props.images.map((image: { name: string }) => {
                return (
                  <img
                    key={image.name}
                    width="500"
                    alt={image.name}
                    src={`https://raw.githubusercontent.com/kariinmgdn/${props.name}/main/src/portfolio/images/${image.name}`}
                  />
                );
              })}
            </Stack>
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              <Typography variant="subtitle1" gutterBottom>
                <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
              </Typography>

              <Button
                onClick={() =>
                  window.open("https://github.com/kariinmgdn/" + props.name)
                }
              >
                <Typography variant="button" display="block" gutterBottom>
                  PROJECT LINK TO GITHUB
                </Typography>
              </Button>
            </Box>
          </Stack>
        </Stack>
    </Container>
  );
}
