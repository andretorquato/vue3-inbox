import { reactive } from "vue";
import axios from "axios";

const emails = reactive(new Set());

function useEmailSelection() {
  const toggle = email => {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };

  const clear = () => {
    emails.clear();
  };

  const addMultiple = newEmails => {
    newEmails.forEach(email => {
      emails.add(email);
    });
  };

  const forSelected = fn => {
    emails.forEach(email => {
      fn(email);
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    })
  }

  const markRead = () => forSelected(email => email.read = true);
  const markUnread = () => forSelected(email => email.read = false);
  const archive = () => { forSelected(email => email.read = false); clear(); };

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive
  };
}

export default useEmailSelection;
