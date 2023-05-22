const express = require('express');
const router = express.Router();
const service = require('../service/nft');

router.get('/', async (_req, res) => {
    try {
        const [rows] = await service.findAll();

        if (rows.length > 0) {
            res.status(200).json(rows.map(row => ({
                    token: row.token,
                    title: row.title,
                    creator: {
                        id: row.id,
                        name: row.name
                    }
                }
            )));
        } else {
            res.status(404).json({
                message: "No nfts found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting nfts",
            error: err
        })
    }
});

router.get('/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const [rows] = await service.findBytoken(token);
        const data = rows[0];

        if (rows.length > 0) {
            res.status(200).json({
                token: data.token,
                title: data.title,
                creator: {
                    id: data.id,
                    name: data.name
                }
            });
        } else {
            res.status(404).json({
                message: "Error getting nft"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error getting nft",
            error: err
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.token) {
        res.status(400).json({
            message: "token is required"
        });
        return;
    }

    if (!req.body.title) {
        res.status(400).json({
            message: "Title is required"
        });
        return;
    }

    if (!req.body.creator) {
        res.status(400).json({
            message: "creator is required"
        });
        return;
    }

    try {
        const nft = {
            token: req.body.token,
            title: req.body.title,
            creator: req.body.creator
        }

        const [results] = await service.create(nft);

        if (results.affectedRows === 1) {
            res.status(200).json({
                message: "nft created successfully",
                nft: nft
            });
        } else {
            res.status(500).json({
                message: "Error creating creator"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Error creating nft",
            error: err
        });
    }
});

router.put('/:token', async (req, res) => {
    const token = req.params.token;
    const title = req.body.title;
    const creator = req.body.creator;

    try {
        const [rows] = await service.findBytoken(token);
        const nft = rows[0];

        if (rows.length > 0) {

            const data = {
                token: token || nft.token,
                title: title || nft.title,
                creator: creator || {id: nft.id}
            }

            const [result] = await service.update(token, data);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    message: "nft updated successfully",
                    nft: data
                });
            } else {
                res.status(500).json({
                    message: "Error updating nft"
                });
            }

        } else {
            res.status(500).json({
                message: "Error updating nft"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Error updating nft",
            error: err
        });
    }
});

router.delete('/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const [rows] = await service.findBytoken(token);
        const nft = rows[0];

        if (rows.length > 0) {
            await service.delete(token);

            res.status(200).json({
                message: "nft deleted successfully",
                nft: nft
            });

        } else {
            res.status(404).json({
                message: "nft not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error deleting nft",
            error: err
        });
    }
});

module.exports = router