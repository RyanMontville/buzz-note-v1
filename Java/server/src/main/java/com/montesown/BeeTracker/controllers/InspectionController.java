package com.montesown.BeeTracker.controllers;

import com.montesown.BeeTracker.dao.FrameDao;
import com.montesown.BeeTracker.dao.InspectionDao;
import com.montesown.BeeTracker.model.Frame;
import com.montesown.BeeTracker.model.Inspection;
import org.springframework.data.relational.core.sql.In;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
public class InspectionController {

    private InspectionDao inspectionDao;
    private FrameDao frameDao;

    public InspectionController(InspectionDao inspectionDao,FrameDao frameDao) {
        this.inspectionDao = inspectionDao;
        this.frameDao = frameDao;
    }

    @RequestMapping(path = "/inspections",method = RequestMethod.GET)
    public List<Inspection> list() {
        return inspectionDao.list();
    }

    @RequestMapping(path = "/inspections/{inspectionId}", method = RequestMethod.GET)
    public Inspection getInspection(@PathVariable int inspectionId) {
        Inspection inspection = inspectionDao.getInspection(inspectionId);
        if (inspection==null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Inspection not found.");
        } else {
            return inspection;
        }
    }

    @RequestMapping(path = "/inspections/{inspectionId}/notes", method = RequestMethod.GET)
    public String getNotesByInspectionId(@PathVariable int inspectionId) {
        String notes = inspectionDao.getNotesByInspectionId(inspectionId);
        if (notes==null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No notes found.");
        } else {
            return notes;
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/inspections", method = RequestMethod.POST)
    public int newInspection(@RequestBody Inspection inspection) {
        return inspectionDao.createInspection(inspection);
    }

    @RequestMapping(path = "/inspections/{inspectionId}/notes", method = RequestMethod.PUT)
    public void updateNotes(@RequestBody String notes, @PathVariable int inspectionId) {
        inspectionDao.updateNotes(notes, inspectionId);
    }

    @RequestMapping(path = "/inspections/{inspectionId}/frames/{boxNum}", method = RequestMethod.GET)
    public List<Frame> getFramesByInspectionId(@PathVariable int inspectionId, @PathVariable int boxNum) {
        return frameDao.getFrameByInspectionAndBox(inspectionId,boxNum);
    }

    //TODO make create frame endpoint,how do you get inspection id before creating the inspection?
}
