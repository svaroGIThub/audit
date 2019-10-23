const navbarReducers = (
  state = {
    homeMenu: { show: false },
    auditMenu: { show: false, items: [] }
  },
  action
) => {
  switch (action.type) {
    // ==================================================================
    // HOME menu
    case "navbar/showHomeMenu":
      return {
        ...state,
        homeMenu: {
          show: true
        }
      };
    case "navbar/hideHomeMenu":
      return {
        ...state,
        homeMenu: {
          show: false
        }
      };
    // ==================================================================
    // ADUIT menu
    case "navbar/showAuditMenu":
      return {
        ...state,
        auditMenu: {
          show: true,
          items: action.data
        }
      };
    case "navbar/hideAuditMenu":
      return {
        ...state,
        auditMenu: {
          show: false
        }
      };
    default:
      return state;
  }
};

export default navbarReducers;
