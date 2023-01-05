package com.montesown.BeeTracker.controllers;

import com.montesown.BeeTracker.WeatherService;
import com.montesown.BeeTracker.dao.FrameDao;
import com.montesown.BeeTracker.dao.InspectionDao;
import com.montesown.BeeTracker.model.Box;
import com.montesown.BeeTracker.model.Forcast;
import com.montesown.BeeTracker.model.Frame;
import com.montesown.BeeTracker.model.Inspection;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
public class InspectionController {

    private InspectionDao inspectionDao;
    private FrameDao frameDao;
    private WeatherService weatherService = new WeatherService();

    public InspectionController(InspectionDao inspectionDao,FrameDao frameDao) {
        this.inspectionDao = inspectionDao;
        this.frameDao = frameDao;
    }

    @RequestMapping(path = "/inspections",method = RequestMethod.GET)
    public List<Inspection> list() { return inspectionDao.list(); }

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
            return "0";
        } else {
            return notes;
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/inspections", method = RequestMethod.POST)
    public int newInspection(@RequestBody Inspection inspection) throws Exception {
        return inspectionDao.createInspection();
    }

    @RequestMapping(path = "/inspections/{inspectionId}/notes", method = RequestMethod.PUT)
    public void updateNotes(@RequestBody Inspection inspection, @PathVariable int inspectionId) {
        inspectionDao.updateNotes(inspection.getNotes(), inspectionId);
    }

    @RequestMapping(path = "/inspections/{inspectionId}/frames/{boxNum}", method = RequestMethod.GET)
    public List<Frame> getFramesByInspectionId(@PathVariable int inspectionId, @PathVariable int boxNum) {
        return frameDao.getFrameByInspectionAndBox(inspectionId,boxNum);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/frames",method = RequestMethod.POST)
    public Frame newFrame(@RequestBody Frame frame) { return frameDao.createFrame(frame); }

    @RequestMapping(path = "/inspections", method = RequestMethod.PUT)
    public void addRestOfInspection(@RequestBody Inspection inspection) {
        inspectionDao.updateInspection(inspection);
    }

    @RequestMapping(path = "/getWeather",method = RequestMethod.GET)
    public String getWeather() throws Exception {
        Forcast forcast = weatherService.getCurrentWeather();
        String weather = "The current weather is " + forcast.getTemp() + "F and " + forcast.getCondition();
        return weather;
    }

}
