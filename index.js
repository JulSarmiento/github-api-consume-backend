require("dotenv").config();
const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const repos = async () => {
  const {data} = await octokit.request(
    `GET /users/${process.env.GITHUB_USERNAME}/repos`,
    { username: `${process.env.GITHUB_USERNAME}` }
  );

  const transformedRepos = data.reduce((acc, repo) => {
    const { name, description, language, ssh_url, clone_url } = repo;
    acc[name] = {
      "Description": description || "N/A",
      "Language": language || "N/A",
      "SSH link": ssh_url,
      "Clone link": clone_url,
    };

    return acc;
  }, {});

  console.table(transformedRepos);
};
repos();






