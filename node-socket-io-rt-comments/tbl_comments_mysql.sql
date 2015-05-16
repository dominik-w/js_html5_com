
CREATE TABLE IF NOT EXISTS `tbl_comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT '0',
  `sender` varchar(100) NOT NULL,
  `body` TEXT NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
