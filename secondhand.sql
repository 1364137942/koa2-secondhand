/*
Navicat MySQL Data Transfer

Source Server         : localhosts
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : secondhand

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-03-29 12:01:43
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
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `FGoodID` int(11) NOT NULL AUTO_INCREMENT,
  `FEmail` varchar(64) NOT NULL COMMENT '关联用户',
  `FGoodName` varchar(64) NOT NULL COMMENT '商品名字',
  `FGoodImg` varchar(512) NOT NULL COMMENT '商品图片，用;分隔',
  `FPrice` varchar(32) NOT NULL COMMENT '商品价格',
  `FOld` tinyint(1) DEFAULT '0',
  `FType` varchar(32) NOT NULL COMMENT '商品类型',
  `FDesc` varchar(512) NOT NULL COMMENT '商品描述',
  `FEnable` tinyint(1) NOT NULL DEFAULT '1',
  `FStatus` tinyint(1) DEFAULT '1' COMMENT '商品状态',
  `FSaleDate` date NOT NULL COMMENT '商品发售日期',
  `FOutDate` date NOT NULL COMMENT '商品自动下架日期',
  `FCreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `FUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `FClick` int(11) DEFAULT '0',
  PRIMARY KEY (`FGoodID`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

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
  `FOld` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`FWantID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

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
