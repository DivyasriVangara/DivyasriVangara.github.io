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

  const collectionName =
    data.role === "faculty"
      ? "faculty"
      : "students";

  await setDoc(doc(db, collectionName, user.uid), {

    studentId:
      data.role === "student"
        ? data.studentId
        : "",

    facultyId:
      data.role === "faculty"
        ? data.facultyId
        : "",

    name: data.name,

    email: data.email,

    department: data.department,

    year:
      data.role === "student"
        ? data.year
        : "",

    role: data.role,

    uid: user.uid

  });

  return user;

};
/* ---------------- LOGIN ---------------- */

export const loginUser = async (id, password, role) => {

  const collectionName =
    role === "faculty"
      ? "faculty"
      : "students";

  const fieldName =
    role === "faculty"
      ? "facultyId"
      : "studentId";

  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", id)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("ID not found");
  }

  const profile = snapshot.docs[0].data();

  const userCred = await signInWithEmailAndPassword(
    auth,
    profile.email,
    password
  );

  return {
    success: true,
    user: userCred.user,
    profile
  };

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