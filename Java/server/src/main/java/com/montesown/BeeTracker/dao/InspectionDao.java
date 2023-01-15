package com.montesown.BeeTracker.dao;

import com.montesown.BeeTracker.model.Inspection;

import java.util.List;

public interface InspectionDao {

    List<Inspection> list();

    Inspection getInspection(int inspectionId);

    String getNotesByInspectionId(int inspectionId);

    int createInspection() throws Exception;

    String updateNotes(String notes, int inspectionId);

    void updateInspection(Inspection inspection);

    List<Inspection> serchByTemp(int low,int high);

    //List<Inspection> searchByDate(String startDate, String endDate);


}
