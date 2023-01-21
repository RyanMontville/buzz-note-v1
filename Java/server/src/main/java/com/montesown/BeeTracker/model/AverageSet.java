package com.montesown.BeeTracker.model;

public class AverageSet {

    private FrameAverage boxThree;
    private FrameAverage boxTwo;
    private FrameAverage boxOne;

    public AverageSet(FrameAverage boxThree, FrameAverage boxTwo, FrameAverage boxOne) {
        this.boxThree = boxThree;
        this.boxTwo = boxTwo;
        this.boxOne = boxOne;
    }

    public FrameAverage getBoxThree() {
        return boxThree;
    }

    public void setBoxThree(FrameAverage boxThree) {
        this.boxThree = boxThree;
    }

    public FrameAverage getBoxTwo() {
        return boxTwo;
    }

    public void setBoxTwo(FrameAverage boxTwo) {
        this.boxTwo = boxTwo;
    }

    public FrameAverage getBoxOne() {
        return boxOne;
    }

    public void setBoxOne(FrameAverage boxOne) {
        this.boxOne = boxOne;
    }
}
