import { doc, setDoc, getDoc } from 'firebase/firestore';

const saveUserData = (userId, data) => {
  const userDoc = doc(db, 'users', userId);
  return setDoc(userDoc, data);
};

const getUserData = (userId) => {
  const userDoc = doc(db, 'users', userId);
  return getDoc(userDoc);
};

export { saveUserData, getUserData };
