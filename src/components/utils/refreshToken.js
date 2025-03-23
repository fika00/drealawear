import createRefresh from "react-auth-kit/createRefresh";
import { api, version } from "./api";

export const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      const response = await axios.post(
        `${api}/api/${version}/Auth/refresh`,
        param,
        {
          headers: { Authorization: `Bearer ${param.authToken}` },
        }
      );

      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});
