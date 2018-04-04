/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50633
Source Host           : localhost:3306
Source Database       : secondhand

Target Server Type    : MYSQL
Target Server Version : 50633
File Encoding         : 65001

Date: 2018-04-04 20:39:44
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
INSERT INTO `t_good_type` VALUES ('cloth', '服装配饰', '1');
INSERT INTO `t_good_type` VALUES ('digital', '手机数码', '1');
INSERT INTO `t_good_type` VALUES ('book', '图书专区', '1');
INSERT INTO `t_good_type` VALUES ('sport', '运动文体', '1');
INSERT INTO `t_good_type` VALUES ('bike', '自行车', '1');
INSERT INTO `t_good_type` VALUES ('homeMachine', '家用电器', '1');
INSERT INTO `t_good_type` VALUES ('music', '乐器', '1');
INSERT INTO `t_good_type` VALUES ('other', '其他', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_goods
-- ----------------------------
INSERT INTO `t_goods` VALUES ('1', '1364137942@qq.com', 'BINGER手表', '/image/defaultImg.png', '500', '1', 'other', '<p>一只好看的手表呢</p>', '1', '1', '2018-03-28', '2018-04-27', '2018-04-04 20:38:16', '2018-04-04 20:38:16', '0');
INSERT INTO `t_goods` VALUES ('88', '1156889338@qq.com', 'UNIX教程', '//localhost:3001/image/img/fb9057eecce01.jpg', '25', '0', 'book', '<p>一本UNIX教程书籍</p>', '1', '1', '2018-03-26', '2018-04-02', '2018-03-28 06:59:17', '2018-03-28 06:59:17', '0');
INSERT INTO `t_goods` VALUES ('91', '1156889338@qq.com', 'Java 语言程序设计（基础篇）', '//localhost:3001/image/img/1faa623f49b7.jpg', '60', '0', 'book', '<p>一本关于学习Java知识的书籍</p>', '1', '1', '2018-03-28', '2018-04-12', '2018-03-28 07:02:15', '2018-03-28 07:02:16', '0');
INSERT INTO `t_goods` VALUES ('92', '1156889338@qq.com', '摆渡人', '//localhost:3001/image/img/dfb01b0ae72d8.jpg', '30', '0', 'book', '<p>“如果命运是一条孤独的河流，谁会是你灵魂的摆渡人？”</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-03-28 07:04:02', '2018-03-28 07:04:02', '0');
INSERT INTO `t_goods` VALUES ('93', '1156889338@qq.com', 'JavaScript 基础教程第9版', '//localhost:3001/image/img/86a9467762f91.jpg', '69', '1', 'book', '<p>经典JavaScript入门书最新版，通过实例透彻讲解web开发相关技术</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-03-28 07:07:08', '2018-03-28 07:07:08', '0');
INSERT INTO `t_goods` VALUES ('94', '1156889338@qq.com', '中国最美的哲理散文', '//localhost:3001/image/img/b99b5be8f9855.jpg', '32', '1', 'book', '<p>经典散文集</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-03-28 07:08:38', '2018-03-28 07:08:38', '0');
INSERT INTO `t_goods` VALUES ('95', '1156889338@qq.com', 'JavaScript权威指南', '//localhost:3001/image/img/677efd7b7795a.jpg', '130', '1', 'book', '<p>学习JavaScript的必备书籍</p>', '1', '1', '2018-03-28', '2018-04-12', '2018-04-03 12:52:06', '2018-04-03 12:52:06', '0');

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
INSERT INTO `t_idcode` VALUES ('1364137942', 'HLES', '2018-01-09 14:52:23', '2018-01-09 12:52:23');
INSERT INTO `t_idcode` VALUES ('1364137942@123.com', 'NZI6', '2018-01-09 14:52:44', '2018-01-09 12:52:44');
INSERT INTO `t_idcode` VALUES ('1364137942@qq.com', 'DGSV', '1970-01-01 08:00:01', '2018-04-04 20:30:53');

-- ----------------------------
-- Table structure for t_remark
-- ----------------------------
DROP TABLE IF EXISTS `t_remark`;
CREATE TABLE `t_remark` (
  `FRemarkID` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论',
  `FItemID` varchar(32) NOT NULL COMMENT '关联的商品或求购信息ID，需要家前缀如:G1,W1',
  `FEmail` varchar(32) NOT NULL COMMENT '用户ID',
  `FPrice` varchar(32) NOT NULL DEFAULT '' COMMENT '用户出价',
  `FRemark` varchar(32) NOT NULL COMMENT '评论内容',
  `FStatus` tinyint(1) NOT NULL DEFAULT '1',
  `FCreateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`FRemarkID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_remark
-- ----------------------------
INSERT INTO `t_remark` VALUES ('1', 'G1', '1364137942@qq.com', '12', 'cdshi', '0', '2018-04-03 17:03:13');
INSERT INTO `t_remark` VALUES ('2', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('3', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('4', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('5', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('6', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('7', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('8', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('9', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('10', 'G1', '1364137942@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('11', 'G1', '1156889334@qq.com', '12', 'cdshi', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('12', 'G1', '1364137942@qq.com', '123', '我要了', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('13', 'G95', '1364137942@qq.com', '123', '我报了', '1', '2018-04-04 19:09:47');
INSERT INTO `t_remark` VALUES ('16', 'W44', '1364137942@qq.com', '100', '100我出', '1', '2018-04-04 19:11:34');
INSERT INTO `t_remark` VALUES ('17', 'G1', '1364137942@qq.com', '100', '给我吧 啦啦啦', '1', '2018-04-04 20:34:27');

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
INSERT INTO `t_user` VALUES ('1', '1156889331@qq.com', 'Leo', 'e10adc3949ba59abbe56e057f20f883e', '20191002514', '测试用户1', '金融学院', '17726101765', '1156889331', '/image/defaultAvatar.jpg', '0');
INSERT INTO `t_user` VALUES ('2', '1156889332@qq.com', 'Lee', 'e10adc3949ba59abbe56e057f20f883e', '20191002513', '测试用户2', '新闻与传播学院', '17726101764', '1156889332', '/image/defaultAvatar.jpg', '0');
INSERT INTO `t_user` VALUES ('3', '1156889338@qq.com', 'Kevin', 'e10adc3949ba59abbe56e057f20f883e', '20141002513', '陈嘉荣', '信息科学与技术学院', '18826101765', '1156889338', '/image/defaultAvatar.jpg', '0');
INSERT INTO `t_user` VALUES ('4', '1156889334@qq.com', 'Bob', '96E79218965EB72C92A549DD5A330112', '20191002517', '测试用户4', '经济与贸易学院', '17726101766', '1156889334', '/image/defaultAvatar.jpg', '0');
INSERT INTO `t_user` VALUES ('5', '1156889333@qq.com', 'Amy', '96E79218965EB72C92A549DD5A330112', '20191002517', '测试用户3', '艺术学院', '17726101769', '1156889333', '/image/defaultAvatar.jpg', '0');
INSERT INTO `t_user` VALUES ('6', '1364137942@qq.com', 'alizjli', 'E10ADC3949BA59ABBE56E057F20F883E', '20191002496', '测试用户5', '信息科学与技术学院、网络空间安全学院', '18826101762', '18826101762', '//localhost:3001/image/img/c0af276aaf078.png', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_wants
-- ----------------------------
INSERT INTO `t_wants` VALUES ('35', '1156889338@qq.com', 'vue教程', 'book', '<p>vue基础教程书籍</p>', '1', '1', '2018-03-26', '2018-04-10', '2018-03-26 10:15:54', '2018-03-26 10:15:54', '0');
INSERT INTO `t_wants` VALUES ('36', '1156889338@qq.com', '大脑的谎言', 'book', '<p>一本关于洞察思维的书</p>', '1', '1', '2018-03-28', '2018-04-12', '2018-03-28 07:15:22', '2018-03-28 07:15:22', '1');
INSERT INTO `t_wants` VALUES ('37', '1156889338@qq.com', 'IPhone8', 'digital', '<p>二手的Iphone8手机，希望机身无刮碰，64G内存</p>', '1', '1', '2018-03-28', '2018-04-12', '2018-03-28 07:16:53', '2018-03-28 07:16:53', '0');
INSERT INTO `t_wants` VALUES ('38', '1156889338@qq.com', '篮球', 'sport', '<p>耐用的室外水泥地篮球</p>', '1', '1', '2018-03-28', '2018-04-12', '2018-03-28 07:17:32', '2018-03-28 07:17:32', '1');
INSERT INTO `t_wants` VALUES ('39', '1156889338@qq.com', '吹风机', 'homeMachine', '<p>正常使用的吹风机</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-03-28 07:18:20', '2018-03-28 07:18:20', '0');
INSERT INTO `t_wants` VALUES ('40', '1156889338@qq.com', '休闲自行车', 'bike', '<p>大概8 9 成新的自行车</p>', '1', '1', '2018-03-28', '2018-04-27', '2018-03-28 07:19:01', '2018-03-28 07:19:01', '0');
INSERT INTO `t_wants` VALUES ('41', '1156889338@qq.com', '音响', 'other', '<p>宿舍使用的小型音响</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-03-28 07:28:46', '2018-03-28 07:28:46', '0');
INSERT INTO `t_wants` VALUES ('42', '1156889338@qq.com', '吉他', 'music', '<p>二手吉他</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-03-28 07:29:04', '2018-03-28 07:29:04', '0');
INSERT INTO `t_wants` VALUES ('43', '1156889338@qq.com', '施华洛项链', 'cloth', '<p>送女朋友最佳礼物</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-03-28 07:29:56', '2018-03-28 07:29:56', '1');
INSERT INTO `t_wants` VALUES ('44', '1156889338@qq.com', '电饭煲66444444231312', 'homeMachine', '<p>能用就好</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-04-03 20:22:11', '2018-04-03 20:22:11', '0');
INSERT INTO `t_wants` VALUES ('45', '1156889338@qq.com', '山地跑车', 'bike', '<p>短途旅行常用设备</p>', '1', '1', '2018-03-28', '2018-04-04', '2018-03-28 07:31:39', '2018-03-28 07:31:39', '0');
INSERT INTO `t_wants` VALUES ('46', '1156889338@qq.com', '尤克里里', 'music', '<p>泡妞必备神器</p>', '1', '0', '2018-03-28', '2018-04-04', '2018-03-28 07:39:58', '2018-03-28 07:39:58', '1');
SET FOREIGN_KEY_CHECKS=1;
