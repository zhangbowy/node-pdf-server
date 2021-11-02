// 验证 val是否存在于 LoginType中
function isThisType(this: {
        ADMIN: number; // admin 超级管理员
        USER_AGENT: number; // 服务商
        USER: number; // 普通用户
        isThisType: (val: any) => boolean;
    // tslint:disable-next-line:no-multi-spaces
    },              val: any) {
    for (const key in this) {
      if (this[key] === val) {
        return true;
      }
    }
    return false;
  }
  
const REDIS_ENUM = {
    // 借贷
    borrowPoolTotal: 'borrowPoolTotal',
    borrowPoolRemain: 'borrowPoolRemain',
    // 释放
    releaseReward: 'releaseDate',
  };
  
  // 能否加速
const PKG_STATUS = {
    NO: 0,
    YES: 1,
  };
  
  // 提现
const WITHDRAW_STATUS = {
    INIT: 1, // 处理中
    PASS: 2, // 通过
    REJECT: 3, // 拒绝
  };
  
const COIN_TYPE = {
    FIL: 1,
    USDT: 2
  };
  
const APPROVE_RECORD = {
    CHANNEL: {
      USER: 1,
      AGENT: 2,
      ADMIN: 3
    },
    STATUS: {
      APPLY_USER: 1,  // 用户申请
      APPLY_AGENT: 2, // 经销商申请
      APPLY_ADMIN: 3, // 管理员申请
      PASS_USER: 11, // 用户确认
      PASS_AGENT: 12, // 经销商同意
      PASS_ADMIN: 13, // 管理员同意
      REFUSE_USER: -1, // 用户拒绝
      REFUSE_AGENT: -2, // 经销商拒绝
      REFUSE_ADMIN: -3, // 管理员拒接
    }
  };
  
  // 模拟枚举 - 登陆类型
export const LoginType = {
    ADMIN: 1, // admin 超级管理员
    USER_AGENT: 2, // 服务商
    USER: 9, // 普通用户
    isThisType, // 验证 val是否存在于 LoginType中
  };
  
  // - API权限
const APIAccess = {
    ADMIN: 9, // admin
    AGENT: 4, // vender
    USER: 1, // 普通用户
  };
  
const UserStatus = {
    NOROMAL: 1,
    BAN: -1,
  };
  
  // - 订单状态
const OrderStatus = {
    INIT: 1,
    AGENT_REVIEW: 2, // 待经销商审核
    FINISH: 3, // 管理员 审核通过
    ADMIN_REVIEW: 4, // 待管理员审核
    AGENT_REFUSE: 5, // 经销商拒绝
    ADMIN_REFUSE: 6, // 管理员拒绝
    USER_CANCEL: 7, //  用户取消
  };
  
  // - 订单状态
const OrderSource = {
    CLIENT: 1,
    AGENT: 2,
  };
  
  
  
  // - 支付订单状态
const PayOrderStatus = {
    INIT: 0, // 初始
    PAY: 1, // 确认支付
    SUCCESS: 2, // 管理员审核成功
    CANCEL: 3, // 用户取消
    REFUND: 4, // 退款
    AGENT_PASS: 5, // 经销商审核完成
    AGENT_REFUSE: 6, // 经销商拒绝
    ADMIN_REFUSE: 7, // 管理员拒绝
    SYSTEM_CANCEL: 8, // 系统已取消
  };
  
  // - 订单类型
const PayOrderType = {
    DEPOSIT: 1, // 托管
    EXTEND: 2, // 扩容
  };
  
  // - 支付订单支付类型
const PayOrderPayType = {
    CNY: 1, // 人民币
    USDT: 2, // usdt
    FIL: 3, // fil
  };
  
  // - 汇率类型
const RateType = {
    NO: 1, // 不可用
    MANUAL: 2, // 手动配置
    AUTO: 3, // 自动跟踪
  };
  
const PledgeType = {
    COMPANY: 1, // 公司质押
    PERSONAL: 2, // 个人质押
  };
  
const SectorStatus = {
    INIT: 0,
    PERSONAL: 1,
    COMPANY: 2,
    LOAN: 3,
  };
  
  
