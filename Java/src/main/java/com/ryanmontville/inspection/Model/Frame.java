package com.ryanmontville.inspection.Model;

public class Frame {

    private int inspectionId;
    private int boxNumber;
    private String frameName;
    private String combPattern;
    private String honey;
    private String nectar;
    private String brood;
    private String cells;
    private boolean queenSpotted;

    public void setInspectionId(int inspectionId) { this.inspectionId = inspectionId; }

    public int getInspectionId() { return inspectionId; }

    public void setBoxNumber(int boxNumber) { this.boxNumber = boxNumber; }

    public int getBoxNumber() { return boxNumber; }

    public Frame(String frameName) {
        this.frameName = frameName;
    }

    public Frame(){}

    public void setFrameName(String frameName){ this.frameName = frameName; }

    public String getFrameName() {
        return frameName;
    }

    public String getCombPattern() {
        return combPattern;
    }

    public void setCombPattern(String combPattern) {
        this.combPattern = combPattern;
    }

    public String getHoney() {
        return honey;
    }

    public void setHoney(String honey) {
        this.honey = honey;
    }

    public String getNectar() {
        return nectar;
    }

    public void setNectar(String nectar) {
        this.nectar = nectar;
    }

    public String getBrood() {
        return brood;
    }

    public void setBrood(String brood) {
        this.brood = brood;
    }

    public String getCells() {
        return cells;
    }

    public void setCells(String cells) {
        this.cells = cells;
    }

    public boolean isQueenSpotted() { return queenSpotted; }

    public void setQueenSpotted(boolean queenSpotted) { this.queenSpotted = queenSpotted; }
}
