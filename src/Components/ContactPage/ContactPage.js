import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";

import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../redux/contacts/contact-actions(previous)";
import {
  getValueFilter,
  getContacts,
  getFetching,
} from "../redux/contacts/contact-selectors";
import contactOperations from "../redux/contacts/contact-actions";
import { useEffect } from "react";

export default function ContactPage() {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const isFetching = useSelector(getFetching);
  console.log(contacts);
  console.log(isFetching);

  const filter = useSelector(getValueFilter);

  useEffect(
    () => dispatch(contactOperations.getContact()),
    // console.log(contacts),
    [dispatch]
  );
  console.log(contacts);

  const getVisibleContacts = (contact) => {
    if (filter === "") return contact;
    const normalizedFilter = filter.toLowerCase();

    return contact.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filterStore = getVisibleContacts(contacts);

  const onChangeFilter = (e) => dispatch(changeFilter(e));

  function compairContacts(e) {
    if (contacts.length === 0) return;
    if (contacts.some(({ name }) => name === e)) {
      return true;
    }
  }

  return (
    <>
      <div>
        <ContactForm compairContacts={compairContacts} />
        <h2>Contacts</h2>
        <Filter onChange={onChangeFilter} contacts={contacts} />
        {isFetching === "pending" ? (
          <h2>Loading...</h2>
        ) : (
          <ContactList filteredContacts={filterStore} isFetching={isFetching} />
        )}
      </div>
    </>
  );
}
