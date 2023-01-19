require("dotenv").config();
const { Octokit } = require("octokit");

/**
 * @param {string} token
 * @returns {Octokit}
 * @see https://octokit.github.io/rest.js/v18#authentication
 */
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<import("@octokit/types").Octokit.PullsListResponseItem[]>}
 * @see https://octokit.github.io/rest.js/v18#pulls-list
 */
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









