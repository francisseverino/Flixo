import request from './helper';
import { DO_SOMETHING } from './constants';

const Users = {
  createProfile: () => {
    return request(DO_SOMETHING);
  },
};

export default Users;
