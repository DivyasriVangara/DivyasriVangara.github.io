// js/attendance.js
import {
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "./firebase-config.js";

/**
 * Writes an attendance record to Firestore after both QR + fingerprint checks pass.
 * @param {Object} params
 * @param {string} params.studentId - Firebase Auth UID
 * @param {string} params.studentEmail
 * @param {string} params.qrPayload - raw decoded QR text (e.g. "SESSION:CSE101:2026-06-24")
 */
export async function markAttendance({ studentId, studentEmail, qrPayload }) {
  // Prevent duplicate attendance for the same session on the same day
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const existingQuery = query(
    collection(db, "attendance"),
    where("studentId", "==", studentId),
    where("session", "==", qrPayload),
    where("date", "==", today)
  );
  const existingDocs = await getDocs(existingQuery);

  if (!existingDocs.empty) {
    throw new Error("Attendance already marked for this session today.");
  }

  const docRef = await addDoc(collection(db, "attendance"), {
    studentId,
    studentEmail,
    session: qrPayload,
    date: today,
    verifiedBy: "qr+fingerprint",
    timestamp: serverTimestamp()
  });

  return docRef.id;
}