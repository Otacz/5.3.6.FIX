import { doc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteChatWithHistory(chatId, userId, currentUserRole = "user") {
  if (currentUserRole !== "admin") {
    // Získat chat a ověřit, že userId odpovídá vlastníkovi
    const chatRef = doc(db, "geriapp-chats", chatId);
    const chatSnapshot = await getDocs(query(collection(db, "geriapp-chats"), where("__name__", "==", chatId)));
    const chatData = chatSnapshot.docs[0]?.data();

    if (!chatData || chatData.userId !== userId) {
      throw new Error("Nemáš oprávnění tento chat smazat.");
    }
  }

  // Smazat hlavní záznam chatu
  await deleteDoc(doc(db, "geriapp-chats", chatId));

  // Smazat všechny zprávy z historie
  const historyQuery = query(
    collection(db, "geriapp-history"),
    where("chatId", "==", chatId)
  );
  const historySnapshot = await getDocs(historyQuery);
  const deletions = historySnapshot.docs.map(docRef => deleteDoc(docRef.ref));
  await Promise.all(deletions);
}