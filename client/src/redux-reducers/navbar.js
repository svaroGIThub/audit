const navbarReducers = (
  state = {
    auditDropdown: { show: false, items: [] },
    consultDropdown: { show: false, items: [] }
  },
  action
) => {
  switch (action.type) {
    case "navbar/showAuditDropdown":
      return {
        auditDropdown: true
      };
    case "navbar/hideAuditDropdown":
      return {
        auditDropdown: false
      };
    case "navbar/showConsultDropdown":
      return {
        consultDropdown: true
      };
    case "navbar/hideConsultDropdown":
      return {
        consultDropdown: false
      };
    default:
      return state;
  }
};

export default navbarReducers;
