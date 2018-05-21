SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `maithree-db`.`branch`
-- -----------------------------------------------------
START TRANSACTION;
USE `maithree-db`;
INSERT INTO `maithree-db`.`branch` (`id`, `name`, `code`, `phone_no`, `address`, `contact_person`, `created_date`, `created_by`, `active`) VALUES (1006, 'PERAMBUR', 'PMR', 'NULL', 'Old No.28, New No.98, Krishnadoss Road, Mangalapuram,', 'Mrs. Krishnapriya', '2018-05-15 21:58:56', 'system', 'Y');
INSERT INTO `maithree-db`.`branch` (`id`, `name`, `code`, `phone_no`, `address`, `contact_person`, `created_date`, `created_by`, `active`) VALUES (1001, 'WEST MAMBALAM', 'MBL', 'NULL', 'No. 25, Vasudevapuram Street, West Mambalam,', 'Mrs. Sharmila', '2018-05-15 22:02:05', 'system', 'Y');
INSERT INTO `maithree-db`.`branch` (`id`, `name`, `code`, `phone_no`, `address`, `contact_person`, `created_date`, `created_by`, `active`) VALUES (1002, 'K.K. NAGAR', 'KKN', 'NULL', 'No. 5, Pallavan Salai, Nesapakkam,Chennai – 600 078', 'Mrs. Jayalakshmi', '2018-05-15 22:36:13', 'system', 'Y');
INSERT INTO `maithree-db`.`branch` (`id`, `name`, `code`, `phone_no`, `address`, `contact_person`, `created_date`, `created_by`, `active`) VALUES (1003, 'ULLAGARAM', 'UGM', 'NULL', 'No.1, Hindu Colony,1 Main Road, Ullagaram,Chennai – 600 091', 'Mrs. Arunmozhi', '2018-05-15 22:36:13', 'system', 'Y');
INSERT INTO `maithree-db`.`branch` (`id`, `name`, `code`, `phone_no`, `address`, `contact_person`, `created_date`, `created_by`, `active`) VALUES (1004, 'TAMBARAM EAST', 'TME', 'NULL', '10, Tan Avenue, Prasanthi Colony, Rajakeelpakkam,Near (Guruvayurappa Temple)Chennai – 600 073', 'Mrs. Ranjini', '2018-05-15 22:36:13', 'system', 'Y');
INSERT INTO `maithree-db`.`branch` (`id`, `name`, `code`, `phone_no`, `address`, `contact_person`, `created_date`, `created_by`, `active`) VALUES (1005, 'TAMBARAM WEST', 'TMW', '2226 0440, 2241 2471', 'No.220, G.S.T. Road (Valluvar Gurukulam Campus),West Tambaram, Chennai – 600 045.', 'Mrs. Shankari', '2018-05-15 22:36:13', 'system', 'Y');

COMMIT;


-- -----------------------------------------------------
-- Data for table `maithree-db`.`product`
-- -----------------------------------------------------
START TRANSACTION;
USE `maithree-db`;
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1001, 'DOOR MAT', 'DOOR MAT', '2018-05-15 22:43:17', 'system', '/images/75x75/doormat.png');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1002, 'TIE AND DYE', 'TIE AND DYE', '2018-05-15 22:43:17', 'system', '/images/75x75/tie.png');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1003, 'OFFICE ENVELOPE', 'OFFICE ENVELOPE', '2018-05-15 22:43:17', 'system', '/images/75x75/envelope.png');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1004, 'WALL HANGING', 'WALL HANGING', '2018-05-15 22:43:17', 'system', '/images/75x75/hanging.png');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1005, 'ORGANIC COVER WITH HANDLE', 'ORGANIC COVER WITH HANDLE', '2018-05-15 22:43:17', 'system', 'NULL');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1006, 'ORGANIC COVER WITHOUT HANDLE', 'ORGANIC COVER WITHOUT HANDLE', '2018-05-15 22:43:17', 'system', 'NULL');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1007, 'LUNCH TOWEL', 'LUNCH TOWEL', '2018-05-15 22:43:17', 'system', '/images/75x75/towel.png');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1008, 'PAPER BAG', 'PAPER BAG (THAMBOOLAM)', '2018-05-15 22:43:17', 'system', '/images/75x75/paperbag.png');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1009, 'PAINTING', 'PAINTING', '2018-05-15 22:43:17', 'system', '');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1010, 'JEWELLERY MAKING', 'JEWELLERY MAKING', '2018-05-15 22:43:17', 'system', '');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1011, 'NAPKIN COVER', 'NAPKIN COVER', '2018-05-15 22:43:17', 'system', '');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1012, 'GIFT COVER', 'GIFT COVER', '2018-05-15 22:43:17', 'system', '');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1013, 'PAPER CUP', 'PAPER CUP', '2018-05-15 22:43:17', 'system', '');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1014, 'PHENYL', 'PHENYL', '2018-05-15 22:43:17', 'system', '');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1015, 'SAMBRANI MAKING', 'SAMBRANI MAKING', '2018-05-15 22:43:17', 'system', '/images/75x75/sambarani.png');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1016, 'FABRIC WEAVING', 'FABRIC WEAVING', '2018-05-15 22:43:17', 'system', '');
INSERT INTO `maithree-db`.`product` (`id`, `name`, `description`, `created_date`, `created_by`, `image`) VALUES (1017, 'CAR BEADS STRINGING', 'CAR BEADS STRINGING', '2018-05-15 22:43:17', 'system', '/images/75x75/carbeads.png');

