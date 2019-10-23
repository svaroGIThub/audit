const navbarReducers = (
  state = {
    homeMenu: { show: false, active: null },
    auditMenu: { show: false, active: null, items: [] }
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
    case "navbar/setHomeActive":
      return {
        ...state,
        homeMenu: {
          ...state.homeMenu,
          active: action.data
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
