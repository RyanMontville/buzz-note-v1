import Dao.FrameDao;
import Dao.InspectionDao;
import Dao.JdbcFrameDao;
import Dao.JdbcInspectionDao;
import Model.Box;
import Model.Frame;
import Model.Inspection;
import org.apache.commons.dbcp2.BasicDataSource;
import java.io.IOException;

import javax.imageio.IIOException;
import javax.sql.DataSource;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Properties;
import java.util.Scanner;

public class App {

    private final FrameDao frameDao;
    private final InspectionDao inspectionDao;
    private final Scanner userInput = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BasicDataSource dataSource = new BasicDataSource();
        /**
        Properties prop = new Properties();
        try (InputStream input = App.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                System.out.println("Sorry, unable to find config.properties");
                return;

            }
            prop.load(input);
            } catch (IIOException e) {
            e.printStackTrace();
        }
        dataSource.setUrl(prop.getProperty("db.url"));
        dataSource.setUsername(prop.getProperty("db.user"));
        dataSource.setPassword(prop.getProperty("db.password"));
         **/
        dataSource.setUrl("jdbc:postgresql://localhost:5432/bees");
        dataSource.setUsername("postgres");
        dataSource.setPassword("postgres1");
        App app = new App(dataSource);
        app.run();
        }

    public App(DataSource dataSource) {
        frameDao = new JdbcFrameDao(dataSource);
        inspectionDao = new JdbcInspectionDao(dataSource);
    }

    private void run(){
        welcomeMessage();
        boolean running = true;
        while (running) {
            displayMenu();
            int selection = promptForInt("Select an option: ");
            if(selection==1) {
                //start new inspection
                startNewInspection();
                //TODO: add frame to frame table
                //TODO: add inspection to inspection table
            } else if (selection==2) {
                //add notes to most recent inspection
                //or maybe add notes to any inspection?
                Frame testFrame = frameDao.getFrame(8);
                System.out.println(testFrame.getFrameName());
            } else if (selection==3) {
                //view previous inspections
                //testing, add list of inspections here
                List<Inspection> inspections = inspectionDao.list();
                String queenSpottedFrame = "";
                for (Inspection current : inspections) {
                    System.out.println(current.getInspectionId() + " - Weather: " + current.getWeather() + " | Date and Time: " + current.getDateTimeFormatted() +
                            " | Bee temperament: " + current.getBeeTemperament() + " | Bee population: " + current.getBeePopulation() + " | Drone population: " +
                            current.getDronePopulation() + "\nLaying pattern: " + current.getLayingPattern() + " | Hive beetles: " + current.getHiveBeetles() +
                            " | Other pests: " + current.getOtherPests());
                    System.out.println(current.getInspectionId());
                    List<Frame> frames = frameDao.getFrameByInspection(current.getInspectionId());
                    System.out.println("Frames list created");
                    for (Frame currentFrame : frames) {
                        System.out.println("Box number: " + currentFrame.getBoxNumber() + " | Frame: " + currentFrame.getFrameName() + " | Comb pattern: " +
                                currentFrame.getCombPattern() + " | Honey: " + currentFrame.getHoney() + " | Nectar: " + currentFrame.getNectar() +
                                " | Brood: " + currentFrame.getBrood() + " | Queen spotted: " + currentFrame.isQueenSpotted() + " | Cells: " + currentFrame.getCells());
                        if (currentFrame.isQueenSpotted()) {
                            queenSpottedFrame = queenSpottedFrame + currentFrame.getFrameName();
                        }
                    }
                }
            } else if (selection==4) {
                //exit
                System.out.println("\nGoodbye");
                running = false;
            } else {
                displayError(" Invalid selection ");
            }
        }

    }

    private void welcomeMessage() {
        System.out.println("-----------------------------------------");
        System.out.println("|   Monte's Own Bee Inspection Tracker  |");
        System.out.println("-----------------------------------------");
    }

    private void displayMenu() {
        System.out.println("1. Start new Inspection");
        System.out.println("2. Add notes to most recent inspection");
        System.out.println("3. View previous inspections");
        System.out.println("4. Exit");
    }

    private int promptForInt(String prompt) {
        return (int) promptForDouble(prompt);
    }

    private double promptForDouble(String prompt) {
        while (true) {
            System.out.print(prompt);
            String response = userInput.nextLine();
            try {
                return Double.parseDouble(response);
            }  catch (NumberFormatException e) {
                if (response.isBlank()) {
                    return -1;
                } else {
                    displayError("Please input a number.");
                }
            }
        }
    }

    private String promptForString(String prompt) {
        System.out.print(prompt);
        return userInput.nextLine();
    }

    private void displayError(String message) {
        System.out.println();
        System.out.println("***" + message + "***");
        System.out.println();
    }

    private void startNewInspection() {
        Inspection newInspection = new Inspection();
        newInspection.setDateTime(LocalDateTime.now());
        newInspection.setWeather(promptForString("Current weather (temp condition): "));
        newInspection.setBeeTemperament(promptForString("Bee temperament: "));
        newInspection.setBeePopulation(promptForString("Bee population: "));
        newInspection.setDronePopulation(promptForString("Drone population: "));
        newInspection.setLayingPattern(promptForString("Laying pattern: "));
        newInspection.setHiveBeetles(promptForString("Hive beetles: "));
        newInspection.setOtherPests(promptForString("Other pests: "));
        //TODO: add inspections to database, return inspection id
        //TODO: create a int for inspection id
        newInspection = inspectionDao.createInspection(newInspection);
        int inspectionsId = newInspection.getInspectionId();
        //
        System.out.println("Box 1 - Frame 10B");
        //TODO: create loop for boxes, create int boxNum
        int boxNum = 3;
        //TODO: end of loop code boxNum--;
        Box newBox = new Box(boxNum);
        for(int i=1;i<11;i++){
            Frame newFrame = new Frame();
            //Add frame to table here, then update the frame through the web interface?
            newFrame.setInspectionId(inspectionsId);
            newFrame.setBoxNumber(1);
            String frameName = "";
            if(i%2==0){
                frameName = frameName + i + "A";
            } else {
                frameName = frameName + i + "B";
            }
            newFrame.setFrameName(frameName);
            System.out.println(frameName);
            newFrame.setCombPattern(promptForString("Comb pattern: "));
            newFrame.setHoney(promptForString("Honey: "));
            newFrame.setNectar(promptForString("Nectar: "));
            newFrame.setBrood(promptForString("Brood: "));
            newFrame.setCells(promptForString("Cells: "));
            String queen = promptForString("Queen Spotted (Y/N): ");
            if(queen.toLowerCase().charAt(0)=='Y'){
                newFrame.setQueenSpotted(true);
            } else {
                newFrame.setQueenSpotted(false);
            }
            //TODO: add frame to frame table
            addFrame(newFrame);
        }

        //newBox.addFrameToBox(newFrame); Are these needed?
        //newInspection.addBox(newBox); Are these needed?
        /**
         *

        newInspection.setWeather(promptForString("Current weather (temp condition): "));
        newInspection.setBeeTemperament(promptForString("Bee temperament: "));
        newInspection.setBeePopulation(promptForString("Bee population: "));
        newInspection.setDronePopulation(promptForString("Drone population: "));
        newInspection.setLayingPattern(promptForString("Laying pattern: "));
        newInspection.setHiveBeetles(promptForString("Hive beetles: "));
        newInspection.setOtherPests(promptForString("Other pests: "));
        //updateInspection(newInspection);
         */
        //TODO: update inpsection to add all of this instead of create new inspection

    }

    private void addFrame(Frame frame) {
        Frame returnedFrame = frameDao.createFrame(frame);
    }

    private void updateInspection(Inspection inspection) {
        inspectionDao.updateInspection(inspection);
    }

}

