package com.raahi.raahi.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() throws IOException {

        InputStream serviceAccount =
                getClass().getClassLoader()
                        .getResourceAsStream("firebase/raahi-d60af-firebase-adminsdk-fbsvc-001ef2e7a7.json");

        if (serviceAccount == null) {
            throw new RuntimeException("Firebase service account file not found.");
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}