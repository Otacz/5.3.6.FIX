import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function loadPresetMemory(chatId) {
  const docRef = doc(db, "geriapp-chats", chatId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().presetMemory || "";
  } else {
    return "";
  }
}