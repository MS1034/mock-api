import { db } from "../db/index.js"; // Importing from lowdb instance

export const getTestById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        // Ensure lowdb is properly initialized and data is loaded
        await db.read(); // Make sure the data is read from the file

        // Find the test by ID from the lowdb data array
        console.log(db.data.tests)
        const test = db.data.tests.find((item) => item._id === id);

        if (!test) {
            return res.status(404).json({ message: `Test with id=${id} not found` });
        }

        return res.status(200).json(test);
    } catch (error) {
        console.error(`Error fetching test by ID: ${error.message}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
