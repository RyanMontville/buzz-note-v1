package com.montesown.BeeTracker.dao;

import com.montesown.BeeTracker.WeatherService;
import com.montesown.BeeTracker.model.Forecast;
import com.montesown.BeeTracker.model.Inspection;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class JdbcInspectionDao implements InspectionDao {

    private final JdbcTemplate jdbcTemplate;
    private WeatherService weatherService = new WeatherService();

    public JdbcInspectionDao(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Inspection> list() {
        List<Inspection> inspections = new ArrayList<>();
        String sql = "SELECT inspection_id, inspection_date, start_time, weather_temp, weather_condition, bee_temperament, bee_population, drone_population, " +
                "laying_pattern, hive_beetles, other_pests, notes, box_three, box_two, box_one FROM public.inspection ORDER BY inspection_id DESC;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()){
            inspections.add(mapRowToInspection(results));
        }
        return inspections;
    }

    @Override
    public Inspection getInspection(int inspectionId) {
        Inspection inspection = null;
        String sql = "SELECT inspection_id, inspection_date, start_time, weather_temp, weather_condition, bee_temperament, bee_population, drone_population, laying_pattern, " +
                "hive_beetles, other_pests, notes, box_three, box_two, box_one FROM public.inspection WHERE inspection_id=?;";
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

    public int createInspection() throws Exception {
        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
        String strDate = formatter.format(now);
        Date date = new Date();
        formatter = new SimpleDateFormat("hh:mm:ss");
        String strTime = formatter.format(date);
        Forecast forecast = weatherService.getCurrentWeather();
        double temperature = forecast.getTemp();
        String condition = forecast.getCondition();
        String sql = "INSERT INTO public.inspection(inspection_date, start_time, weather_temp, weather_condition)VALUES (?,?,?,?)  RETURNING inspection_id;";
        Integer newId = jdbcTemplate.queryForObject(sql, Integer.class,strDate,strTime,temperature,condition);
        return newId;
    }

    @Override
    public String updateNotes(String notes, int inspectionId) {
        String sql = "UPDATE public.inspection SET  notes=? WHERE inspection_id=?;";
        jdbcTemplate.update(sql,notes,inspectionId);
        return getNotesByInspectionId(inspectionId);
    }

    @Override
    public void updateInspection(Inspection inspection) {
        String sql = "UPDATE public.inspection SET bee_temperament=?, bee_population=?, drone_population=?, laying_pattern=?, hive_beetles=?, other_pests=?, box_three=?, box_two=?, box_one=? WHERE inspection_id=?;";
        jdbcTemplate.update(sql,inspection.getBeeTemperament(),inspection.getBeePopulation(),inspection.getDronePopulation(),inspection.getLayingPattern(),
                inspection.getHiveBeetles(),inspection.getOtherPests(),inspection.getBoxThree(),inspection.getBoxTwo(),inspection.getBoxOne(),inspection.getInspectionId());
    }

    @Override
    public List<Inspection> serchByTemp(int low, int high) {
        List<Inspection> inspections = new ArrayList<>();
        String sql = "SELECT inspection_id, inspection_date, start_time, weather_temp, weather_condition, bee_temperament, bee_population, drone_population, laying_pattern, " +
                "hive_beetles, other_pests, notes, box_three, box_two, box_one FROM public.inspection where weather_temp BETWEEN ? AND ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,low,high);
        while (results.next()){
            inspections.add(mapRowToInspection(results));
        }
        return inspections;
    }

    /**@Override
    public List<Inspection> searchByDate(String startDate, String endDate) {

    }**/

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
        inspection.setBoxThree(rowSet.getString("box_three"));
        inspection.setBoxTwo(rowSet.getString("box_two"));
        inspection.setBoxOne(rowSet.getString("box_one"));
        return inspection;
    }

}
