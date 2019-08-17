import axios from "axios";

export default {

  // users

  getUserInfo: function (uid) {
    return axios.get("/api/user/" + uid);
  },

  // audits

  getAllAudits: function () {
    return axios.get("/api/audit/all/");
  },

  getSelectedAudit: function (id) {
    return axios.get("/api/audit/" + id);
  },

  saveNewAudit: function (auditData) {
    return axios.post("/api/audit/new", auditData);
  },

  // clients

  getAllClients: function () {
    return axios.get("/api/client/all");
  },

  saveNewClient: function (clientData) {
    return axios.post("/api/client/new", clientData);
  },

  getClientInfo: function (id) {
    return axios.get("/api/client/" + id);
  },

  saveEditedClient: function (clientInfo) {
    return axios.put("/api/client/edit/", clientInfo);
  },

  // surveys

  getAnswersFromCCI: function (auditId) {
    return axios.get("/api/survey/cci/" + auditId);
  },

  saveAnswersToCCI: function (answers) {
    return axios.put("/api/survey/cci", answers);
  },

  getAnswersFromCEFS: function (auditId) {
    return axios.get("/api/survey/cefs/" + auditId);
  },

  saveAnswersToCEFS: function (answers) {
    return axios.put("/api/survey/cefs", answers);
  },

  // balanzas

  uploadBalanza: function (csvFile) {
    return axios.post("/api/upload/balanza/", csvFile);
  }
};
