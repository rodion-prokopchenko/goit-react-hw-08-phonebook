import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";

import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../redux/contacts/contact-actions";
import { getValueFilter } from "../redux/contacts/contact-selectors";
import {
  useFetchContactQuery,
  useDeleteContactMutation,
} from "../API/contactAPI";

export default function ContactPage() {
  const { data, isFetching } = useFetchContactQuery();
  const filter = useSelector(getValueFilter);
  const [deleteContact] = useDeleteContactMutation();
  const getVisibleContacts = (contacts) => {
    if (filter === "") return contacts;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filterStore = getVisibleContacts(data);

  const dispatch = useDispatch();
  const onChangeFilter = (e) => dispatch(changeFilter(e));

  function compairContacts(e) {
    if (!data) return;
    if (data.some(({ name }) => name === e)) {
      return true;
    }
  }

  return (
    <>
      <div>
        <ContactForm compairContacts={compairContacts} />
        <h2>Contacts</h2>
        <Filter onChange={onChangeFilter} contacts={data} />
        <ContactList
          deleteContact={deleteContact}
          filteredContacts={filterStore}
          isFetching={isFetching}
        />
      </div>
    </>
  );
}
