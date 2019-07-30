import axios from "axios";

export default {

    getUser: function (uid) {
        return axios.get("/api/user/" + uid);
    }

};
