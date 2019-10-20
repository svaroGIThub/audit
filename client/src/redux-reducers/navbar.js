const navbarReducers = (
  state = {
    menuDropdown: { show: true },
    auditDropdown: { show: false, items: [] },
    consultDropdown: { show: false, items: [] }
  },
  action
) => {
  switch (action.type) {
    case "navbar/showMenuDropdown":
      return {
        ...state,
        menuDropdown: {
          show: true
        }
      };
    case "navbar/hideMenuDropdown":
      return {
        ...state,
        menuDropdown: {
          show: false
        }
      };
    case "navbar/showAuditDropdown":
      return {
        ...state,
        auditDropdown: {
          show: true,
          items: action.data
        }
      };
    case "navbar/hideAuditDropdown":
      return {
        ...state,
        auditDropdown: {
          show: false
        }
      };
    case "navbar/showConsultDropdown":
      return {
        ...state,
        consultDropdown: {
          show: true,
          items: action.data
        }
      };
    case "navbar/hideConsultDropdown":
      return {
        ...state,
        consultDropdown: {
          show: false
        }
      };
    default:
      return state;
  }
};

export default navbarReducers;
