create table `t_admin`(
  `FID` int(11) auto_increment primary key,
  `FUser` varchar(64) NOT NULL,
  `FPassword` varchar(64) NOT NULL
);
create table `t_goods`(
  `FGoodID` int(11) auto_increment primary key,
  `FEmail` varchar(64) NOT NULL comment "关联用户",
  `FGoodName` varchar(64) NOT NULL comment "商品名字",
  `FGoodImg` varchar(512) NOT NULL comment "商品图片，用;分隔",
  `FPrice` varchar(32) NOT NULL comment "商品价格",
  `FType` varchar(32) NOT NULL comment "商品类型",
  `FOld` varchar(32) NOT NULL comment "商品新旧程度",
  `FDesc` varchar(512) NOT NULL comment "商品描述",
  `FStatus` tinyint(1) default 1 comment "商品状态",
  `FSaleDate` date NOT NULL comment "商品发售日期",
  `FOutDate` date NOT NULL comment "商品自动下架日期",
  `FCreateTime` timeStamp NOT NULL comment "创建时间",
  `FUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment "更新时间",
  `FClick` int(11) default null comment "点击次数"
);

create Table `t_notice`(
  `FNoticeID` int(11) auto_increment primary key,
  `FEmail` varchar(64) NOT NULL comment "用户邮箱",
  `FTitle` varchar(64) NOT NULL comment "标题",
  `FContent` varchar(1028) NOT NULL comment "邮件内容",
  `FCreateTime` timeStamp NOT NULL comment "创建时间"
);

create Table `t_old`(
  `FKey` varchar(32) NOT NULL,
  `FShowName` varchar(64) NOT NULL,
  `FStatus` tinyint(1) default 1
);

create TABLE `t_good_type`(
    `FKey` varchar(32) NOT NULL,
    `FShowName` varchar(64) NOT NULL,
    `FStatus` tinyint(1) default 1
);

create TABLE `t_user`(
  `FUserID` int(11) auto_increment primary key,
  `FEmail` varchar(64) NOT NULL comment "用户邮箱",
  `FUserName` varchar(64) NOT NULL comment "用户名称",
  `FPassword` varchar(64) NOT NULL comment "用户密码",
  `FStudentID` varchar(32) NOT NULL comment "用户学号",
  `FStudentName` varchar(32) NOT NULL comment "用户姓名",
  `FAcademy` varchar(64) NOT NULL comment "用户所在学院",
  `FPhone` varchar(32) NOT NULL comment "用户手机号",
  `FQQ` varchar(32) NOT NULL comment "用户qq号",
  `FIsBlack` tinyint(1) default 0 comment "用户是否被拉黑"
);

create Table `t_read_notice`(
  `FNoticeID` int(11) auto_increment primary key,
  `FIsRead` tinyint(1) default 0
);

create TABLE `t_want`(
  `FWantID` int(11) auto_increment primary key,
  `FEmail` varchar(64) NOT NULL comment "关联用户",
  `FGoodName` varchar(64) NOT NULL comment "商品名字",
  `FType` varchar(32) NOT NULL comment "商品类型",
  `FDesc` varchar(512) NOT NULL comment "商品描述",
  `FStatus` tinyint(1) default 1 comment "商品状态",
  `FSaleDate` date NOT NULL comment "商品发售日期",
  `FOutDate` date NOT NULL comment "商品自动下架日期",
  `FCreateTime` timeStamp NOT NULL comment "创建时间",
  `FUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment "更新时间"
);
create Table `t_idcode`(
  `FEmail` varchar(64) not null primary key,
  `FIdCode` varchar(6) not null,
  `FExpireTime` timeStamp NOT NULL,
  `FUpdateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment "更新时间"
)

