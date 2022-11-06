package com.montesown.BeeTracker.dao;

import com.montesown.BeeTracker.model.Frame;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcFrameDao implements FrameDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcFrameDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Frame getFrame(int frameId) {
        Frame frame = null;
        String sql = "SELECT inspection_id, box_number, frame_name, comb_pattern, honey, nectar, brood, queen_spotted, cells " +
                "FROM public.frame " +
                "WHERE frame_id=?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, frameId);
        if(results.next()){
            frame = mapRowToFrame(results);
        }
        return frame;
    }

    @Override
    public List<Frame> getFrameByInspectionAndBox(int inspectionId, int boxNum) {
        List<Frame> frames = new ArrayList<>();
        String sql = "SELECT frame_id, inspection_id, box_number, frame_name, comb_pattern, honey, nectar, brood, queen_spotted, cells " +
                "FROM public.frame " +
                "WHERE inspection_id=? AND box_number=?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,inspectionId,boxNum);
        while (results.next()){
            frames.add(mapRowToFrame(results));
        }
        return frames;
    }

    @Override
    public Frame createFrame(Frame frame) {
        String sql = "INSERT INTO public.frame(inspection_id, box_number, frame_name, comb_pattern, honey, nectar, brood, " +
                "queen_spotted, cells) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING frame_id;";
        Integer newId = jdbcTemplate.queryForObject(sql, Integer.class,frame.getInspectionId(),frame.getBoxNumber(),
                frame.getFrameName(),frame.getCombPattern(),frame.getHoney(),frame.getNectar(),frame.getBrood(),
                frame.isQueenSpotted(), frame.getCells());
        return getFrame(newId);
    }

    private Frame mapRowToFrame(SqlRowSet rowSet) {
        Frame frame = new Frame();
        frame.setInspectionId(rowSet.getInt("inspection_id"));
        frame.setBoxNumber(rowSet.getInt("box_number"));
        frame.setFrameName(rowSet.getString("frame_name"));
        frame.setCombPattern(rowSet.getString("comb_pattern"));
        frame.setHoney(rowSet.getString("honey"));
        frame.setNectar(rowSet.getString("nectar"));
        frame.setBrood(rowSet.getString("brood"));
        frame.setCells(rowSet.getString("cells"));
        frame.setQueenSpotted(rowSet.getBoolean("queen_spotted"));
        return frame;
    }
}
