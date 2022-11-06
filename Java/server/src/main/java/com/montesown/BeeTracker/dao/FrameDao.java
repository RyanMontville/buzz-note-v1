package com.montesown.BeeTracker.dao;

import com.montesown.BeeTracker.model.Frame;

import java.util.List;

public interface FrameDao {

    Frame getFrame(int frameId);

    List<Frame> getFrameByInspectionAndBox(int inspectionId, int boxNum);

    Frame createFrame(Frame frame);

}
