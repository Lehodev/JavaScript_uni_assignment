exports.findAll = async () => {
    return db.query("SELECT n.token, n.title, c.id, c.name FROM `Nfts` n INNER JOIN `Creators` c ON n.creator = c.id");
}

exports.findByToken = async (token) => {
    return db.query("SELECT n.token, n.title, c.id, c.name FROM `Nfts` n INNER JOIN `Creators` c ON n.creator = c.id WHERE `token` = ?",
        [token]);
}

exports.create = async (nft) => {
    return db.execute("INSERT INTO `Nfts` (`token`, `title`, `creator`) VALUES (?, ?, ?)",
        [nft.token, nft.title, nft.creator]);
}

exports.update = async (token, nft) => {
    return db.execute("UPDATE `Nfts` SET `title` = ?, `creator` = ? WHERE `token` = ?",
        [nft.title, nft.creator, nft]);
}

exports.delete = async (token) => {
    return db.execute("DELETE FROM `Nfts` WHERE `token` = ?", [token]);
}
