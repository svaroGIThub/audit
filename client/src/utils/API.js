import axios from "axios";

export default {

    // login user
    loginUser: function (username, password) {
        return axios.get("/api/login", username, password);
    }

};
