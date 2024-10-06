#!/usr/bin/env node

import { writeFile } from 'fs/promises'
import { Octokit } from 'octokit'
// import { STATUS_CODES } from 'http'

// not authentication: 60request/H | authentication: 5000request/H
const octokit = new Octokit({
  // auth: 'YOUR-TOKEN'
})


// https://api.github.com/repos/Sylvainxiii/EasyUpload/pulls?state=all&per_page=100&page=1

/**
 * GET pulls in {owner}/{repo}
 */

// https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests

async function getAllPullsRequestInOwnerRepo(owner: string, repo: string) {
  const res = await octokit.request(`GET /repos/${owner}/${repo}/pulls`, {
    owner: 'OWNER',
    repo: 'REPO',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  if (res.status === 200) {
    return await res.data
  } else {
    return null
  }
}


/**
 * GET contributeurs in {owner}/{repo}
 */

// https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-all-contributor-commit-activity

async function getAllContributorsInOwnerRepo(owner: string, repo: string) {
  const res = await octokit.request(`GET /repos/${owner}/${repo}/stats/contributors`, {
    owner: 'OWNER',
    repo: 'REPO',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  if (res.status === 200 || res.status === 202) {
    return await res.data
  } else {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortTableContributorData(data: any) {
  if (!data) {
    return null
  }

  const sortTable = []

  for (const contributor of data) {
    sortTable.push({
      total_pulls_request: contributor.total,
      name: contributor.author.login,
      avatar_url: contributor.author.avatar_url,
      html_url: contributor.author.html_url,
    })
  }

  sortTable.sort(function (a, b) {
    return b.total_pulls_request - a.total_pulls_request
  })
  return sortTable
}

// console.log(await getAllPullsRequestInOwnerRepo('Sylvainxiii', 'EasyUpload'))

const data = await getAllContributorsInOwnerRepo('Sylvainxiii', 'EasyUpload')
const topList = sortTableContributorData(data)
console.log(topList)

try {
  await writeFile('./data.json', JSON.stringify(topList), { flag: 'w+' })
} catch (err) {
  console.log(err)
}