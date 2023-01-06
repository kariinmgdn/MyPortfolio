import { Avatar, Stack } from "@mui/material";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ActionAreaCard from "../src/components/ProjectCard";
import { getContributions } from "../src/lib/github";
import ActivityCalendar, { CalendarData } from "react-activity-calendar";
import linkedin from "../src/components/Linkedin";
import { formatCalendar } from "../src/lib/github/CalendarFormat";

export async function getServerSideProps() {
  const data = await getContributions("kariinmgdn", process.env.KEY);
  const userInfo = data.data.user;
  const formatedCalendar = formatCalendar(userInfo.contributionsCollection.contributionCalendar.weeks);
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
    <div className={styles.container}>
      <Head>
        <title>{props.name}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{props.name}</h1>

        <Stack direction="column" spacing={5}>
          <Stack direction="row" spacing={8} justifyContent="center">
            <Avatar
              onClick={() => window.open("https://github.com/kariinmgdn")}
              alt="avatar"
              src={props.avatarUrl}
              sx={{ width: 120, height: 120 }}
            />

            <ActivityCalendar
              data={props.calendar}
              blockMargin={3}
              blockRadius={0}
              blockSize={10}
              color="#0b9701"
              //hideTotalCount
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
                tooltip: "<strong>{{count}} contributions</strong> on {{date}}",
                totalCount: "{{count}} contributions  in the last year",
                weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              }}
              showWeekdayLabels
              weekStart={0}
            />
          </Stack>

          <Stack spacing={5} direction="row" justifyContent="center">
            {props.repositories.map(
              (repository: { object: { text: string } }) => {
                if (repository.object !== null) {
                  const yaml = require("js-yaml");
                  const obj = yaml.load(repository.object.text);
                  return ActionAreaCard(obj.name, obj.description);
                }
              }
            )}
            {linkedin()}
          </Stack>
        </Stack>
      </main>
    </div>
  );
}
