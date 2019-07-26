import axios from "axios";

export default {
    // login user
    loginUser: function () {
        return axios.get("/api/login", user, password);
    },
};
