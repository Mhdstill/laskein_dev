module.exports = {
  pattern:
    '^(main|staging|production|develop|preprod)$|^(bump|feat|fix|rel(?:ease)?)/.+$',
  errorMsg:
    '🤨 La branche que tu essaies de pusher ne respecte pas nos conventions, tu peux la renommer avec `git branch -m <nom-actuel> <nouveau-nom>`',
};
