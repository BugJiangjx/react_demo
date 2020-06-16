import Service from '~/utils/Service';
import { saveToken, setAuthData, saveIsLogin } from '~/utils/Session';

class User extends Service {
  login = async loginInfo => {
   const data = await this.post('/login', {}, { params: loginInfo });
   saveToken(data.token);
   setAuthData(data);
   saveIsLogin(true);
   window.location.href = '/';
  }

  getUserPageByNameOrAccount = async data => {
    return await this.post('/auth/user/getUserPageByNameOrAccount', data);
  }
}

export default new User();