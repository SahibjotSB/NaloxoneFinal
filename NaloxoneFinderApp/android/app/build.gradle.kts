plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.gms.google-services") // Apply the Firebase plugin
}

android {
    compileSdk = 34
    defaultConfig {
        applicationId = "com.team.naloxonefinder"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }
    // Other configurations...
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation(platform("com.google.firebase:firebase-bom:32.5.0")) // Firebase BoM
    implementation("com.google.firebase:firebase-analytics") // Firebase Analytics
    // Add other Firebase dependencies as needed
}