const SectorTerm = {
    RATE: 0.85,
    RELEASE: 0.25,
  };
  // - 订单状态
const TransactionStatus = {
    INIT: 0,
    PAYING: 1,
    SUCCESS: 2,
    FAIL: 3,
    CLOSE: 4,
    CANCEL: 5,
    REFUND: 10,
    REFUNDING: 11,
    REFUNDFAIL: 12,
    REFUNDCLOSE: 13,
  };
  
const SnStatus = {
    UNBIND: 0, // 未绑定
    BIND: 1, // 已经绑定
  };
  
const KYCStatus = {
    PASS: 1,
    REFUSE: 2,
    INIT: 3,
    APPLY: 4
  };
  
const CertStatus = {
    INIT: 1,
    PASS: 2,
    REFUSE: 3
  };
  
const OperaLogType = {
    REGIST: {
      USER: 1,
      AGENT: 101,
    },
    LOGIN: {
      USER: 2,
      AGENT: 102,
    },
    PHONE_SAVE: {
      USER: 3,
      AGENT: 103,
    },
    USER_AGENT_APPLY: 6,
    WITHDRAW: {
      USER: 8,
      AGENT: 108,
    },
    ORDER: {
      USER: 9,
      AGENT: 109,
    },
    PASSWORD: {
      USER: 10,
      AGENT: 110,
    },
  };
  
const SMSCodeType = {
    UserLogin: 1,
    AgentLogin: 2,
    UpdatePwd: 3,
    Withdraw: 4,
    WithdrawBlock: 5,
    BalanceTransfer: 6, // 余额划转
  };
  
const LanguageHash = {
    en: 'en',
    zh: 'zh'
  };
  
const EmailType = {
    REGIST: 1, // 注册,
    WITHDRAW: 2, // 提币
    TRANSFER: 3, // 划转
  };
  
  // 海外
const UserSource = {
    INTERNAL: 1, // 国内
    OVERSEA: 2, // 海外
  };
  
const ErrorCode = {
    PARAMETER_ERROR: 10000,
    RESOURCE_NOT_FOUND: 100001,
    AUTHORIZATION_FAILED: 10004,
    No_ACCESS: 10006,
    NETWORK_ERROR: 10007,
    ACCOUNT_NOT_EXIST: 11000,
    ACCOUNT_BANNED: 11001,
    ACCOUNT_EXIST: 11002,
    ACCOUNT_NOT_BANNED: 11003,
    PASSWORD_ERROR: 11004,
    PASSWORD_ERROR_MANY: 11005,
    PASSWORD_NOT_EXIST: 11006,
    VERIFICATION_CODE_NOT_EXIST: 11007,
    VERIFICATION_CODE_ERROR: 11008,
    TEL_FORMAT_ERROR: 11009,
  
    ORDER_NOT_EXIST: 12000,
    ORDER_INVALID: 12001,
    ORDER_STATUS_ERROR: 12002,
    ORDER_NOT_BIND_SN: 12003,
    ORDER_ALREADY_REVIEW: 12004,
    ORDER_OPERATOR_OWN: 12005,
  
    NOTICE_NOT_EXIST: 13000,
  
    // 个人借贷
    BORROW_AMOUNT_ERROR: 13001,
    BORROW_FAIL: 13002,
    BORROW_NO_PERMISSION: 13003,
  
    SN_LACK: 14000,
    SN_NOT_EXIST: 14001,
    SN_ALREADY_BIND: 14002,
    SN_ALREADY_BUY: 14003,
    SN_NO_UNDEPOSIT_TO_PAY: 14004,
  
    TOTAL_POWER_MISMATCH: 15000,
    DIVIDENDS_ERROR: 15010,
  
    DEPOSIT_ERROR: 16000,
    DIVIDENDS_COIN_ERROR_COMPANY: 16001,
    DIVIDENDS_COIN_ERROR_PERSONAL: 16002,
  
    DIVIDENDS_SECTOR_ERROR: 17000,
    DIVIDENDS_SECTOR_ERROR_NO_RELEASE: 17001,
    // 新增，便于前端中英文
    EMAIL_FORMAT_INCORRECT: 17002,
    EMAIL_SAME_OLD: 17003,
    PWD_SAME_OLD: 17004,
    EMAIL_NOT_EXIST: 17005,
    NOT_ENOUGH_WITHDRAWAL: 17006,
    TRANSFER_FAIL: 17007,
    EMAIL_HAVE_USED: 17008,
  
    PAYORDER_ERROR: 18000,
  
    // 提现
    APPLY_FAIL: 18001,
    WITHDRAW_NOT_EXIST: 18002,
    APPROVAL_WITHDRAW_FAIL: 18003,
    WITHDRAW_HAVE_APPROVAL: 18004,
    COMMODITY_NOT_EXIST: 18005,
    WITHDRAW_EXIST_DEPOSIT_EXPIRED: 18006,
    PAY_ORDER_NOT_EXIST: 18007,
  
    // 划转
    EXTRCT_ACCOUNT_LIMIT: 19000,
    EXTRCT_AMOUNT_LIMIT: 19001,
    SAVE_WITHDRAWAL_TO_BANK_FAIL: 19002,
    PAY_AMOUNT_WRONG: 19003,
    EXTRCT_ACCOUNT_BLACK_LIMIT: 19004,
    EXTRCT_AMOUNT_ERROR: 19005,
    WITHDRAWAL_TO_DEPOSIT_FAIL: 19006,
    BANK_TO_WITHDRAW_FAIL: 19007,
  
    NOT_ENOUGH_USDT_WITHDRAWAL: 20000,
  
    // m12q
    NO_ORDER: 20031,
    PLEDGE_NOT_ENOUGH: 20032,
    PLEDGE_FAIL_RULE: 20033,
  
    CODE_TIMES_ERROR: 20040,
    CODE_NOT_EXIST: 20041,
    SMS_ERROR: 20042,
  
  };
  
