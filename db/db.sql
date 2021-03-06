CREATE SCHEMA IF NOT EXISTS `speer` 
USE `speer` ;

-- -----------------------------------------------------
-- Table `speer`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speer`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB


-- -----------------------------------------------------
-- Table `speer`.`tweets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `speer`.`tweets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` VARCHAR(200) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_TO_USER_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_TO_USER`
    FOREIGN KEY (`user_id`)
    REFERENCES `speer`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB