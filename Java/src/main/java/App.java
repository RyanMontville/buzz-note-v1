import Dao.FrameDao;
import Dao.InspectionDao;
import Dao.JdbcFrameDao;
import Dao.JdbcInspectionDao;
import Model.Box;
import Model.Frame;
import Model.Inspection;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.sql.DataSource;
import java.time.LocalDateTime;
import java.util.Scanner;

public class App {

    private final FrameDao frameDao;
    private final InspectionDao inspectionDao;
    private final Scanner userInput = new Scanner(System.in);

    public static void main(String[] args) {
        BasicDataSource dataSource = new BasicDataSource();
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
            } else if (selection==3) {
                //view previous inspections
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
        //TODO: create nested loop for frames in boxes
        Frame newFrame = new Frame();
        newFrame.setInspectionId(inspectionsId);
        newFrame.setBoxNumber(1);
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
        //newBox.addFrameToBox(newFrame); Are these needed?
        //newInspection.addBox(newBox); Are these needed?
        newInspection.setWeather(promptForString("Current weather: "));
        newInspection.setBeeTemperament(promptForString("Bee temperament: "));
        newInspection.setBeePopulation(promptForString("Bee population: "));
        newInspection.setDronePopulation(promptForString("Drone population: "));
        newInspection.setLayingPattern(promptForString("Laying pattern: "));
        newInspection.setHiveBeetles(promptForString("Hive beetles: "));
        newInspection.setOtherPests(promptForString("Other pests: "));
        //TODO: update inpsection to add all of this instead of create new inspection

    }

    private void addFrame(Frame frame) {
        frameDao.createFrame(frame);
    }

}

