package com.montesown.BeeTracker.controllers;

import com.montesown.BeeTracker.WeatherService;
import com.montesown.BeeTracker.dao.FrameDao;
import com.montesown.BeeTracker.dao.InspectionDao;
import com.montesown.BeeTracker.model.BoxSet;
import com.montesown.BeeTracker.model.Forecast;
import com.montesown.BeeTracker.model.Frame;
import com.montesown.BeeTracker.model.Inspection;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    /************************************************* GETS ***********************************************************/
    @RequestMapping(path = "/inspections",method = RequestMethod.GET)
    public List<Inspection> list() { return inspectionDao.list(); }

    @RequestMapping(path = "/inspections/{startDate}/{endDate}", method = RequestMethod.GET)
    public List<Inspection> searchDates(@PathVariable String startDate, @PathVariable String endDate) {
        return inspectionDao.searchByDate(startDate,endDate);
    }

    @RequestMapping(path = "/numberOfInspections", method = RequestMethod.GET)
    public int numberOfInspections() { return inspectionDao.list().size(); }

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

    @RequestMapping(path = "/inspections/{inspectionId}/frames/{boxNum}", method = RequestMethod.GET)
    public List<Frame> getFramesByInspectionId(@PathVariable int inspectionId, @PathVariable int boxNum) {
        return frameDao.getFrameByInspectionAndBox(inspectionId,boxNum);
    }

    @RequestMapping(path = "/inspection/{inspectionId}/frames", method = RequestMethod.GET)
    public BoxSet getFramesByInspectionId(@PathVariable int inspectionId) {
        List<Frame> BoxThree = frameDao.getFrameByInspectionAndBox(inspectionId,3);
        List<Frame> BoxTwo = frameDao.getFrameByInspectionAndBox(inspectionId,2);
        List<Frame> BoxOne = frameDao.getFrameByInspectionAndBox(inspectionId,1);
        BoxSet results = new BoxSet(BoxThree,BoxTwo,BoxOne);
        return results;
    }

    @RequestMapping(path = "/getWeather",method = RequestMethod.GET)
    public String getWeather() throws Exception {
        Forecast forecast = weatherService.getCurrentWeather();
        String weather = "The current weather is " + forecast.getTemp() + "F and " + forecast.getCondition();
        return weather;
    }

    /************************************************ POSTS ***********************************************************/
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/inspections", method = RequestMethod.POST)
    public int newInspection(@RequestBody Inspection inspection) throws Exception {
        return inspectionDao.createInspection();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/frames",method = RequestMethod.POST)
    public Frame newFrame(@RequestBody Frame frame) { return frameDao.createFrame(frame); }

    /************************************************* PUTS ***********************************************************/
    @RequestMapping(path = "/inspections/{inspectionId}/notes", method = RequestMethod.PUT)
    public String updateNotes(@RequestBody String newNotes, @PathVariable int inspectionId) {
        return inspectionDao.updateNotes(newNotes, inspectionId);
    }

    @RequestMapping(path = "/inspections", method = RequestMethod.PUT)
    public void addRestOfInspection(@RequestBody Inspection inspection) {
        inspectionDao.updateInspection(inspection);
    }

}
