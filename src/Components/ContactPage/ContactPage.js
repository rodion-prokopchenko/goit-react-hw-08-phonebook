import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";

import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../redux/contacts/contact-actions(previous)";
import {
  getValueFilter,
  getContacts,
} from "../redux/contacts/contact-selectors";
import contactOperations from "../redux/contacts/contact-actions";

export default function ContactPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const deleteContact = dispatch(contactOperations.deleteContact);
  const fetchContact = dispatch(contactOperations.getContact);

  const filter = useSelector(getValueFilter);

  const getVisibleContacts = (contact) => {
    if (filter === "") return contact;
    const normalizedFilter = filter.toLowerCase();

    return contact.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filterStore = getVisibleContacts(fetchContact);
  console.log(dispatch(contactOperations.getContact));

  const onChangeFilter = (e) => dispatch(changeFilter(e));

  function compairContacts(e) {
    if (fetchContact.length !== 0) return;
    if (fetchContact.some(({ name }) => name === e)) {
      return true;
    }
  }

  return (
    <>
      <div>
        <ContactForm compairContacts={compairContacts} />
        <h2>Contacts</h2>
        <Filter onChange={onChangeFilter} contacts={contacts} />
        <ContactList
          deleteContact={deleteContact}
          filteredContacts={filterStore}
          // isFetching={isFetching}
        />
      </div>
    </>
  );
}
