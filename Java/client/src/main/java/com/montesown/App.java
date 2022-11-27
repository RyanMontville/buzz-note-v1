package com.montesown;

import com.montesown.model.Frame;
import com.montesown.model.Inspection;
import com.montesown.services.InspectionService;

import java.security.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Scanner;

public class App {

    public static final String API_BASE_URL = "http://localhost:8080/";
    private final InspectionService inspectionService = new InspectionService(API_BASE_URL);
    private final Scanner userInput = new Scanner(System.in);

    public static void main(String[] args) {
        App app = new App();
        app.run();
    }

    private void run(){
        welcomeMessage();
        boolean running = true;
        while (running) {
            displayMenu();
            int selection = promptForInt("Select an option: ");
            switch (selection) {
                case 1: startNewInspection(); break; //start new inspection
                case 2: addNotes(); break; //add notes
                case 3: viewPreviousInspections(); break; //view previous inspections
                case 4: viewFrames(4,1); break; //view a list of frames from a box from an inspection
                case 5: System.out.println("\nGoodbye"); running = false; break; //exit
                case 6:
                default: displayError(" Invalid selection ");
            }
        }

    }

    private void viewFrames(int inspectionId, int boxNum) {
        Frame[] frames = inspectionService.getFramesByIdAndNum(inspectionId,boxNum);
        String queen= "The queen was spotted in frame ";
        if(frames.length>0) {
            System.out.println("Box " + boxNum);
            for (Frame frame : frames) {
                System.out.print(frame.getFrameName());
                System.out.print(" - Comb Patterm: " + frame.getCombPattern());
                System.out.print("\t\tHoney: " + frame.getHoney());
                System.out.print("\t\tNectar: " + frame.getNectar());
                System.out.print("\t\tBrood: " + frame.getBrood());
                System.out.print("\t\tCells: " + frame.getCells() + "\n");
                if (frame.isQueenSpotted()) {
                    queen += frame.getFrameName();
                }
            }
            System.out.println(queen);
        } else {
            System.out.println("Box " + boxNum + " had no frames recorded.");
        }

    }

    private void viewPreviousInspections() {
        Inspection[] inspections = inspectionService.listInspections();
        if (inspections.length!=0) {
            for (Inspection inspection : inspections) {
                System.out.println("\nInspection #" + inspection.getInspectionId());
                System.out.println("Weather: " + inspection.getWeatherTemp() + "F " + inspection.getWeatherCondition());
                System.out.println("time: " + inspection.getStartTime() + " Date: " + inspection.getInspectionDate());
                System.out.println("Bee Temperament: " + inspection.getBeeTemperament());
                System.out.println("Bee Population: " + inspection.getBeePopulation());
                System.out.println("Drone Population: " + inspection.getDronePopulation());
                System.out.println("Laying Pattern: " + inspection.getLayingPattern());
                System.out.println("Hive Beetles: " + inspection.getHiveBeetles());
                System.out.println("Other Pest: " + inspection.getOtherPests());
                /**if(inspection.getNotes().equals("0")){
                    System.out.println("no notes");
                } else {
                    System.out.println("Notes: " + inspection.getNotes());
                }**/
                System.out.println(inspection.getBoxThree());
                viewFrames(inspection.getInspectionId(),3);
                System.out.println(inspection.getBoxTwo());
                viewFrames(inspection.getInspectionId(),2);
                System.out.println(inspection.getBoxOne());
                viewFrames(inspection.getInspectionId(),1);
            }
        } else {
            System.out.println("No inspections found.");
        }
    }

