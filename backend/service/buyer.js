exports.findAll = async () => {
    return db.query("SELECT `id`, `name`, DATE_FORMAT(`born_date`, '%Y-%m-%d %H:%i:%s') as `born_date` FROM `Buyers`");
}

exports.findById = async (id) => {
    return db.query("SELECT `id`, `name`, DATE_FORMAT(`born_date`, '%Y-%m-%d %H:%i:%s') as `born_date` FROM `Buyers` WHERE `id` = ?", [id]);
}

exports.create = async (buyer) => {
    return db.execute("INSERT INTO `Buyers` (`name`, `born_date`) VALUES (?, ?)",
        [buyer.name, buyer.born_date]);
}

exports.update = async (id, buyer) => {
    return db.execute("UPDATE `Buyers` SET `name` = ?, `born_date` = ? WHERE `id` = ?",
        [buyer.name, buyer.born_date, id]);
}

exports.delete = async (id) => {
    return db.execute("DELETE FROM `Buyers` WHERE `id` = ?", [id]);
}