const ErrorMessage = {
    PARAMETER_ERROR: '参数错误',
    RESOURCE_NOT_FOUND: '资源未找到',
    AUTHORIZATION_FAILED: '授权失败',
    No_ACCESS: '禁止访问',
    NETWORK_ERROR: '网络错误',
    TRANSFER_FAIL: '划转备用金失败,请联系管理员',
    NOT_ENOUGH_WITHDRAWAL: '可提现余额不足',
    SAVE_WITHDRAWAL_TO_BANK_FAIL: '划转金额到bank失败,请联系管理员',
    EMAIL_FORMAT_INCORRECT: '邮箱格式不正确',
    EMAIL_NOT_EXIST: '邮箱不存在，请先联系管理员添加',
    EMAIL_SAME_OLD: '邮箱与原邮箱相同',
    EMAIL_HAVE_USED: '邮箱已被使用',
    PWD_SAME_OLD: '密码与原密码相同',
    ACCOUNT_NOT_EXIST: '账号不存在',
    ACCOUNT_BANNED: '账号被封禁，请联系相应负责人',
    ACCOUNT_EXIST: '账号已存在',
    ACCOUNT_NOT_BANNED: '账号未被封禁',
  
    PASSWORD_ERROR: '密码错误',
    PASSWORD_ERROR_MANY: '密码错误过多，30分钟内将无法再次登录',
    PASSWORD_NOT_EXIST: '请先设置密码',
    VERIFICATION_CODE_NOT_EXIST: '请先获取验证码',
    VERIFICATION_CODE_ERROR: '验证码错误',
  
    TEL_FORMAT_ERROR: '手机号格式异样',
  
    ORDER_NOT_EXIST: '订单不存在',
    ORDER_INVALID: '订单已失效',
    ORDER_STATUS_ERROR: '订单状态错误,未在审批状态，未下单或者已付款',
    ORDER_NOT_BIND_SN: '订单信息未绑定sn码',
    ORDER_ALREADY_REVIEW: '订单已审核',
    ORDER_OPERATOR_OWN: '经销商只能操作自身的订单',
  
    NOTICE_NOT_EXIST: '公告不存在',
  
    SN_LACK: '请输入sn码',
    SN_NOT_EXIST: 'sn 码不存在',
    SN_ALREADY_BIND: 'sn 码已经被其他用户绑定',
    SN_ALREADY_BUY: '该用户已关联此sn，请换一个sn',
    SN_NO_UNDEPOSIT_TO_PAY: '没有可以托管的设备',
    PAY_AMOUNT_WRONG: '支付金额错误，请联系管理员',
    PAY_ORDER_NOT_EXIST: '支付订单不存在',
  
    DIVIDENDS_ERROR_ALREADY: '今天扇区已经分了',
    TOTAL_POWER_MISMATCH: '总存力跟用户存力总和无法匹配,无法开始分红',
    DIVIDENDS_ERROR: '请先进行冻结币释放',
    DIVIDENDS_COIN_ERROR_COMPANY: '奖励分发错误，今日公司抵押余额未分',
    DIVIDENDS_COIN_ERROR_PERSONAL: '奖励分发错误，今日个人抵押余额未分',
    SECTORS_FIRST: '请先分扇区',
    DEPOSIT_ERROR: '托管错误',
  
    EVERY_RELEASE_ERROR_ALREADY: '今天已经释放了',
  
    PAYORDER_ERROR: '支付错误，存在一笔未支付订单，请五分钟后再试',
  
    // 提现
    APPLY_FAIL: '提现申请失败，请联系管理员',
    WITHDRAW_NOT_EXIST: '提现记录不存在',
    APPROVAL_WITHDRAW_FAIL: '审批提现失败',
    WITHDRAW_HAVE_APPROVAL: '该条提现记录已经审批过',
    COMMODITY_NOT_EXIST: '商品不存在',
    WITHDRAW_EXIST_DEPOSIT_EXPIRED: '提现失败，存在设备托管逾期，请先缴纳托管费',
  
    // 划转
    EXTRCT_ACCOUNT_LIMIT: '只允许个人质押用户进行划转操作',
    EXTRCT_AMOUNT_LIMIT: '可划转金额不足',
    EXTRCT_ACCOUNT_BLACK_LIMIT: '暂停备用金到提现划转',
    EXTRCT_AMOUNT_ERROR: '划转金额错误',
    WITHDRAWAL_TO_DEPOSIT_FAIL: '暂停提现划转到备用金',
    BANK_TO_WITHDRAW_FAIL: '从bank划转到余额失败',
  
    // 分币
    AMOUNT_TOTAL_SECTOR_CAN_NOT_BE_EMPTY: '分配总金额和现有总存力不能为空',
    AMOUNT_LIST_CAN_NOT_BE_EMPTY: '金额增加列表不能为空',
    MINING_REWARD_CAN_NOT_BE_EMPTY: '挖矿奖励不能小于0',
    FREEZE_AMOUNT_CAN_NOT_BE_EMPTY: '冻结奖励不能小于0',
    PLEDGE_TYPE_ERROR: '质押类型错误',
    TODAY_ALREADY_DIVIDENDS: '今天已经分币',
    REWARDS_ALLOCATION_ERROR: '奖励分配错误',
    POWER_SECTOR_ERROR: '订单存储空间或者存力错误',
    DIVIDENDS_COIN_REWARD_RELEASE_ERROR: '分币订单解析失败',
    DIVIDENDS_COIN_ADD_MINE_RECORD_ERROR: '分币流水添加失败',
    DIVIDENDS_COIN_TOTAL_REWARD_ERROR: '分币总金额计算错误',
  
    // 释放币
    RELEASE_PARSE_ERROR: '释放记录解析失败',
    RELEASE_ADD_RECORD_ERROR: '添加释放流水记录失败',
  
    // 创建订单
    CREATE_ORDER_NO_PRODUCT: '产品不存在',
  
    // 个人借贷
    BORROW_AMOUNT_ERROR: '超过最大借币额度',
    BORROW_FAIL: '借币失败，请联系管理员',
    BORROW_NO_PERMISSION: '暂不符合借币条件',
    NOT_ENOUGH_USDT_WITHDRAWAL: 'USDT 余额不足',
  
    // m12q
    NO_ORDER: '没有相应设备',
    PLEDGE_NOT_ENOUGH: '备用金不足',
    PLEDGE_FAIL_RULE: '冻结操作失败，请联系管理员',
  
    CODE_TIMES_ERROR: '验证码次数频繁，请 5 分钟后重试',
    CODE_NOT_EXIST: '短信模板不存在',
    SMS_ERROR: '发送失败，请检查手机号/邮箱或重试',
  
  };
  
