import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

import { auth, db } from "./firebaseConfig";

/* ---------------- REGISTER ---------------- */
export const registerUser = async (data) => {
  const userCred = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const user = userCred.user;

  await setDoc(doc(db, "students", user.uid), {
    studentId: data.studentId,
    name: data.name,
    email: data.email,
    department: data.department,
    year: data.year,
    uid: user.uid
  });

  return user;
};

/* ---------------- LOGIN ---------------- */
export const loginUser = async (email, password) => {
  const userCred = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCred.user;
};

/* ---------------- GET PROFILE ---------------- */
export const getUser = async (uid) => {
  const snap = await getDoc(doc(db, "students", uid));
  return snap.exists() ? snap.data() : null;
};
export const getStudentProfile = async (uid) => {
  try {
    const docRef = doc(db, "students", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};