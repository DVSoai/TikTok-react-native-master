export const keys = {
  user: (userId) => ['user', userId],
  following: (userId, otherUserId) => ['following', userId + otherUserId],
};
