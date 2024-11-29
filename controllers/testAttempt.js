import createResponse from '../utils/ResponseHelper.js';


import { db } from "../db/index.js";
export const getTestAttempt = async (req, res) => {
    try {
        const { userId } = req.body; // User ID from query params


        // Find if the user already has an attempt in progress
        const existingAttempt = db.data.attempts.find(
            (attempt) => attempt.userId === userId && attempt.status === 'in_progress'
        );

        if (existingAttempt) {
            return res.status(200).json(
                createResponse({
                    status: true,
                    statusCode: 200,
                    path: req.originalUrl,
                    message: 'Test already in progress.',
                    result: { existingAttempt },
                })
            );
        }

        return res.status(404).json(
            createResponse({
                status: false,
                statusCode: 404,
                path: req.originalUrl,
                message: 'No test attempt in progress for the user.',
                result: {},
            })
        );
    } catch (error) {
        console.error('Error checking test attempt:', error);
        res.status(500).json({
            message: 'Internal server error.',
        });
    }
};


// Create a new test attempt if one doesn't exist for the user
export const startTestAttempt = async (req, res) => {
    try {
        const { userId } = req.body; // User ID from request body


        // Check if there is already an attempt in progress
        const existingAttempt = db.data.attempts.find(
            (attempt) => attempt.userId === userId && attempt.status === 'in_progress'
        );

        if (existingAttempt) {
            // If an attempt is in progress, return the existing attempt (OK response)
            return res.status(200).json(
                createResponse({
                    status: true,
                    statusCode: 200,
                    path: req.originalUrl,
                    message: 'Test already in progress. Resuming the test.',
                    result: { existingAttempt },
                })
            );
        }

        // Proceed to create a new test attempt
        const tests = db.data.tests;
        const test = tests[Math.floor(Math.random() * tests.length)];

        if (!test) {
            return res.status(404).json(
                createResponse({
                    status: false,
                    statusCode: 404,
                    path: req.originalUrl,
                    message: 'Test not found.',
                    result: {},
                })
            );
        }

        const newAttempt = {
            attemptId: Date.now(),
            testId: test._id,
            userId,
            status: 'in_progress',
            startedAt: new Date(),
            modules: test.modules.map((module) => ({
                moduleName: module.name,
                status: 'pending',
                startedAt: null,
                completedAt: null,
            })),
        };

        db.data.attempts.push(newAttempt);
        await db.write();

        res.status(201).json(
            createResponse({
                status: true,
                statusCode: 201,
                path: req.originalUrl,
                message: 'Test attempt started successfully.',
                result: { attemptId: newAttempt.attemptId, modules: newAttempt.modules },
            })
        );
    } catch (error) {
        console.error('Error starting test attempt:', error);
        res.status(500).json({
            message: 'Internal server error.',
        });
    }
};
