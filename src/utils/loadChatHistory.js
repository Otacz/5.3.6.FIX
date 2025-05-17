import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function loadChatHistory(userId, chatId) {
  const q = query(
    collection(db, "geriapp-history"),
    where("userId", "==", userId),
    where("chatId", "==", chatId),
    orderBy("timestamp")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}