// ==================================================================
// HOME menu actions

export const showHomeMenu = () => {
  return {
    type: "navbar/showHomeMenu"
  };
};

export const hideHomeMenu = () => {
  return {
    type: "navbar/hideHomeMenu"
  };
};

export const setHomeActive = data => {
  return {
    type: "navbar/setHomeActive",
    data
  };
};

// ==================================================================
// AUDIT menu actions

export const showAuditMenu = data => {
  return {
    type: "navbar/showAuditMenu",
    data
  };
};

export const hideAuditMenu = () => {
  return {
    type: "navbar/hideAuditMenu"
  };
};
