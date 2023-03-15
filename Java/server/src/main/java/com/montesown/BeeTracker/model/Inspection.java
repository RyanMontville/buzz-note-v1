package com.montesown.BeeTracker.model;

public class Inspection {

    private int inspectionId;
    private int weatherTemp;
    private String weatherCondition;
    private String startTime;
    private String inspectionDate;
    private String beeTemperament;
    private String beePopulation;
    private String dronePopulation;
    private String layingPattern;
    private String hiveBeetles;
    private String otherPests;
    private String notes;
    private String boxThree;
    private String boxTwo;
    private String boxOne;

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

    public String getStartTime() { return startTime; }

    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getInspectionDate() { return inspectionDate; }

    public void setInspectionDate(String inspectionDate) { this.inspectionDate = inspectionDate; }

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

    public String getBoxThree() { return boxThree; }

    public void setBoxThree(String boxThree) { this.boxThree = boxThree; }

    public String getBoxTwo() { return boxTwo; }

    public void setBoxTwo(String boxTwo) { this.boxTwo = boxTwo; }

    public String getBoxOne() { return boxOne; }

    public void setBoxOne(String boxOne) { this.boxOne = boxOne; }
}