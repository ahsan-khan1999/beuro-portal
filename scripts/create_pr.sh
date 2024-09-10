# create_pr.sh
#!/bin/bash

create_pr() {
  local SOURCE_BRANCH=$1
  local TARGET_BRANCH=$2
  local PR_TITLE=$3

  curl -X POST -u "$BITBUCKET_USERNAME:$BITBUCKET_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "'"$PR_TITLE"'",
        "source": {
          "branch": {
            "name": "'"$SOURCE_BRANCH"'"
          }
        },
        "destination": {
          "branch": {
            "name": "'"$TARGET_BRANCH"'"
          }
        },
        "description": "'"$PR_TITLE"'",
        "close_source_branch": true
      }' \
  "https://api.bitbucket.org/2.0/repositories/$REPO_OWNER/$REPO_SLUG/pullrequests"
}

# Define the branches to compare against
STAGING_BRANCH="staging"
PROD_BRANCH="prod"

# Define colors for highlighting
RED_BG_TEXT='\033[41;97m'
NC='\033[0m' # No Color

# Check if all required environment variables are set
if [[ -z "$BITBUCKET_USERNAME" || -z "$BITBUCKET_APP_PASSWORD" || -z "$REPO_OWNER" || -z "$REPO_SLUG" ]]; then
  echo "${RED_BG_TEXT}Error: One or more required environment variables are not set. Please ensure BITBUCKET_USERNAME, BITBUCKET_APP_PASSWORD, REPO_OWNER, and REPO_SLUG are set.${NC}"
  exit 1
fi

if [[ $BITBUCKET_BRANCH == hotfix/* ]]; then
  create_pr "$BITBUCKET_BRANCH" "$PROD_BRANCH" "Automated PR from $BITBUCKET_BRANCH to $PROD_BRANCH"
  create_pr "$BITBUCKET_BRANCH" "$STAGING_BRANCH" "Automated PR from $BITBUCKET_BRANCH to $STAGING_BRANCH"

elif [[ $BITBUCKET_BRANCH == bugfix/* ]]; then
  create_pr "$BITBUCKET_BRANCH" "$STAGING_BRANCH" "Automated PR from $BITBUCKET_BRANCH to $STAGING_BRANCH"
fi