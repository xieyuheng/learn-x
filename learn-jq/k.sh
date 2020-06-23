jq '.[0]' commits.json
jq '.[0].commit' commits.json
jq '.[0]  | {message: .commit.message, name: .commit.committer.name}' commits.json
jq '.[] | {message: .commit.message, name: .commit.committer.name}' commits.json
jq '[.[] | {message: .commit.message, name: .commit.committer.name}]' commits.json
jq '[.[] | {message: .commit.message, name: .commit.committer.name, parents: .parents}]' commits.json
jq '[.[] | {message: .commit.message, name: .commit.committer.name, parents: [.parents[].html_url]}]' commits.json
