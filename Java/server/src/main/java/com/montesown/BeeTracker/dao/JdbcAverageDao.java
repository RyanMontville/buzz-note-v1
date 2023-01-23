package com.montesown.BeeTracker.dao;

import com.montesown.BeeTracker.model.FrameAverage;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class JdbcAverageDao implements AverageDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcAverageDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public FrameAverage getFrameAverageByInspectionAndBox(int inspectionId, int boxNum) {
        FrameAverage average = null;
        String sql = "SELECT inspection_id, box_number, honey, nectar, brood, cells, " +
                "comb_pattern, queen_spotted FROM public.average " +
                "WHERE inspection_id=? AND box_number=?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, inspectionId, boxNum);
        if(results.next()){
            average = mapRowToFrameAverage(results);
        }
        return average;
    }

    @Override
    public int createAverage(FrameAverage frameAverage) {
        String sql = "INSERT INTO public.average(inspection_id, box_number, honey, nectar, brood, cells, " +
                "comb_pattern, queen_spotted) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING avg_id;";
        Integer id = jdbcTemplate.queryForObject(sql,Integer.class,frameAverage.getInspectionId(),frameAverage.getBoxNumber(),frameAverage.getHoney(),
                frameAverage.getNectar(),frameAverage.getBrood(),frameAverage.getCells(),frameAverage.getCombPattern(),frameAverage.getQueenSpotted());
        return id;
    }

    private FrameAverage mapRowToFrameAverage(SqlRowSet rowSet) {
        FrameAverage average = new FrameAverage();
        average.setInspectionId(rowSet.getInt("inspection_id"));
        average.setBoxNumber(rowSet.getInt("box_number"));
        average.setHoney(rowSet.getString("honey"));
        average.setNectar(rowSet.getString("nectar"));
        average.setBrood(rowSet.getString("brood"));
        average.setCells(rowSet.getString("cells"));
        average.setCombPattern(rowSet.getString("comb_pattern"));
        average.setQueenSpotted(rowSet.getString("queen_spotted"));
        return average;
    }

}
