const auditReducers = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case "audit/open":
      return {
        isOpen: true,
        name: action.data.name,
        clientName: action.data.clientName,
        clientAbbreviation: action.data.clientAbbreviation,
        year: action.data.year,
        description: action.data.description,
        hasBalanza: action.data.hasBalanza,
        hasNómina: action.data.hasNómina
      };
    case "audit/close":
      return {
        isOpen: false
      };
    default:
      return state;
  }
};

export default auditReducers;