const CUSTODY_STATUS = {
    REQUIRE: 1,
    NOT_REQUIRE: 0,
  };
  
const ProfitType = {
    DIVIDENDS: 1, // 当日奖励
    WITHDRAW: 2, // FIL提取
    SECTOR_COMPANY: 3, // 公司抵押
    SECTOR_PERSONAL: 4, // 个人抵押
    RECHARGE: 5, // FIL补充
    RELEASE: 6, // 释放
    USABLE_TO_BACK: 10, // 从可用数量划转至备用数量
    AGENT_SHARE_PROFIT: 11, // 经销商分红、推荐人分红、其他保持原样
    REDUCE_COMPANY: 12, // 偿还公司质押
    PERSONAL_GAS: 13, // 个人支付的GAS费
    PLEDGE_WITHDRAW: 14, // 备用数量划转至可用数量
    REPAY: 15, // 主动归还
    COMPANY_GAS: 16, // 公司支付的GAS费
    REDUCE_GAS: 17, // 归还的GAS费
    PAY_BANK: 18, // 从可用数量划出至filFlow
    PRODUCT: 19, // 购机返还
    CHAIN_RECHARGE: 20, // USDT补充
    PAY_EXPAND_ESCROW: 21, // USDT支付
    PLEDGE_TO_FREEZE: 22, // 划转至锁定备用金
    FREEZE_TO_PLEDGE: 23, // 锁定备用数量结算
    BANK_TO_WITHDRAW: 24, // 从filFlow划入可用数量
    EXTRACT_USDT: 25, // USDT提取
    BALANCE_TRANSFER_IN: 26, // 余额划转(转入)
    BALANCE_TRANSFER_OUT: 27, // 内部转出
    FIL_PAY: 28, // FIL支付
  };
  
