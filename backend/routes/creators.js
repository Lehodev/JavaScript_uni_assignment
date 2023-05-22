const express = require('express');
const router = express.Router();
const service = require('../service/creator');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No creators found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting creators",
            error: err
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const creator = rows[0];

        if (rows.length > 0) {
            res.status(200).json(creator);
        } else {
            res.status(404).json({
                message: "creator not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting creator",
            error: err
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            message: "Name is required"
        });
        return;
    }

    try {
        const creator = {
            name: req.body.name
        };

        const [results] = await service.create(creator);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "creator created successfully",
                creator: {
                    id: results.insertId,
                    name: creator.name
                }
            });
        }
        else {
            res.status(500).json({
                message: "Error creating creator",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error creating creator",
            error: err
        });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const creator = rows[0];

        if (rows.length > 0) {
            const data = {
                name: req.body.name || creator.name
            };

            const [result] = await service.update(id, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "creator updated successfully",
                    creator: {
                        id: id,
                        name: data.name
                    }
                });
            } else {
                res.status(500).json({
                    message: "Error updating creator"
                });
            }
        } else {
            res.status(404).json({
                message: "creator not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error updating creator",
            error: err
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const creator = rows[0];

        if (rows.length > 0) {
            await service.delete(id);

            res.status(200).json({
                message: "creator deleted successfully",
                creator: creator
            });

        } else {
            res.status(404).json({
                message: "creator not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting creator",
            error: err
        });
    }
});

module.exports = router;