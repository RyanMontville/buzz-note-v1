package com.montesown.BeeTracker.dao;

import com.montesown.BeeTracker.model.FrameAverage;

public interface AverageDao {

    FrameAverage getFrameAverageByInspectionAndBox(int inspectionId, int boxNum);

    void createAverage(FrameAverage frameAverage);
}