const REWARD_TYPE = {
    PERSONAL: 'personal',
    COMPANY: 'company',
  };
  
const DepositStatus = {
    INIT: 0, // 初始化
    HOSTING: 1, // 正在托管中
    RENEW: 2, // 即将过期
    EXPIRED: 3, // 过期
    FINISHED: 4, // 设备服务到期
  };
  
const BORROW_ENUM = {
    repayment: 1,
    borrow: 2,
    init: 3,
  };
  
const POWER_TYPE = {
    SMALL: 1,
    BIG: 2,
  };
  
const COMMODITY_STATUS = {
    NO: 1,
    YES: 2,
  };
  
const DISTRIBUTOR_TYPE = {
    NO: 1,  // 非分销商
    YES: 2, // 分销商
  };
  
const USER_PLATFORM = {
    DC: 1, // DCpool
    SX: 2, // 上轩
  };
  
export default {
    POWER_TYPE,
    WITHDRAW_STATUS,
    LoginType,
    UserStatus,
    APIAccess,
    OrderStatus,
    TransactionStatus,
    OperaLogType,
    SectorStatus,
    SnStatus,
    KYCStatus,
    DepositStatus,
    ProfitType,
    PayOrderType,
    PayOrderStatus,
    PayOrderPayType,
    PledgeType,
    SectorTerm,
    ErrorCode,
    ErrorMessage,
    CUSTODY_STATUS,
    REWARD_TYPE,
    REDIS_ENUM,
    BORROW_ENUM,
    SMSCodeType,
    PKG_STATUS,
    COMMODITY_STATUS,
    OrderSource,
    COIN_TYPE,
    EmailType,
    DISTRIBUTOR_TYPE,
    CertStatus,
    LanguageHash,
    UserSource,
    USER_PLATFORM,
    RateType,
    APPROVE_RECORD
  };
  
