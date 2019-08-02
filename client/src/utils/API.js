import axios from "axios";

export default {

    getUserInfo: function (uid) {
        return axios.get("/api/user/" + uid);
    },

    getAllAudits: function () {
        return axios.get("/api/audit/all/");
    },

    getAllClients: function () {
        return axios.get("/api/client/all/");
    },

    getSelectedAudit: function (aid) {
        return axios.get("/api/audit/" + aid);
    }

};
