const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");

// Create a new contact
router.post("/create", (req, res) => {
    const { firstName, middleName, lastName, email, phoneNumber1, phoneNumber2 } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(422).json("Please provide first name, last name, and email");
    }

    const userData = {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber1,
        phoneNumber2
    };

    try {
        conn.query("SELECT * FROM contacts WHERE email = ?", email, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
            if (result.length > 0) {
                return res.status(409).json({ message: "This contact already exists" });
            } else {
                conn.query("INSERT INTO contacts SET ?", userData, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Failed to create contact" });
                    }
                    return res.status(201).json({ message: "Contact created successfully", data: userData });
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all contacts
router.get("/getcontacts", (req, res) => {
    conn.query("SELECT * FROM contacts", (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json(result);
    });
});

// Delete a contact
router.delete("/deletecontact/:id", (req, res) => {
    const id = req.params.id;

    conn.query("DELETE FROM contacts WHERE id = ?", id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json({ message: "Contact deleted successfully" });
    });
});

// Get a single contact by ID
router.get("/getcontact/:id", (req, res) => {
    const id = req.params.id;

    conn.query("SELECT * FROM contacts WHERE id = ?", id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }
        return res.status(200).json(result[0]);
    });
});

// Update a contact by ID
router.patch("/updatecontact/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;

    conn.query("UPDATE contacts SET ? WHERE id = ?", [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json({ message: "Contact updated successfully" });
    });
});

module.exports = router;
