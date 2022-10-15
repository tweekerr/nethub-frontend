import {userApi} from "../../api/userApi";

export async function getPrivateDashboardInfo() {
  const user = await userApi.me()
  const dashboardInfo = await userApi.myDashboard();

  return {user, dashboardInfo}
}
