import axios from "axios";

export default {

    loginUser: function (username, password) {
        return axios.get("/api/login", username, password);
    }

};
