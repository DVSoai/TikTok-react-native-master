import { useQuery } from '@tanstack/react-query';
import { keys } from './queryKeys';
import { getUserById } from '../services/user';

const useUser = (userId, options = {}) => {
  return useQuery(keys.user(userId), () => getUserById(userId), options);
};

export { useUser };
