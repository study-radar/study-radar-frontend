import axios from "axios";
class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "studyradar";
  }
  getTokenName() {
    return this.tokenName;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
    };

    this.token = localStorage.getItem(this.tokenName)
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      console.log("AXIOS CALL " + endpoint, { url, method, data, headers });
      const res = await axios({ url, method, data, headers });
      console.log("AXIOS RES " + endpoint, res.data);

      return { data: res.data, error: null };
    } catch (error) {
      // console.error({ errorResponse: error.response.data.error });
      const message = error?.response?.data?.error?.message;
      console.error(message, error);

      return { data: null, error: message || String(error) };
    }
  }
  async signUpUser(credentials) {
    const res = await this.request({
      endpoint: "auth/register/",
      method: "POST",
      data: credentials,
    });
    return res;
  }
  async loginUser(credentials) {
    const res = await this.request({
      endpoint: "auth/login/",
      method: "POST",
      data: credentials,
    });
    return res;
  }
  async getMe() {
    const res = await this.request({
      endpoint: "auth/me/",
      method: "GET",
    });
    return res;
  }
  async getAllUsers() {
    const res = await this.request({
      endpoint: "auth/users/",
      method: "GET",
    });
    return res;
  }
  async updateUserInfo(credentials) {
    const res = await this.request({
      endpoint: "auth/updateInfo/",
      method: "PATCH",
      data: credentials,
    });
    return res;
  }
  async getGroupsForUser() {
    const res = await this.request({
      endpoint: "group/user-groups",
      method: "GET",
    });
    return res;
  }
  async getAllGroups() {
    const res = await this.request({
      endpoint: "group/all/",
      method: "GET",
    });
    return res;
  }
  async createGroup(credentials) {
    const res = await this.request({
      endpoint: "group/create/",
      method: "POST",
      data: credentials,
    });
    return res;
  }
  async addUserToGroup(credentials) {
    const res = await this.request({
      endpoint: "group/addUser/",
      method: "POST",
      data: credentials,
    });
    return res;
  }
  async removeUserFromGroup(credentials) {
    const res = await this.request({
      endpoint: "group/removeUser",
      method: "DELETE",
      data: credentials,
    });
    return res;
  }
  async getUsersForGroup(credentials) {
    const res = await this.request({
      endpoint: "group/group-users/",
      method: "POST",
      data: credentials,
    });
    return res;
  }
  async updateGroup(credentials) {
    const res = await this.request({
      endpoint: "group/updateInfo/",
      method: "PATCH",
      data: credentials,
    });
    return res;
  }
  
  async deleteGroupById(credentials) {
    const res = await this.request({
      endpoint: "group/delete/" + credentials,
      method: "DELETE",
    });
    return res;
  }
  async getUserById(credentials) {
    const res = await this.request({
      endpoint: "auth/" + credentials,
      method: "GET",
    });
    return res;
  }

  async deleteUserById(credentials) {
    const res = await this.request({
      endpoint: "auth/delete/" + credentials,
      method: "DELETE",
    });
    return res;
  }
  async getGroupById(credentials) {
    const res = await this.request({
      endpoint: "group/search/" + credentials,
      method: "GET",
    });
    return res;
  }


}

export default new ApiClient(
  process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);
