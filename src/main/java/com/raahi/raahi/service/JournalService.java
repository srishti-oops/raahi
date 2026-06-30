package com.raahi.raahi.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.raahi.raahi.model.Journal;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JournalService {

    private static final String COLLECTION_NAME = "journals";

    // ==========================
    // CREATE
    // ==========================

    public String saveJournal(Journal journal) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference docRef =
                firestore.collection(COLLECTION_NAME).document();

        journal.setId(docRef.getId());

        docRef.set(journal).get();

        return "Journal saved successfully!";
    }

    // ==========================
    // READ
    // ==========================

    public List<Journal> getJournals() throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> future =
                firestore.collection(COLLECTION_NAME).get();

        List<QueryDocumentSnapshot> documents =
                future.get().getDocuments();

        List<Journal> journals = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {

            journals.add(document.toObject(Journal.class));

        }

        return journals;

    }

    // ==========================
    // UPDATE
    // ==========================

    public String updateJournal(String id,
                                Journal journal) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        journal.setId(id);

        firestore.collection(COLLECTION_NAME)
                .document(id)
                .set(journal)
                .get();

        return "Journal updated successfully!";
    }
    // ==========================
    // DELETE
    // ==========================

    public String deleteJournal(String id) throws Exception {

        Firestore firestore = FirestoreClient.getFirestore();

        firestore.collection(COLLECTION_NAME)
                .document(id)
                .delete()
                .get();

        return "Journal deleted successfully!";
    }

}