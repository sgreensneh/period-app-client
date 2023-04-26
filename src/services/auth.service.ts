import apiInstance, {setAuthToken} from "./api";
import {ILogin, ISignup, IUserDetails} from "../types/auth.types";
import store from "../redux/store";
import {authActions} from "../redux/slices/authSlice";
import {AxiosResponse} from "axios";
import isEmpty from "is-empty";
import {flowActions} from "../redux/slices/flowSlice";

class AuthService {
  public login(data: ILogin) {
    return new Promise((resolve, reject) => {
      apiInstance.post("/user/login", data)
        .then((res) => {
          return this.completeLogin(res.data.token);
        })
        .then(() => {
          resolve(true)
        })
        .catch((e) => {
          reject(e)
        })
    });
  }

  public signup(data: ISignup) {
    return new Promise((resolve, reject) => {
      apiInstance.post("/user/signup", data)
        .then((res) => {
          return this.completeLogin(res.data.token);
        })
        .then(() => {
          resolve(true)
        })
        .catch((e) => {
          reject(e)
        })
    });
  }

  private completeLogin(token: string) {
    return new Promise((resolve, reject) => {
      setAuthToken(token);
      apiInstance.get("/user/details")
        .then((res: AxiosResponse<IUserDetails>) => {
          store.dispatch(authActions.setUserDetails(res.data));
          store.dispatch(authActions.login(token));
          resolve(true);
        })
        .catch((e) => {
          reject(e);
        })
    })
  }

  public logout(){
    store.dispatch(authActions.logout());
    store.dispatch(flowActions.clearFlows());
    setAuthToken();
  }

  public async reAuthenticate() {
    try {
      const token = store.getState().auth?.token;
      if (!isEmpty(token)) {
        await this.completeLogin(token);
      } else {
        this.logout();
      }
    } catch (e: any) {
      this.logout();
    }
  }
}

const authService = new AuthService();
export default authService;