    private void startNewInspection() {
        Inspection newInspection = new Inspection();
        int newId = inspectionService.newInspection(newInspection);
        String boxThree = "0";
        String boxTwo = "0";
        String boxOne = "0";
        newInspection.setInspectionId(newId);
        System.out.println("the inspection id is " + newId);
        for(int i=3;i>0;i--) {
            int frameNum=1;
            char skip = promptForChar("Skip (Y/N): ");
            if (skip=='Y' || skip=='y') {
                continue;
            }
            System.out.println("Box " + i);
            int combGoodCount = 0;
            int combBurrCount = 0;
            double honeyTotal = 0;
            double nectarTotal = 0;
            String queenFrame="";
            for(int j=1;j<4;j++){
                Frame newFrame = new Frame();
                newFrame.setInspectionId(newId);
                newFrame.setBoxNumber(i);
                if(j%2==0){
                    newFrame.setFrameName(frameNum + "B");
                    frameNum++;
                } else {
                    newFrame.setFrameName(frameNum + "A");
                }
                System.out.println(frameNum);
                char combPattern = promptForChar("Comb Pattern(g/b): ");
                switch (combPattern){
                    case 'g':
                        newFrame.setCombPattern("Good");
                        combGoodCount++;
                        break;
                    default:
                        newFrame.setCombPattern("Burr");
                        combBurrCount++;
                }
                char honey = promptForChar("Honey(f/2/1/n): ");
                switch (honey) {
                    case 'f':
                        newFrame.setHoney("Full");
                        honeyTotal += 1;
                        break;
                    case '2':
                        newFrame.setHoney("2/3");
                        honeyTotal += 0.66;
                        break;
                    case '1':
                        newFrame.setHoney("1/3");
                        honeyTotal += .33;
                        break;
                    default:
                        newFrame.setHoney("None");
                }
                char nectar = promptForChar("Nectar(f/2/1/n): ");
                switch (nectar) {
                    case 'f':
                        newFrame.setNectar("Full");
                        nectarTotal += 1;
                        break;
                    case '2':
                        newFrame.setNectar("2/3");
                        nectarTotal += 0.66;
                        break;
                    case '1':
                        newFrame.setNectar("1/3");
                        nectarTotal += .33;
                        break;
                    default:
                        newFrame.setNectar("None");
                }

                newFrame.setBrood(promptForString("Brood: "));
                newFrame.setCells(promptForString("Cells: "));
                char queen = promptForChar("Queen Spotted (Y/N): ");
                if(queen=='Y' || queen=='y') {
                    newFrame.setQueenSpotted(true);
                    queenFrame = newFrame.getFrameName();
                } else {
                    newFrame.setQueenSpotted(false);
                }
                boolean success = inspectionService.newFrame(newFrame);
                System.out.println(success);
            }
        //TODO  Look into making averages work, think about how to store them
            System.out.println("Comb Pattern " + (combGoodCount/3) + "% Good, " + (combBurrCount/3) + "% Burr");
            System.out.println("Total honey: " + honeyTotal);
            System.out.println("Total nectar: " + nectarTotal);
            System.out.println("The queen was spotted in frame " + queenFrame);
            if(i==3){
                boxThree = "Box 3 -  " + queenFrame;
            }
            if(i==2){
                boxTwo = "Box 2 - " + queenFrame;
            }
            if(i==1){
                boxOne = "Box 1 - " + queenFrame;
            }
        }
        newInspection.setBeeTemperament(promptForString("Bee Temperament: "));
        newInspection.setBeePopulation(promptForString("Bee Population: "));
        newInspection.setDronePopulation(promptForString("Drone Population: "));
        newInspection.setLayingPattern(promptForString("Layiing Pattern: "));
        newInspection.setHiveBeetles(promptForString("Hive Beetles: "));
        newInspection.setOtherPests(promptForString("Other Pests: "));
        newInspection.setBoxThree(boxThree);
        newInspection.setBoxTwo(boxTwo);
        newInspection.setBoxOne(boxOne);
        boolean wasInspectionUpdated = inspectionService.addRestOfInspection(newInspection);


    }

    private void addNotes() {
        int inspectionId = promptForInt("Inspection ID: ");
        Inspection newInspection = new Inspection();
        newInspection.setInspectionId(inspectionId);
        String currentNotes = inspectionService.getNotesByInspectionId(inspectionId);
        String combinedNotes;
    //TODO if 0, don't add current notes
        if(currentNotes.equals("0")) {
            currentNotes = "No notes";
            System.out.println("Current notes: " + currentNotes);
            String notesToAdd = promptForString("Add notes: ");
            combinedNotes = notesToAdd;
        } else {
            System.out.println("Current notes: " + currentNotes);
            String notesToAdd = promptForString("Add notes: ");
            combinedNotes = currentNotes + notesToAdd;
        }
        newInspection.setNotes(combinedNotes);
        boolean success = inspectionService.addNotes(newInspection);
        System.out.println(success);

    }

    private void welcomeMessage() {
        System.out.println("-----------------------------------------");
        System.out.println("|   Monte's Own Bee Inspection Tracker  |");
        System.out.println("-----------------------------------------");
    }

    private void displayMenu() {
        System.out.println("\n1. Start new Inspection");
        System.out.println("2. Add notes to an inspection");
        System.out.println("3. View previous inspections");
        System.out.println("4. View frames for inspection 4 box 1");
        System.out.println("5. Exit");
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

    private char promptForChar(String prompt) {
        System.out.print(prompt);
        return userInput.nextLine().charAt(0);
    }

    private void displayError(String message) {
        System.out.println();
        System.out.println("***" + message + "***");
        System.out.println();
    }
}
