package Dao;

import Model.Inspection;

import java.util.List;

public interface InspectionDao {

    List<Inspection> list();

    Inspection getInspection(int inspectionId);

    Inspection createInspection(Inspection inspection);

    void updateInspection(Inspection inspection);

    void updateNotes(Inspection inspection);

}