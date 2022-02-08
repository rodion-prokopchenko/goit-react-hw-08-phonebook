const getValueFilter = (state) => state.filter;

const getContacts = (state) => state.contacts.contacts;

const getFetching = (state) => state.contacts.isFetching;

const getUpdating = (state) => state.contacts.isUpdatingContact;

const contactSelectors = {
  getValueFilter,
  getContacts,
  getFetching,
  getUpdating,
};
export default contactSelectors;
