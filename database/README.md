# Databse
The database has 3 tables:
* inspection (inspection_id, inspection_date, start_time, weather_temp, weather_condition, bee_temperament, bee_population, drone_population, laying_pattern, hive_beetles, other_pests, notes, box_three, box_two, box_one) PK inspection_id
* frame (frame_id, inspection_id, box_number, frame_name, comb_pattern, honey, nectar, brood, queen_spotted, cells) PK frame_id, FK inspection_id references inspection
* average (avg_id, inspection_id, box_number, honey, nectar, brood, cells, comb_pattern, queen_spotted) PK avg_id FK inspection_id references inspection