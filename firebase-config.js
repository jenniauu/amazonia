<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAvldOqrLIV8Exn3ALbMElkId8NhR_7Td8",
    authDomain: "ambiental-95d5c.firebaseapp.com",
    projectId: "ambiental-95d5c",
    storageBucket: "ambiental-95d5c.firebasestorage.app",
    messagingSenderId: "132809005949",
    appId: "1:132809005949:web:8f2a5a9bcfb0c8f0e64a14",
    measurementId: "G-0R2Y9Y5Q43"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
