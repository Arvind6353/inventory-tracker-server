
-- -----------------------------------------------------
-- Table `maithree-db`.`branch`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `maithree-db`.`branch` ;

CREATE TABLE IF NOT EXISTS `maithree-db`.`branch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(3) NULL,
  `phone_no` VARCHAR(50) NULL,
  `address` VARCHAR(100) NULL,
  `contact_person` VARCHAR(20) NULL,
  `created_date` DATETIME NOT NULL,
  `created_by` VARCHAR(45) NOT NULL DEFAULT 'system',
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `branch_name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `branch_code_UNIQUE` (`code` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maithree-db`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `maithree-db`.`product` ;

CREATE TABLE IF NOT EXISTS `maithree-db`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `created_date` DATETIME NOT NULL,
  `created_by` VARCHAR(45) NOT NULL DEFAULT 'system',
  `image` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `product_name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maithree-db`.`branch-product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `maithree-db`.`branch-product` ;

CREATE TABLE IF NOT EXISTS `maithree-db`.`branch-product` (
  `bp_id` INT NOT NULL AUTO_INCREMENT,
  `branch_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `created_date` DATETIME NOT NULL,
  `created_by` VARCHAR(45) NOT NULL DEFAULT 'system',
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`bp_id`),
  INDEX `product_id_idx` (`product_id` ASC),
  INDEX `branch_id_idx` (`branch_id` ASC),
  CONSTRAINT `branch_id`
    FOREIGN KEY (`branch_id`)
    REFERENCES `maithree-db`.`branch` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `maithree-db`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maithree-db`.`product-inventory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `maithree-db`.`product-inventory` ;

CREATE TABLE IF NOT EXISTS `maithree-db`.`product-inventory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bp_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `end_day_enter` CHAR(1) NOT NULL DEFAULT 'Y',
  `created_date` DATETIME NOT NULL,
  `created_by` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`bp_id` ASC),
  CONSTRAINT `id`
    FOREIGN KEY (`bp_id`)
    REFERENCES `maithree-db`.`branch-product` (`bp_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maithree-db`.`product-target`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `maithree-db`.`product-target` ;

CREATE TABLE IF NOT EXISTS `maithree-db`.`product-target` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `branch_product_id` INT NOT NULL,
  `effective_start_date` DATETIME NOT NULL,
  `effective_end_date` DATETIME NOT NULL,
  `quantity` INT NOT NULL,
  `created_date` DATETIME NOT NULL,
  `created_by` VARCHAR(45) NOT NULL DEFAULT 'system',
  `finish_date` DATETIME NULL,
  `finish_by` VARCHAR(45) NULL,
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`),
  INDEX `bp_id_idx` (`branch_product_id` ASC),
  CONSTRAINT `bp_id`
    FOREIGN KEY (`branch_product_id`)
    REFERENCES `maithree-db`.`branch-product` (`bp_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maithree-db`.`member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `maithree-db`.`member` ;

CREATE TABLE IF NOT EXISTS `maithree-db`.`member` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `branch_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(45) NULL,
  `contact_no` VARCHAR(45) NULL,
  `is_admin` CHAR(1) NOT NULL DEFAULT 'N',
  `active` CHAR(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
