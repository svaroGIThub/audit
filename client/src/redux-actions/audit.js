export const openAudit = data => {
  return {
    type: "audit/open",
    data
  };
};

export const closeAudit = () => {
  return {
    type: "audit/close"
  };
};
