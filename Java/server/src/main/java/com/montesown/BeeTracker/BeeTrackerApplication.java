package com.montesown.BeeTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.imageio.IIOException;
import javax.sql.DataSource;
import java.io.InputStream;
import org.apache.commons.dbcp2.BasicDataSource;
import java.io.IOException;

@SpringBootApplication
public class BeeTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeeTrackerApplication.class, args);
	}

}
