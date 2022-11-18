package com.montesown.BeeTracker.model;

import java.time.LocalDate;
import java.time.LocalTime;

public class Inspection {
    //private List<Box> boxes;
    private int inspectionId;
    private int weatherTemp;
    private String weatherCondition;
    private String inspectionDate;
    private String  startTime;
    private String beeTemperament;
    private String beePopulation;
    private String dronePopulation;
    private String layingPattern;
    private String hiveBeetles;
    private String otherPests;
    private String notes;

    public Inspection(int weatherTemp, String weatherCondition, String inspectionDate, String startTime) {
        this.weatherTemp = weatherTemp;
        this.weatherCondition = weatherCondition;
        this.inspectionDate = inspectionDate;
        this.startTime = startTime;
    }

    public Inspection() { };

    public int getInspectionId() { return inspectionId; }

    public void setInspectionId(int inspectionId) { this.inspectionId = inspectionId; }

    public void setWeatherTemp(int weatherTemp) { this.weatherTemp = weatherTemp; }

    public int getWeatherTemp() { return weatherTemp; }

    public String getWeatherCondition() {
        return weatherCondition;
    }

    public void setWeatherCondition(String weatherCondition) {
        this.weatherCondition = weatherCondition;
    }

    public String getInspectionDate() { return inspectionDate; }

    public void setInspectionDate(String  inspectionDate) { this.inspectionDate = inspectionDate; }

    public String  getStartTime() { return startTime; }

    public void setStartTime(String  startTime) { this.startTime = startTime; }

    public String getBeeTemperament() {
        return beeTemperament;
    }

    public void setBeeTemperament(String beeTemperament) {
        this.beeTemperament = beeTemperament;
    }

    public String getBeePopulation() {
        return beePopulation;
    }

    public void setBeePopulation(String beePopulation) {
        this.beePopulation = beePopulation;
    }

    public String getDronePopulation() {
        return dronePopulation;
    }

    public void setDronePopulation(String dronePopulation) {
        this.dronePopulation = dronePopulation;
    }

    public String getLayingPattern() {
        return layingPattern;
    }

    public void setLayingPattern(String layingPattern) {
        this.layingPattern = layingPattern;
    }

    public String getHiveBeetles() {
        return hiveBeetles;
    }

    public void setHiveBeetles(String hiveBeetles) {
        this.hiveBeetles = hiveBeetles;
    }

    public String getOtherPests() {
        return otherPests;
    }

    public void setOtherPests(String otherPests) {
        this.otherPests = otherPests;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

}
