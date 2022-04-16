import axios from "axios";
import { LoginDataType } from "../../redux/auth-reducer";
import { ProfileType } from "../../redux/profile-reducer";

type AuthMeType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: number
  messages: Array<string>
}
type LoginType = {
  resultCode: number
  messages: Array<string>
  data: {
    userId: number
  }
}
type LogoutType = {
  resultCode: number
  messages: Array<string>
  data: object
}

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "525cafd8-2eeb-4a01-9a91-3e53e4ac24b7",
  },
});

export const userApi = {
   getUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  followUser(userId: number) {
    return instance.post(`follow/` + userId);
  },
  unfollowUser(userId: number) {
    return instance.delete(`follow/` + userId);
  },
};

export const profileApi = {
  updateProfilePhoto(file: any){
    const formData = new FormData();
    formData.append("image", file)
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
 getProfile(userId: number | null) {
   return instance.get(`profile/` + userId)
 },
 getStatus(userId: number | null) {
   return instance.get(`profile/status/` + userId)
 },
 updateStatus(status: string | undefined) {
   return instance.put(`profile/status`, {status})
 },
 putProfile(data: ProfileType) {
  return instance.put(`profile`, data)
 }
};
export const authApi = {
  authMe() {
    return instance.get<AuthMeType>(`auth/me`);
  },
  login(data: LoginDataType) {
    return instance.post<LoginType>(`auth/login`, data);
  },
  logout() {
    return instance.delete<LogoutType>(`auth/login`);
  }
}


