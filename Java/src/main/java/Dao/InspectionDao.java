package Dao;

import Model.Inspection;

public interface InspectionDao {

    Inspection getInspection(int inspectionId);

    Inspection createInspection(Inspection inspection);

    void updateInspection(Inspection inspection);

    void updateNotes(Inspection inspection);

}