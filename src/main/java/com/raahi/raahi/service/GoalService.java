package com.raahi.raahi.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.raahi.raahi.model.Goal;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GoalService {

    private static final String COLLECTION_NAME = "goals";

    // ==========================
    // CREATE
    // ==========================

    public String saveGoal(Goal goal) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference docRef =
                firestore.collection(COLLECTION_NAME).document();

        goal.setId(docRef.getId());

        docRef.set(goal).get();

        return "Goal saved successfully!";
    }

    // ==========================
    // READ ALL
    // ==========================

    public List<Goal> getGoals() throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> future =
                firestore.collection(COLLECTION_NAME).get();

        List<QueryDocumentSnapshot> documents =
                future.get().getDocuments();

        List<Goal> goals = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {

            goals.add(document.toObject(Goal.class));

        }

        return goals;
    }

    // ==========================
    // UPDATE
    // ==========================

    public String updateGoal(String id, Goal goal) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        goal.setId(id);

        firestore.collection(COLLECTION_NAME)
                .document(id)
                .set(goal)
                .get();

        return "Goal updated successfully!";
    }

    // ==========================
    // DELETE
    // ==========================

    public String deleteGoal(String id) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        firestore.collection(COLLECTION_NAME)
                .document(id)
                .delete()
                .get();

        return "Goal deleted successfully!";
    }

    // ==========================
    // COMPLETE
    // ==========================

    public String completeGoal(String id) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        firestore.collection(COLLECTION_NAME)
                .document(id)
                .update("status", "Completed")
                .get();

        return "Goal completed!";
    }

}