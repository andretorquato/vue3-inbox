import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

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

  const forSelectedDelete = (fn) => {
    emails.forEach(async (email) => {
      fn(email);
      const docRef = doc(db, "emails", email.id);
      await deleteDoc(docRef);
    });
  }

  const markRead = () => forSelected((email) => (email.read = true));
  const markUnread = () => forSelected((email) => (email.read = false));
  const archive = () => {
    forSelected((email) => (email.read = false));
    clear();
  };

  const remove = () => {
    forSelectedDelete((email) => (email.deleted = true));
    clear();
  }

  const selectTags = (tags) => {
    forSelected((email) => (email.tags = tags));
    clear();
  }

  const selectedTags = () => {
    const tags = new Set();
    emails.forEach((email) => {
      email?.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }

  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive,
    remove,
    selectTags,
    selectedTags,
  };
}

export default useEmailSelection;
