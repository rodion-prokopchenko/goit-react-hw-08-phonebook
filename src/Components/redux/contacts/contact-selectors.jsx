const getValueFilter = (state) => state.filter;

const getContacts = (state) => state.contacts.contacts;

const getFetching = (state) => state.contacts.isFetching;

const contactSelectors = {
  getValueFilter,
  getContacts,
  getFetching,
};
export default contactSelectors;
