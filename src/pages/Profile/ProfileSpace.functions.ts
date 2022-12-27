import {userApi} from "../../api/api";

export async function getUserDashboard(username?: string) {
  return username ?
    await userApi.getUserDashboard(username)
    : await userApi.myDashboard();
}

export async function getUserInfo(username?: string) {
  return username ? (await userApi.getUsersInfo([username]))[0] : await userApi.me();
}
