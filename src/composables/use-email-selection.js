import { reactive } from "vue";

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
  return {
    emails,
    toggle,
    clear,
    addMultiple
  };
}

export default useEmailSelection;