COMMIT;


-- -----------------------------------------------------
-- Data for table `maithree-db`.`member`
-- -----------------------------------------------------
START TRANSACTION;
USE `maithree-db`;
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1010, 1001, 'Mrs. Shankari', 'shankari1', 'NULL', 'Y', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1001, 1001, 'Mrs. Krishnapriya', 'krpriya', 'NULL', 'Y', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1002, 1001, 'Mrs M Priya', 'mpriya', 'NULL', 'N', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1003, 1002, 'Mrs. Sharmila', 'sharmila', NULL, 'Y', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1004, 1002, 'Mrs. Shankari', 'shankari', NULL, 'Y', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1005, 1003, 'Mrs. Jayalakshmi', 'jlakshmi', NULL, 'Y', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1006, 1003, 'Mrs. Arunmozhi', 'arunmozhi', NULL, 'Y', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1007, 1003, 'Mrs. Ranjini', 'ranjini', NULL, 'Y', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1008, 1004, 'Mrs. Jayantika', 'jayantika', NULL, 'N', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1009, 1004, 'Mrs. Jyothishmathi', 'jyothi', NULL, 'N', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1011, 1004, 'Mrs. Omkari', 'omkari', NULL, 'N', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1012, 1005, 'Mrs. Santoshi', 'santoshi', NULL, 'N', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1013, 1005, 'Mrs. Sanjeeda', 'sanjeeda', NULL, 'N', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1014, 1006, 'Mrs.Kshirin', 'kshrini', NULL, 'N', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1015, 1006, 'Mrs. Karthika', 'karthika', NULL, 'N', 'Y');
INSERT INTO `maithree-db`.`member` (`id`, `branch_id`, `name`, `code`, `contact_no`, `is_admin`, `active`) VALUES (1016, 1006, 'Mrs. S Gayathri', 'gayathri', NULL, 'N', 'Y');

COMMIT;

-- -----------------------------------------------------
-- Data for table `maithree-db`.`branch-product`
-- -----------------------------------------------------
START TRANSACTION;
USE `maithree-db`;
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1001, 1001, 1001, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1002, 1001, 1002, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1003, 1001, 1003, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1004, 1001, 1004, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1005, 1001, 1005, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1006, 1001, 1006, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1007, 1001, 1007, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1008, 1001, 1008, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1009, 1002, 1001, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1010, 1002, 1002, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1011, 1002, 1003, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1012, 1002, 1004, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1013, 1002, 1005, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1014, 1002, 1006, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1015, 1002, 1007, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1016, 1002, 1008, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1017, 1003, 1001, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1018, 1003, 1002, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1019, 1003, 1003, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1020, 1003, 1004, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1021, 1003, 1010, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1022, 1003, 1011, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1023, 1003, 1012, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1024, 1003, 1013, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1025, 1004, 1001, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1026, 1004, 1002, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1027, 1004, 1003, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1028, 1004, 1004, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1029, 1004, 1010, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1030, 1004, 1011, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1031, 1004, 1015, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1032, 1004, 1016, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1033, 1005, 1001, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1034, 1005, 1002, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1035, 1005, 1003, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1036, 1005, 1004, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1037, 1005, 1010, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1038, 1005, 1011, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1039, 1005, 1015, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1040, 1005, 1016, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1041, 1006, 1001, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1042, 1006, 1002, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1043, 1006, 1013, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1044, 1006, 1012, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1045, 1006, 1010, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1046, 1006, 1011, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1047, 1006, 1015, '2018-05-15 22:59:21', 'system', 'Y');
INSERT INTO `maithree-db`.`branch-product` (`bp_id`, `branch_id`, `product_id`, `created_date`, `created_by`, `active`) VALUES (1048, 1006, 1016, '2018-05-15 22:59:21', 'system', 'Y');

COMMIT;
