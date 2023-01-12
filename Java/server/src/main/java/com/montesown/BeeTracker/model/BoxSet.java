package com.montesown.BeeTracker.model;

import java.util.List;

public class BoxSet {
    private List<Frame> BoxThree;
    private List<Frame> BoxTwo;
    private List<Frame> BoxOne;

    public BoxSet(List<Frame> boxThree, List<Frame> boxTwo, List<Frame> boxOne) {
        BoxThree = boxThree;
        BoxTwo = boxTwo;
        BoxOne = boxOne;
    }

    public List<Frame> getBoxThree() { return BoxThree; }

    public void setBoxThree(List<Frame> boxThree) { BoxThree = boxThree; }

    public List<Frame> getBoxTwo() { return BoxTwo; }

    public void setBoxTwo(List<Frame> boxTwo) { BoxTwo = boxTwo; }

    public List<Frame> getBoxOne() { return BoxOne; }

    public void setBoxOne(List<Frame> boxOne) { BoxOne = boxOne; }
}
