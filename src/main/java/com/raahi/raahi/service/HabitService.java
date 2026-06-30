package com.raahi.raahi.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.raahi.raahi.model.Habit;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HabitService {

    private static final String COLLECTION_NAME = "habits";

    // ==========================
    // CREATE
    // ==========================

    public String saveHabit(Habit habit) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference docRef =
                firestore.collection(COLLECTION_NAME).document();

        habit.setId(docRef.getId());

        if (habit.getStatus() == null || habit.getStatus().isBlank()) {
            habit.setStatus("Pending");
        }

        habit.setStreak(0);

        docRef.set(habit).get();

        return "Habit saved successfully!";
    }

    // ==========================
    // READ
    // ==========================

    public List<Habit> getHabits() throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> future =
                firestore.collection(COLLECTION_NAME).get();

        List<QueryDocumentSnapshot> documents =
                future.get().getDocuments();

        List<Habit> habits = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {

            habits.add(document.toObject(Habit.class));

        }

        return habits;

    }

    // ==========================
    // UPDATE
    // ==========================

    public String updateHabit(String id, Habit habit) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        habit.setId(id);

        firestore.collection(COLLECTION_NAME)
                .document(id)
                .set(habit)
                .get();

        return "Habit updated successfully!";
    }
    // ==========================
    // DELETE
    // ==========================

    public String deleteHabit(String id) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        firestore.collection(COLLECTION_NAME)
                .document(id)
                .delete()
                .get();

        return "Habit deleted successfully!";
    }

    // ==========================
    // COMPLETE
    // ==========================

    public String completeHabit(String id) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference docRef =
                firestore.collection(COLLECTION_NAME)
                        .document(id);

        Habit habit =
                docRef.get().get().toObject(Habit.class);

        if (habit == null) {

            return "Habit not found!";

        }

        habit.setStatus("Completed");

        habit.setStreak(habit.getStreak() + 1);

        docRef.set(habit).get();

        return "Habit completed!";
    }

}