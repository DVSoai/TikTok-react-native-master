import { useQuery } from '@tanstack/react-query';
import { keys } from './queryKeys';
import { getIsUserFollowing } from '../services/user';

const useFollowing = (userId, otherUserId, options = {}) => {
  return useQuery(
    keys.following(userId, otherUserId),
    () => getIsUserFollowing(userId, otherUserId),
    options
  );
};

export { useFollowing };
