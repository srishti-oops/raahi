package com.raahi.raahi.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.raahi.raahi.model.User;
import org.springframework.stereotype.Service;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;

@Service
public class UserService {

    private static final String COLLECTION_NAME = "users";

    public String saveUser(User user) throws Exception {

        CreateRequest request = new CreateRequest()
                .setUid(user.getId())
                .setEmail(user.getEmail())
                .setPassword("123456");

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<?> future = firestore
                .collection(COLLECTION_NAME)
                .document(user.getId())
                .set(user);

        future.get();

        return "User saved successfully!";
    }
    public void loginUser(User user) throws Exception {

        UserRecord userRecord = FirebaseAuth.getInstance()
                .getUserByEmail(user.getEmail());

        if (userRecord == null) {
            throw new Exception("User not found.");
        }

    }
}