export const formatCalendar = (
  input: {
    contributionDays: {
      date: string;
      contributionCount: string;
      contributionLevel: string;
    }[];
  }[]
) => {
  const array = input.map(
    (x: {
      contributionDays: {
        date: string;
        contributionCount: string;
        contributionLevel: string;
      }[];
    }) =>
      x.contributionDays.map(function (obj: {
        date: string;
        contributionCount: string;
        contributionLevel: string;
      }) {
        return {
          date: obj.date,
          count: obj.contributionCount,
          level: obj.contributionLevel
            .replaceAll("NONE", "0")
            .replaceAll("FIRST_QUARTILE", "1")
            .replaceAll("SECOND_QUARTILE", "2")
            .replaceAll("THIRD_QUARTILE", "3")
            .replaceAll("FOURTH_QUARTILE", "4"),
        };
      })
  );

  let formatedCalendar =
    "[" + JSON.stringify(array).replace(/\[|\]/g, "") + "]";

  return JSON.parse(formatedCalendar);
};
