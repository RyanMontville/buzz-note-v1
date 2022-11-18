package com.montesown.BeeTracker.dao;

import com.montesown.BeeTracker.model.Inspection;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcInspectionDao implements InspectionDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcInspectionDao(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Inspection> list() {
        List<Inspection> inspections = new ArrayList<>();
        String sql = "SELECT inspection_id, inspection_date, start_time, weather_temp, weather_condition, bee_temperament, bee_population, drone_population, " +
                "laying_pattern, hive_beetles, other_pests, notes FROM public.inspection ORDER BY inspection_id;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()){
            inspections.add(mapRowToInspection(results));
        }
        return inspections;
    }

    @Override
    public List<Inspection> serchByTemp(int low, int high) {
        List<Inspection> inspections = new ArrayList<>();
        String sql = "SELECT inspection_id, inspection_date, start_time, weather_temp, weather_condition, bee_temperament, bee_population, drone_population, laying_pattern, " +
                "hive_beetles, other_pests, notes FROM public.inspection where weather_temp BETWEEN ? AND ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,low,high);
        while (results.next()){
            inspections.add(mapRowToInspection(results));
        }
        return inspections;
    }

    @Override
    public Inspection getInspection(int inspectionId) {
        Inspection inspection = null;
        String sql = "SELECT inspection_id, inspection_date, start_time, weather_temp, weather_condition, bee_temperament, bee_population, drone_population, " +
                "laying_pattern, hive_beetles, other_pests, notes FROM public.inspection WHERE inspection_id=?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,inspectionId);
        if(results.next()){
            inspection = mapRowToInspection(results);
        }
        return inspection;
    }

    @Override
    public String getNotesByInspectionId(int inspectionId){
        String notes = "";
        String sql = "SELECT notes FROM public.inspection WHERE inspection_id=?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql,inspectionId);
        if(result.next()){
            notes = result.getString("notes");
        }
        return notes;
    }

    @Override
    public int createInspection(Inspection inspection) {
        String sql = "INSERT INTO public.inspection(inspection_date, start_time, weather_temp, weather_condition, bee_temperament, bee_population, drone_population, laying_pattern, hive_beetles, other_pests) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING inspection_id;";
        Integer newId = jdbcTemplate.queryForObject(sql, Integer.class,inspection.getInspectionDate(),inspection.getStartTime(),inspection.getWeatherTemp(),inspection.getWeatherCondition(),inspection.getBeeTemperament(),
                inspection.getBeePopulation(),inspection.getDronePopulation(),inspection.getLayingPattern(),
                inspection.getHiveBeetles(),inspection.getOtherPests());
        return newId;
    }

    @Override
    public void updateNotes(String notes, int inspectionId) {
        String sql = "UPDATE public.inspection SET  notes=? WHERE inspection_id=?;";
        jdbcTemplate.update(sql,notes,inspectionId);
    }

    @Override
    public void updateInspection(Inspection inspection) {
        String sql = "UPDATE public.inspection SET bee_temperament=?, bee_population=?, drone_population=?, laying_pattern=?, hive_beetles=?, other_pests=? " +
                "WHERE inspection_id=?;";
        jdbcTemplate.update(sql,inspection.getBeeTemperament(),inspection.getBeePopulation(),inspection.getDronePopulation(),inspection.getLayingPattern(),
                inspection.getHiveBeetles(),inspection.getOtherPests(),inspection.getInspectionId());
    }

    //TODO: add get inspection by <...> to filter results

    private Inspection mapRowToInspection(SqlRowSet rowSet){
        Inspection inspection = new Inspection();
        inspection.setInspectionId(rowSet.getInt("inspection_id"));
        inspection.setWeatherTemp(rowSet.getInt("weather_temp"));
        inspection.setWeatherCondition(rowSet.getString("weather_condition"));
        inspection.setInspectionDate(rowSet.getString("inspection_date"));
        inspection.setStartTime(rowSet.getString("start_time"));
        inspection.setBeeTemperament(rowSet.getString("bee_temperament"));
        inspection.setBeePopulation(rowSet.getString("bee_population"));
        inspection.setDronePopulation(rowSet.getString("drone_population"));
        inspection.setLayingPattern(rowSet.getString("laying_pattern"));
        inspection.setHiveBeetles(rowSet.getString("hive_beetles"));
        inspection.setOtherPests(rowSet.getString("other_pests"));
        inspection.setNotes(rowSet.getString("notes"));
    //TODO make this work
        /**for (int i=3;i>0;i--) {
            Box newBox = new Box(i);
            //newBox.setFrames(frameDao.getFrameByInspectionAndBox(inspection.getInspectionId(), newBox.getBoxNumber()));
            inspection.addBox(newBox);
        }**/
        return inspection;
    }

}
