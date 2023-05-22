const express = require('express');
const router = express.Router();
const service = require('../service/buyer');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No buyers found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting buyers",
            error: err
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const buyer = rows[0];

        if (rows.length > 0) {
            res.status(200).json(buyer);
        } else {
            res.status(404).json({
                message: "buyer not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting buyer",
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

    if (!req.body.born_date) {
        res.status(400).json({
            message: "Born date is required"
        });
        return;
    }

    const name = req.body.name;
    const born_date = req.body.born_date;

    try {
        const buyer = {
            name: name,
            born_date: born_date
        };

        const [results] = await service.create(buyer);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "buyer created successfully",
                buyer: {
                    id: results.insertId,
                    name: buyer.name,
                    born_date: new Date(buyer.born_date)
                }
            });
        }
        else {
            res.status(500).json({
                message: "Error creating buyer",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error creating buyer",
            error: err
        });
    }
});

router.put('/:id', async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            message: "Name is required"
        });
        return;
    }

    if (!req.body.born_date) {
        res.status(400).json({
            message: "Registration date is required"
        });
        return;
    }

    const id = req.params.id;
    const name = req.body.name;
    const born_date = req.body.born_date;

    try {
        const [rows] = await service.findById(id);
        const buyer = rows[0];

        if (rows.length > 0) {
            const data = {
                name: name || buyer.name,
                born_date: born_date || buyer.born_date
            };

            const [result] = await service.update(id, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "buyer updated successfully",
                    buyer: {
                        id: id,
                        name: data.name,
                        born_date: new Date(data.born_date)
                    }
                });
            } else {
                res.status(500).json({
                    message: "Error updating buyer"
                });
            }
        } else {
            res.status(404).json({
                message: "buyer not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error updating buyer",
            error: err
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await service.findById(id);
        const buyer = rows[0];

        if (rows.length > 0) {
            await service.delete(id);
            res.status(200).json({
                message: "buyer deleted successfully",
                buyer: buyer
            });
        } else {
            res.status(404).json({
                message: "buyer not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting buyer",
            error: err
        });
    }
});

module.exports = router;