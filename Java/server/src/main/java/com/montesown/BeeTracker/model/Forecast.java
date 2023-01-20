package com.montesown.BeeTracker.model;

public class Forecast {
    private double temp;
    private String condition;
    private int icon;

    public Forecast(double temp, String condition, int icon) {
        this.temp = temp;
        this.condition = condition;
        this.icon = icon;
    }

    public double getTemp() {
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public int getIcon() {
        return icon;
    }

    public void setIcon(int icon) {
        this.icon = icon;
    }
}
