const express = require('express');
const bcrypt = require('bcrypt');
const reset_password = express.Router();
const mongoose = require('mongoose');

const db = mongoose.connection;

reset_password.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword, token } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ 
                error: 'email address and new password are required' 
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ 
                error: 'password must be at least 6 characters long' 
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await db.collection('users').updateOne(
            { email: email },
            { 
                $set: { 
                    password: hashedPassword,
                    updatedAt: new Date()
                } 
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ 
                error: 'this email address is not registered' 
            });
        }

        if (result.modifiedCount === 1) {
            res.json({
                success: true,
                message: 'password has been successfully updated, please log in with your new password'
            });
        } else {
            res.status(500).json({ 
                error: 'password update failed' 
            });
        }

    } catch (error) {
        console.error('reset password error:', error);
        res.status(500).json({ 
            error: 'server error occurred while resetting password, please try again later' 
        });
    }
});

module.exports = reset_password;