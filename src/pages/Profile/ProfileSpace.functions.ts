import {userApi} from "../../api/api";

export async function getUserDashboard(id?: string) {
  return id ?
    await userApi.getUserDashboard(id)
    : await userApi.myDashboard();
}

export async function getUserInfo(id?: string) {
  return id ? (await userApi.getUsersInfo([id]))[0] : await userApi.me();
}
