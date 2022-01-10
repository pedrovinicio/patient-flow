import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

describe("Testing of Heartburn checker", () => {
  
    it("Should initialize app with first question", async () => {
        render(<App />);

        const textQuestion = await screen.findByText("Is your heartburn previously known?");
        expect(textQuestion).toBeDefined();

        const answerYes = await screen.findByText("Yes");
        expect(answerYes).toBeDefined();

        const answerNo = await screen.findByText("No");
        expect(answerNo).toBeDefined();

        const buttonNext = await screen.findByText("Next");
        expect(buttonNext).toBeDefined();
    });

    it("Should navigate to second question", async () => {
        render(<App />);

        const textQuestion = await screen.findByText("Is your heartburn previously known?");
        expect(textQuestion).toBeDefined();

        await answerQuestionAndClickNext(screen, "is_heartburn_known_yes");

        const textQuestion2 = await screen.findByText("Have you received any treatment for heartburn previously?");
        expect(textQuestion2).toBeDefined();
    });

    it("Should show first outcome", async () => {
        render(<App />);

        await answerQuestionAndClickNext(screen, "is_heartburn_known_yes");
        await answerQuestionAndClickNext(screen, "heartburn_previous_treatment_yes");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_burns_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_gastric_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_pain_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_nauseus_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_sleep_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_swallowing_no");
        await answerQuestionAndClickNext(screen, "heartburn_blood_stool_no");
        await answerQuestionAndClickNext(screen, "heartburn_lost_weight_no");

        const textThankYou = await screen.findByText("Thank you for answering the questions!");
        expect(textThankYou).toBeDefined();

        const outcome = await screen.findByText(
            "Your symptom description indicates that this is a self-healing condition. " +
            "We recommend that you rest for few days. Contact us again if your condition " +
            "gets worse or if symptoms remain for more than three days."
        );
        expect(outcome).toBeDefined();

        const buttonRestart = await screen.findByText("Restart");
        expect(buttonRestart).toBeDefined();
    });

    it("Should show second outcome", async () => {
        render(<App />);

        await answerQuestionAndClickNext(screen, "is_heartburn_known_yes");
        await answerQuestionAndClickNext(screen, "heartburn_previous_treatment_yes");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_burns_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_gastric_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_pain_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_nauseus_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_sleep_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_swallowing_no");
        await answerQuestionAndClickNext(screen, "heartburn_blood_stool_no");
        await answerQuestionAndClickNext(screen, "heartburn_lost_weight_yes");

        const textThankYou = await screen.findByText("Thank you for answering the questions!");
        expect(textThankYou).toBeDefined();

        const outcome = await screen.findByText(
            "Your symptom description indicates that you are in need of medical care. " + 
            "Good news – KRY can help. Book an appointment with one of our doctors."
        );
        expect(outcome).toBeDefined();

        const buttonRestart = await screen.findByText("Restart");
        expect(buttonRestart).toBeDefined();

        const buttonBook = await screen.findByText("Book");
        expect(buttonBook).toBeDefined();
    });

    it("Should show third outcome", async () => {
        render(<App />);

        await answerQuestionAndClickNext(screen, "is_heartburn_known_yes");
        await answerQuestionAndClickNext(screen, "heartburn_previous_treatment_yes");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_burns_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_gastric_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_pain_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_nauseus_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_sleep_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_swallowing_no");
        await answerQuestionAndClickNext(screen, "heartburn_blood_stool_yes");
        await answerQuestionAndClickNext(screen, "heartburn_lost_weight_yes");

        const textThankYou = await screen.findByText("Thank you for answering the questions!");
        expect(textThankYou).toBeDefined();

        const outcome = await screen.findByText(
            "Your symptom description indicates that you are in need of URGENT medical care. " + 
            "Go directly to the nearest emergency room. If you are unable to do so, call an ambulance."
        );
        expect(outcome).toBeDefined();

        const buttonRestart = await screen.findByText("Restart");
        expect(buttonRestart).toBeDefined();
    });

    it("Test restart button", async () => {
        render(<App />);

        await answerQuestionAndClickNext(screen, "is_heartburn_known_yes");
        await answerQuestionAndClickNext(screen, "heartburn_previous_treatment_yes");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_burns_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_gastric_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_pain_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_nauseus_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_sleep_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_swallowing_no");
        await answerQuestionAndClickNext(screen, "heartburn_blood_stool_no");
        await answerQuestionAndClickNext(screen, "heartburn_lost_weight_no");

        const buttonRestart = await screen.findByText("Restart");
        userEvent.click(buttonRestart);

        const textQuestion = await screen.findByText("Is your heartburn previously known?");
        expect(textQuestion).toBeDefined();
    });

    it("Test book button", async () => {
        render(<App />);

        await answerQuestionAndClickNext(screen, "is_heartburn_known_yes");
        await answerQuestionAndClickNext(screen, "heartburn_previous_treatment_yes");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_burns_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_gastric_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_pain_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_nauseus_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_weekly_sleep_0_to_3");
        await answerQuestionAndClickNext(screen, "heartburn_swallowing_no");
        await answerQuestionAndClickNext(screen, "heartburn_blood_stool_no");
        await answerQuestionAndClickNext(screen, "heartburn_lost_weight_yes");

        const buttonBook = await screen.findByText("Book");
        userEvent.click(buttonBook);

        const textAppointmet = await screen.findByText("We have booked a time for you with one of our doctors.");
        expect(textAppointmet).toBeDefined();
    });

    async function answerQuestionAndClickNext(screen, answer) {
        const radio = await screen.findByTestId(answer);
        userEvent.click(radio);

        const buttonNext = await screen.findByText("Next");
        userEvent.click(buttonNext);
    }
});
