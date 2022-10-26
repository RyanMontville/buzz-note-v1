package Model;

import java.util.ArrayList;
import java.util.List;

public class Box {
    private List<Frame> frames = new ArrayList<>();
    private int boxNumber;

    public Box(int boxNumber) {
        this.boxNumber = boxNumber;
    }
    public List<Frame> getFrames() {
        return frames;
    }

    //not sure if this method is needed
    public void setFrames(List<Frame> frames) {
        this.frames = frames;
    }

    public int getBoxNumber() {
        return boxNumber;
    }

    public void addFrameToBox(Frame frame) {
        frames.add(frame);
    }
}