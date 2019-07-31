import axios from "axios";

export default {

    getUserInfo: function (uid) {
        return axios.get("/api/user/" + uid);
    }

};
