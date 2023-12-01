import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

function useTags() {
  const db = useFirestore();
  const tags = useCollection(collection(db, 'tags'));
  return {
    tags,
  };
}

export default useTags;
