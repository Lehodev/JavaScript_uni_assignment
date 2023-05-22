exports.findAll = async () => {
    return db.query("SELECT * FROM `Creators`");
}

exports.findById = async (id) => {
    return db.query("SELECT * FROM `Creators` WHERE `id` = ?", [id]);
}

exports.create = async (creator) => {
    return db.execute("INSERT INTO `Creators` (`name`) VALUES (?)",
        [creator.name]);
}

exports.update = async (id, creator) => {
    return db.execute("UPDATE `Creators` SET `name` = ? WHERE `id` = ?",
        [creator.name, id]);
}

exports.delete = async (id) => {
    return db.execute("DELETE FROM `Creators` WHERE `id` = ?", [id]);
}
