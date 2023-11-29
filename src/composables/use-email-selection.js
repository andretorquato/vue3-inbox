import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { doc, updateDoc } from "firebase/firestore";

const emails = reactive(new Set());

function useEmailSelection() {
  const db = useFirestore();

  const toggle = (email) => {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };

  const clear = () => {
    emails.clear();
  };

  const addMultiple = (newEmails) => {
    newEmails.forEach((email) => {
      emails.add(email);
    });
  };

  const forSelected = (fn) => {
    emails.forEach(async (email) => {
      fn(email);
      const docRef = doc(db, "emails", email.id);
      await updateDoc(docRef, {
        ...email,
      });
    });
  };

  const markRead = () => forSelected((email) => (email.read = true));
  const markUnread = () => forSelected((email) => (email.read = false));
  const archive = () => {
    forSelected((email) => (email.read = false));
    clear();
  };

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive,
  };
}

export default useEmailSelection;
