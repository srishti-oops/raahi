package com.raahi.raahi.controller;

import com.raahi.raahi.model.Journal;
import com.raahi.raahi.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journals")
@CrossOrigin
public class JournalController {

    @Autowired
    private JournalService journalService;

    // ==========================
    // CREATE
    // ==========================

    @PostMapping
    public String createJournal(@RequestBody Journal journal) throws Exception {

        return journalService.saveJournal(journal);

    }

    // ==========================
    // READ
    // ==========================

    @GetMapping
    public List<Journal> getJournals() throws Exception {

        return journalService.getJournals();

    }

    // ==========================
    // UPDATE
    // ==========================

    @PutMapping("/{id}")
    public String updateJournal(
            @PathVariable String id,
            @RequestBody Journal journal) throws Exception {

        return journalService.updateJournal(id, journal);

    }

    // ==========================
    // DELETE
    // ==========================

    @DeleteMapping("/{id}")
    public String deleteJournal(
            @PathVariable String id) throws Exception {

        return journalService.deleteJournal(id);

    }

}