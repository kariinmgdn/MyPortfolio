import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import ActionAreaCard from "../src/components/ProjectCard";
import { getContributions } from "../src/lib/github";
import ActivityCalendar, { CalendarData } from "react-activity-calendar";
import { formatCalendar } from "../src/lib/github/CalendarFormat";

export async function getServerSideProps() {
  const data = await getContributions("kariinmgdn", process.env.KEY);
  const userInfo = data.data.user;
  const formatedCalendar = formatCalendar(
    userInfo.contributionsCollection.contributionCalendar.weeks
  );

  return {
    props: {
      name: userInfo.name,
      htmlUrl: userInfo.url,
      avatarUrl: userInfo.avatarUrl,
      calendar: formatedCalendar,
      repositories: userInfo.repositories.nodes,
    },
  };
}

interface Props {
  name: string;
  htmlUrl: string;
  avatarUrl: string;
  calendar: CalendarData;
  repositories: { object: { text: string } }[];
}

export default function Home(props: Props) {
  return (
    <Container maxWidth="xl" className="Home-container">
      <Head>
        <title>{props.name}</title>
      </Head>
      <Box justifyContent="center">
        <Typography variant="h2" component="h2" className="title">
          {props.name} - Portfolio
        </Typography>
      </Box>
      <Container>
        <Box className="items" justifyContent="center">
          <Box className="item">
            <Box>
              <Box paddingBottom={5} className="text">
                <Typography>
                  Welcome to my Portfolio! Here you can find information about
                  some of the projects that I have created. Below is my activity
                  calendar from Github and project cards with a short
                  description. To see more information about a specific project,
                  click on the card. If you want to find more info about me or
                  my other projects, follow the links.
                </Typography>
              </Box>

              <Box paddingBottom={5} className="calendar">
                <ActivityCalendar
                  data={props.calendar}
                  blockMargin={2}
                  blockRadius={15}
                  labels={{
                    legend: {
                      less: "Less",
                      more: "More",
                    },
                    months: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    tooltip:
                      "<strong>{{count}} contributions</strong> on {{date}}",
                    totalCount:
                      "{{count}} contributions  in the last eight months",
                    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                  }}
                  theme={{
                    level0: "#f5f5e3",
                    level1: "#406191",
                    level2: "#153d7d",
                    level3: "#051639",
                    level4: "#262a33",
                  }}
                  hideColorLegend
                  weekStart={0}
                />
              </Box>
            </Box>
          </Box>
          <Box className="item">
            <Typography
              className="link"
              variant="button"
              display="block"
              gutterBottom
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/karina-margarita-dzene/"
                )
              }
            >
              LINK TO linkedin - karina margarita dzene
            </Typography>
            <Typography
              className="link"
              variant="button"
              display="block"
              gutterBottom
              onClick={() => window.open("https://github.com/kariinmgdn")}
            >
              LINK TO GITHUB - kariinmgdn
            </Typography>
          </Box>
        </Box>
      </Container>
      <Typography variant="h2" component="h2" className="title">
        My Projects:
      </Typography>
      <Container>
        <Box justifyContent="center" className="cards">
          {props.repositories.map(
            (repository: { object: { text: string } }) => {
              if (repository.object !== null) {
                const yaml = require("js-yaml");
                const obj = yaml.load(repository.object.text);
                return ActionAreaCard(obj.name, obj.description);
              }
            }
          )}
        </Box>
      </Container>
    </Container>
  );
}
