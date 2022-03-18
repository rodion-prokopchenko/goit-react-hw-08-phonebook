import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import contactSelectors from "../redux/contacts/contact-selectors";
import contactOperations from "../redux/contacts/contact-actions";
import { useEffect } from "react";
import s from "./ContactPage.module.css";
import { RotatingLines } from "react-loader-spinner";

export default function ContactPage() {
  const dispatch = useDispatch();

  const contacts = useSelector(contactSelectors.getContacts);
  const isFetching = useSelector(contactSelectors.getFetching);
  const filter = useSelector(contactSelectors.getValueFilter);
  const filterStore = getVisibleContacts(contacts);

  useEffect(() => dispatch(contactOperations.getContact()), [dispatch]);

  const getVisibleContacts = (contact) => {
    if (filter === "") return contact;
    const normalizedFilter = filter.toLowerCase();

    return contact.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

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
          <RotatingLines
            width="100"
            strokeColor="#6495ED"
            strokeWidth="3"
            animationDuration="3"
          />
        ) : (
          <ContactList
            filteredContacts={filterStore}
            isFetching={isFetching}
            compairContacts={compairContacts}
          />
        )}
      </div>
    </>
  );
}
