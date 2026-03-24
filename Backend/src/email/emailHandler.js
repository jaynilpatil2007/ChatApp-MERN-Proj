import { resendClient, sender } from "../email.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name}<${sender.email}>`,
        to: email,
        subject: "Welcome To ChatApp!",
        html: createWelcomeEmailTemplate(name, clientURL),
    })

    if (error) {
        console.error("Error sending welcome Email: ", error);
        throw new Error("Failed to send welcome email");
    }
    else {
        console.log("Welcome email sent successfully", data);
        return data;
    }
}