export const showMenuDropdown = () => {
  return {
    type: "navbar/showMenuDropdown"
  };
};

export const hideMenuDropdown = () => {
  return {
    type: "navbar/hideMenuDropdown"
  };
};

export const showAuditDropdown = data => {
  return {
    type: "navbar/showAuditDropdown",
    data
  };
};

export const hideAuditDropdown = () => {
  return {
    type: "navbar/hideAuditDropdown"
  };
};

export const showConsultDropdown = data => {
  return {
    type: "navbar/showConsultDropdown",
    data
  };
};

export const hideConsultDropdown = () => {
  return {
    type: "navbar/hideConsultDropdown"
  };
};
