package com.montesown;

import com.montesown.model.Frame;
import com.montesown.model.Inspection;
import com.montesown.services.InspectionService;

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
            if(selection==1) {
                //start new inspection
                startNewInspection();
            } else if (selection==2) {
                //add notes
                //testNotes();
                addNotes();
            } else if (selection==3) {
                //view previous inspections
                viewPreviousInspections();
            } else if (selection==4) {
                //view a list of frames from a box from an inspection
                viewFrames();
            } else if (selection==5) {
                //exit
                System.out.println("\nGoodbye");
                running = false;
            } else {
                displayError(" Invalid selection ");
            }
        }

    }

    private void viewFrames() {
        int inspectionId = promptForInt("Inspection ID: ");
        int boxNum = promptForInt("Box number: ");
        Frame[] frames = inspectionService.getFramesByIdAndNum(inspectionId,boxNum);
        for (Frame frame : frames) {
            System.out.println(frame.getFrameName());
        }
    }

    private void viewPreviousInspections() {
        Inspection[] inspections = inspectionService.listInspections();
        if (inspections.length!=0) {
            for (Inspection inspection : inspections) {
                System.out.println("good");
            }
        } else {
            System.out.println("No inspections found.");
        }
    }

    private void startNewInspection() {
    }

    private void addNotes() {
        int inspectionId = promptForInt("Inspection ID: ");
        Inspection newInspection = new Inspection();
        newInspection.setInspectionId(inspectionId);
        newInspection.setNotes(inspectionService.getNotesByInspectionId(inspectionId));
        System.out.println("Current notes: " + newInspection.getNotes());
        String notesToAdd = promptForString("Add notes: ");
        String combinedNotes = newInspection.getNotes() + notesToAdd;
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
        System.out.println("4. View a list of frames from a box from an inspection");
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
