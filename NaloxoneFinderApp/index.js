import "expo-router/entry";
const functions = require("firebase-functions");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const admin = require("firebase-admin");
const vision = require("@google-cloud/vision");
const serviceAccount = require("./functions/naloxonefinder-2067f-0d2ed2e78bf5.json");


// Initialize Firebase Admin SDK with proper configuration
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "naloxonefinder-2067f.firebasestorage.app",
});
const db = admin.firestore();

// Initialize Google Vision Client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "./google-service-account.json",
});

// Cloud Function to validate photos using Google Vision API
exports.validatePhoto = onObjectFinalized({
  bucket: "naloxonefinder-2067f.firebasestorage.app"
}, async (event) => {
  const object = event.data;
  if (!object || !object.name) {
    console.error("Error: Object or object name is undefined.");
    return;
  }

  const filePath = object.name;
  const bucketName = object.bucket;
  const imageUri = `gs://${bucketName}/${filePath}`;

  try {
    console.log(`Validating photo: ${imageUri}`);

    // Call Google Vision API for object detection
    const [result] = await client.objectLocalization({
      image: { source: { imageUri } },
    });

    const objects = result.localizedObjectAnnotations;

    if (!objects || objects.length === 0) {
      console.log("No objects detected in the image.");
      return;
    }

    // Check if the image contains a 'naloxone' object
    const isValid = objects.some((obj) =>
      obj.name.toLowerCase().includes("naloxone")
    );

    if (isValid) {
      console.log("Photo validated successfully.");

      // Assuming the Firestore collection to store validated photos is 'kits' (adjust as needed)
      await db.collection("kits").add({
        imageUri,
        verified: true,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: "approved", // Adjust the status based on the app’s needs
      });

      // Optionally, you could add more logic here, e.g., sending notifications or triggering other actions
    } else {
      console.log("Invalid photo: Naloxone kit not detected.");
      // Optionally, flag invalid images in a different Firestore collection or take other actions
      await db.collection("kits").add({
        imageUri,
        verified: false,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: "rejected", // Mark as rejected if validation fails
      });
    }
  } catch (error) {
    console.error("Validation error:", error);
    throw new functions.https.HttpsError("internal", "Photo validation failed", error.message);
  }
});
