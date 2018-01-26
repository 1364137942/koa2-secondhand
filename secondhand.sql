/*
Navicat MySQL Data Transfer

Source Server         : localhosts
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : secondhand

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-01-26 17:15:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin` (
  `FID` int(11) NOT NULL AUTO_INCREMENT,
  `FUser` varchar(64) NOT NULL,
  `FPassword` varchar(64) NOT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES ('1', 'admin', 'E10ADC3949BA59ABBE56E057F20F883E');

-- ----------------------------
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `FGoodID` int(11) NOT NULL AUTO_INCREMENT,
  `FEmail` varchar(64) NOT NULL COMMENT '关联用户',
  `FGoodName` varchar(64) NOT NULL COMMENT '商品名字',
  `FGoodImg` varchar(512) NOT NULL COMMENT '商品图片，用;分隔',
  `FPrice` varchar(32) NOT NULL COMMENT '商品价格',
  `FType` varchar(32) NOT NULL COMMENT '商品类型',
  `FOld` varchar(32) NOT NULL COMMENT '商品新旧程度',
  `FDesc` varchar(512) NOT NULL COMMENT '商品描述',
  `FEnable` tinyint(1) NOT NULL DEFAULT '1',
  `FStatus` tinyint(1) DEFAULT '1' COMMENT '商品状态',
  `FSaleDate` date NOT NULL COMMENT '商品发售日期',
  `FOutDate` date NOT NULL COMMENT '商品自动下架日期',
  `FCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `FUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `FClick` int(11) unsigned zerofill DEFAULT '00000000000' COMMENT '点击次数',
  PRIMARY KEY (`FGoodID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_goods
-- ----------------------------
INSERT INTO `t_goods` VALUES ('1', '123', '123', '123', '123', '1', '2', '', '1', '1', '0000-00-00', '0000-00-00', '2018-01-06 15:25:28', '2018-01-06 15:25:28', '00000000000');

-- ----------------------------
-- Table structure for t_good_type
-- ----------------------------
DROP TABLE IF EXISTS `t_good_type`;
CREATE TABLE `t_good_type` (
  `FKey` varchar(32) NOT NULL,
  `FShowName` varchar(64) NOT NULL,
  `FStatus` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_good_type
-- ----------------------------

-- ----------------------------
-- Table structure for t_idcode
-- ----------------------------
DROP TABLE IF EXISTS `t_idcode`;
CREATE TABLE `t_idcode` (
  `FEmail` varchar(64) NOT NULL,
  `FIdCode` varchar(6) NOT NULL,
  `FExpireTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `FUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`FEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_idcode
-- ----------------------------
INSERT INTO `t_idcode` VALUES ('1364137942', 'HLES', '2018-01-09 22:52:23', '2018-01-09 20:52:23');
INSERT INTO `t_idcode` VALUES ('1364137942@123.com', 'NZI6', '2018-01-09 22:52:44', '2018-01-09 20:52:44');
INSERT INTO `t_idcode` VALUES ('1364137942@qq.com', 'H97Q', '1970-01-01 08:00:01', '2018-01-15 20:14:11');

-- ----------------------------
-- Table structure for t_notice
-- ----------------------------
DROP TABLE IF EXISTS `t_notice`;
CREATE TABLE `t_notice` (
  `FNoticeID` int(11) NOT NULL AUTO_INCREMENT,
  `FEmail` varchar(64) NOT NULL COMMENT '用户邮箱',
  `FTitle` varchar(64) NOT NULL COMMENT '标题',
  `FContent` varchar(1028) NOT NULL COMMENT '邮件内容',
  `FIsSend` tinyint(1) NOT NULL DEFAULT '0',
  `FCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`FNoticeID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_notice
-- ----------------------------
INSERT INTO `t_notice` VALUES ('2', '1346', 'test', '10', '0', '2018-01-06 19:47:50');
INSERT INTO `t_notice` VALUES ('3', '1346', 'test', '10', '0', '2018-01-06 20:10:51');
INSERT INTO `t_notice` VALUES ('4', '1346', 'test', '10', '0', '2018-01-06 20:11:23');
INSERT INTO `t_notice` VALUES ('5', '1346', 'test', '10', '0', '2018-01-06 20:13:22');
INSERT INTO `t_notice` VALUES ('6', '*', 'test', '10', '0', '2018-01-06 20:13:35');
INSERT INTO `t_notice` VALUES ('7', '*', 'test', '10', '0', '2018-01-06 20:14:06');
INSERT INTO `t_notice` VALUES ('8', '666', 'test', '10', '0', '2018-01-06 20:14:15');
INSERT INTO `t_notice` VALUES ('9', '666', 'test', '10', '0', '2018-01-06 20:14:25');
INSERT INTO `t_notice` VALUES ('10', '666789', 'test', '10', '0', '2018-01-06 20:15:13');
INSERT INTO `t_notice` VALUES ('11', '666789', 'test', '10', '0', '2018-01-06 20:15:36');
INSERT INTO `t_notice` VALUES ('12', '666789', 'test', '10', '0', '2018-01-06 20:18:17');
INSERT INTO `t_notice` VALUES ('13', '666789', 'test', '10', '0', '2018-01-06 20:18:28');
INSERT INTO `t_notice` VALUES ('14', '666789', 'test', '10', '0', '2018-01-06 20:21:29');
INSERT INTO `t_notice` VALUES ('15', '111', '123', '654', '0', '2018-01-06 20:23:17');
INSERT INTO `t_notice` VALUES ('16', '666789789789', 'test', '10', '0', '2018-01-06 20:24:53');

-- ----------------------------
-- Table structure for t_old
-- ----------------------------
DROP TABLE IF EXISTS `t_old`;
CREATE TABLE `t_old` (
  `FKey` varchar(32) NOT NULL,
  `FShowName` varchar(64) NOT NULL,
  `FStatus` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_old
-- ----------------------------

-- ----------------------------
-- Table structure for t_read_notice
-- ----------------------------
DROP TABLE IF EXISTS `t_read_notice`;
CREATE TABLE `t_read_notice` (
  `FNoticeID` int(11) NOT NULL AUTO_INCREMENT,
  `FEmail` varchar(64) DEFAULT NULL,
  `FIsRead` tinyint(1) DEFAULT '0',
  `FCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `FUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`FNoticeID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_read_notice
-- ----------------------------
INSERT INTO `t_read_notice` VALUES ('4', '1346', '0', '2018-01-06 20:12:55', '2018-01-06 20:12:55');
INSERT INTO `t_read_notice` VALUES ('5', '1346', '0', '2018-01-06 20:13:22', '2018-01-06 20:13:22');
INSERT INTO `t_read_notice` VALUES ('8', '666', '0', '2018-01-06 20:14:15', '2018-01-06 20:14:15');
INSERT INTO `t_read_notice` VALUES ('10', '666789', '0', '2018-01-06 20:15:13', '2018-01-06 20:15:13');
INSERT INTO `t_read_notice` VALUES ('12', '666789', '0', '2018-01-06 20:18:17', '2018-01-06 20:18:17');
INSERT INTO `t_read_notice` VALUES ('16', '666789789789', '0', '2018-01-06 20:24:53', '2018-01-06 20:24:53');
INSERT INTO `t_read_notice` VALUES ('45', '111', '0', '2018-01-06 20:23:56', '2018-01-06 20:23:56');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `FUserID` int(11) NOT NULL AUTO_INCREMENT,
  `FEmail` varchar(64) NOT NULL COMMENT '用户邮箱',
  `FUserName` varchar(64) NOT NULL COMMENT '用户名称',
  `FPassword` varchar(64) NOT NULL COMMENT '用户密码',
  `FStudentID` varchar(32) NOT NULL COMMENT '用户学号',
  `FStudentName` varchar(32) NOT NULL COMMENT '用户姓名',
  `FAcademy` varchar(64) NOT NULL COMMENT '用户所在学院',
  `FPhone` varchar(32) NOT NULL COMMENT '用户手机号',
  `FQQ` varchar(32) NOT NULL COMMENT '用户qq号',
  `FAvatar` varchar(255) NOT NULL,
  `FIsBlack` tinyint(1) DEFAULT '0' COMMENT '用户是否被拉黑',
  PRIMARY KEY (`FUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '123', '123', '123', '123', '123', '123', '123', '123', '/image/defaultAvatar.jpg', '0');
INSERT INTO `t_user` VALUES ('2', '136', '123', '123', '123', '123', '123', '123', '123', '/image/defaultAvatar.jpg', '1');
INSERT INTO `t_user` VALUES ('6', '1364137942@qq.com', 'alizjli', '96E79218965EB72C92A549DD5A330112', '20141002496', '黎子健', '信息科学与技术学院、网络空间安全学院', '', '', '/image/defaultAvatar.jpg', '0');

-- ----------------------------
-- Table structure for t_wants
-- ----------------------------
DROP TABLE IF EXISTS `t_wants`;
CREATE TABLE `t_wants` (
  `FWantID` int(11) NOT NULL AUTO_INCREMENT,
  `FEmail` varchar(64) NOT NULL COMMENT '关联用户',
  `FGoodName` varchar(64) NOT NULL COMMENT '商品名字',
  `FType` varchar(32) NOT NULL COMMENT '商品类型',
  `FDesc` varchar(512) NOT NULL COMMENT '商品描述',
  `FEnable` tinyint(1) NOT NULL DEFAULT '1',
  `FStatus` tinyint(1) DEFAULT '1' COMMENT '商品状态',
  `FSaleDate` date NOT NULL COMMENT '商品发售日期',
  `FOutDate` date NOT NULL COMMENT '商品自动下架日期',
  `FCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `FUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`FWantID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_wants
-- ----------------------------
INSERT INTO `t_wants` VALUES ('1', '123', '123', '1', '', '0', '0', '0000-00-00', '0000-00-00', '2018-01-06 15:36:31', '2018-01-06 15:36:31');

-- ----------------------------
-- Table structure for _mysql_session_store
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _mysql_session_store
-- ----------------------------
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:B7m8DldVYD93-HV6lu8joV1EDLp5k9fj', '1516102786426', '{\"isLogin\":true,\"username\":\"admin\"}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:Vjqiidj8IciStb0KH7mZWxq1NVa5zJ4B', '1517023789822', '{\"isLogin\":true,\"username\":\"admin\"}');
