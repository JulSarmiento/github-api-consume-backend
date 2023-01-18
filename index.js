const { Octokit, App } = require("octokit");
require("dotenv").config();

/**
 * @param {string} username
 * @returns {Promise<string[]>}
 */
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * @returns {Promise<string[]>}
 * @param {string} username
 */
const repos = async () => {
  const data = await octokit.request(
    `GET /users/${process.env.GITHUB_USERNAME}/repos`,
    { username: `${process.env.GITHUB_USERNAME}` }
  );
  const repos = Object.entries(data.data).map((repo) => {
    return repo[1].name;
  });

  console.table(repos);
};

repos();
