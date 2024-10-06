# Badge of honor

List of contributors and contributions in order by total number of `pulls request`.

Liste des contributeurs et contributions dans l'ordre par nombre total de `pulls request`.

permet de lister les contributeurs à un projet public
permet de classer les contributeurs par nombre de pull request

---

---

## list all contributeurs in OWNER/REPO

- https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-all-contributor-commit-activity

- list sort

- GET /contributeurs/:id

  /:id = OWNER_REPO

  

  ```JavaScript
  return [
    {
      name: 'user',
      avatar_url: 'img_url',
      html_url: 'url_github',
      total_pulls_request: number
    },
    ...
  ]

  ```

## list all users contributions in OWNER/REPO

- https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests

- "

- GET /contributions/:id

  "
