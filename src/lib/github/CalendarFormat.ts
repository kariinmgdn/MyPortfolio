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
        const newDate = new Date(obj.date);

        let today = new Date();
        today = new Date(today.setMonth(today.getMonth() - 8));
        if (new Date(obj.date) > today) {
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
        }
      })
  );

  let formatedCalendar =
    "[" + JSON.stringify(array).replace(/\[|\]/g, "") + "]";
  const a: any[] = [];
  JSON.parse(formatedCalendar).map((day: any) => {
    if (day) {
      return a.push(day);
    }
  });
  return a;
};
