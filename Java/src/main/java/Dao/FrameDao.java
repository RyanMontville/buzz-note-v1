package Dao;

import Model.Frame;

import java.util.List;

public interface FrameDao {

    Frame getFrame(int frameId);

    List<Frame> getFrameByInspection(int inspectionId);

    Frame createFrame(Frame frame);
}
