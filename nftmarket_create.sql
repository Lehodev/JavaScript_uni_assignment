CREATE TABLE `Nfts` (
  `token` char(10) PRIMARY KEY NOT NULL,
  `title` varchar(255) NOT NULL,
  `creator` int NOT NULL
);

CREATE TABLE `Creators` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `Buyers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `born_date` datetime NOT NULL
);

CREATE TABLE `Buyers_Nfts` (
  `token` char(10),
  `buyer_id` int,
  `bought_date` datetime NOT NULL,
  PRIMARY KEY (`token`, `buyer_id`, `bought_date`)
);

ALTER TABLE `Nfts` ADD FOREIGN KEY (`creator`) REFERENCES `Creators` (`id`);

ALTER TABLE `Buyers_Nfts` ADD FOREIGN KEY (`token`) REFERENCES `Nfts` (`token`);

ALTER TABLE `Buyers_Nfts` ADD FOREIGN KEY (`buyer_id`) REFERENCES `Buyers` (`id`);

