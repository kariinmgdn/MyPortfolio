export const getContributions = async (username: string, key: string | undefined) => {
  const headers = {
    Authorization: `bearer ${key}`,
  };
  const body = {
    query: `query {
        user(login: "${username}") {
          avatarUrl
          name
          url
          repositories(first: 100) {
            nodes {
              object (expression: "main:src/portfolio/portfolio.yml") {
                ... on Blob {
                  text
                }
              }
              name
              url
              description
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }`,
  };
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  return data;
};

export const getRepository = async (username: string, name: string, key: string | undefined) => {
  const headers = {
    Authorization: `bearer ${key}`,
  };
  const body = {
    query: `query {
      user(login: "${username}") {
        repository(name: "${name}") {
          object(expression: "main:src/portfolio") {
            ... on Tree {
              entries {
                name
                object {
                  ... on Blob {
                    text
                  }
                  ... on Tree {
                    entries {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  return data;
};