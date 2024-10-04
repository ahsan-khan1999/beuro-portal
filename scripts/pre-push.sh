# .git/hooks/pre-push
#!/bin/bash

# Get the current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)

# Define the branches to compare against
STAGING_BRANCH="staging"
PROD_BRANCH="prod"

# Fetch the latest changes from the remote
git fetch origin

# Define colors for highlighting
RED_BG_TEXT='\033[41;97m'
NC='\033[0m' # No Color

# Check if the current branch is a bugfix branch and is behind staging
if [[ "$CURRENT_BRANCH" == bugfix/* ]]; then
  if ! git merge-base --is-ancestor origin/$STAGING_BRANCH $CURRENT_BRANCH; then
    echo -e "${RED_BG_TEXT}Error: $CURRENT_BRANCH is behind $STAGING_BRANCH. Please merge the latest changes from $STAGING_BRANCH before pushing.${NC}"
    exit 1
  fi
fi

# Check if the current branch is a hotfix branch and is behind prod
if [[ "$CURRENT_BRANCH" == hotfix/* ]]; then
  if ! git merge-base --is-ancestor origin/$PROD_BRANCH $CURRENT_BRANCH; then
    echo -e "${RED_BG_TEXT}Error: $CURRENT_BRANCH is behind $PROD_BRANCH. Please merge the latest changes from $PROD_BRANCH before pushing.${NC}"
    exit 1
  fi
fi