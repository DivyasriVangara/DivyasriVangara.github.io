// js/fingerprint.js
// Uses the browser's built-in WebAuthn API to register and verify a
// platform authenticator (fingerprint / Face ID / Windows Hello).
//
// NOTE: WebAuthn challenges/credentials should normally be generated and
// verified on a server for real security. Since this project uses only
// Firebase (no custom backend), we use Firestore to store the public key
// credential ID per student and verify locally. This is acceptable for a
// school-attendance use case but is NOT the same level of security as a
// full server-verified WebAuthn flow.

function bufferToBase64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlToBuffer(base64url) {
  const padded = base64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    base64url.length + ((4 - (base64url.length % 4)) % 4), "="
  );
  const str = atob(padded);
  const buffer = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) buffer[i] = str.charCodeAt(i);
  return buffer;
}

function randomChallenge() {
  return crypto.getRandomValues(new Uint8Array(32));
}

/**
 * Registers a new fingerprint credential for the given user.
 * Call this once, e.g. from a "Set up fingerprint" button in the dashboard.
 * @param {string} userId - Firebase Auth UID
 * @param {string} userName - display name / email for the credential
 * @returns {Promise<{credentialId: string}>}
 */
export async function registerFingerprint(userId, userName) {
  if (!window.PublicKeyCredential) {
    throw new Error("WebAuthn is not supported on this device/browser.");
  }

  const publicKey = {
    challenge: randomChallenge(),
    rp: { name: "Student Attendance System" },
    user: {
      id: new TextEncoder().encode(userId),
      name: userName,
      displayName: userName
    },
    pubKeyCredParams: [
      { type: "public-key", alg: -7 },   // ES256
      { type: "public-key", alg: -257 }  // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform", // forces fingerprint/Face ID, not USB key
      userVerification: "required"
    },
    timeout: 60000,
    attestation: "none"
  };

  const credential = await navigator.credentials.create({ publicKey });
  const credentialId = bufferToBase64url(credential.rawId);

  return { credentialId };
}

/**
 * Verifies the student's fingerprint against a previously stored credential ID.
 * @param {string} storedCredentialId - base64url credential ID saved in Firestore
 * @returns {Promise<boolean>} true if verification succeeded
 */
export async function verifyFingerprint(storedCredentialId) {
  if (!window.PublicKeyCredential) {
    throw new Error("WebAuthn is not supported on this device/browser.");
  }

  const allowCredentials = [
    {
      id: base64urlToBuffer(storedCredentialId),
      type: "public-key",
      transports: ["internal"]
    }
  ];

  const publicKey = {
    challenge: randomChallenge(),
    allowCredentials,
    userVerification: "required",
    timeout: 60000
  };

  // This call throws/rejects if the fingerprint does not match or is cancelled.
  const assertion = await navigator.credentials.get({ publicKey });
  return !!assertion;
}