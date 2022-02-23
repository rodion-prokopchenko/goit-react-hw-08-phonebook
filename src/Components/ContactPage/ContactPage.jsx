import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import contactSelectors from "../redux/contacts/contact-selectors";
import contactOperations from "../redux/contacts/contact-actions";
import { useEffect } from "react";
import s from "./ContactPage.module.css";

export default function ContactPage() {
  const dispatch = useDispatch();

  const contacts = useSelector(contactSelectors.getContacts);
  const isFetching = useSelector(contactSelectors.getFetching);
  const filter = useSelector(contactSelectors.getValueFilter);

  useEffect(() => dispatch(contactOperations.getContact()), [dispatch]);

  const getVisibleContacts = (contact) => {
    if (filter === "") return contact;
    const normalizedFilter = filter.toLowerCase();

    return contact.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filterStore = getVisibleContacts(contacts);

  function compairContacts(e) {
    if (contacts.length === 0) return;
    if (contacts.some(({ name }) => name === e)) {
      return true;
    }
  }

  return (
    <>
      <div className={s.contactPage}>
        <ContactForm compairContacts={compairContacts} />
        <Filter />
        {isFetching === "pending" ? (
          <h2>Loading...</h2>
        ) : (
          <ContactList filteredContacts={filterStore} isFetching={isFetching} />
        )}
      </div>
    </>
  );
}
