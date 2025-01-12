const md5 = require("md5");
const systemConfig = require("../../config/system");

const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");
const Department = require("../../models/department.model");
const searchHelper = require("../../helpers/search");

// [GET] admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  // tìm kiếm
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.fullName = objectSearch.regex;
  }
  // end tìm kiếm

  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.Role_id,
      deleted: false,
    });
    record.role = role;
  }
  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Quản lí người dùng",
    records: records,
    keyword: objectSearch.keyword,
  });
};

// [GET] admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });
  const departments = await Department.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Thêm mới người dùng",
    roles: roles,
    departments: departments,
  });
};

// [POST] admin/accounts/create
module.exports.createPost = async (req, res) => {
  // res.json(req.body);
  try {
    const emailTontai = await Account.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (emailTontai) {
      req.flash("thatbai", " Email đã tồn tại.");
      res.redirect("back");
    } else {
      req.body.password = md5(req.body.password);

      const role = await Role.findOne({
        _id: req.body.Role_id,
        deleted: false,
      }).select("quyen");

      const { department_id, ...dataAccounts } = req.body;
      
      const newAccounts = new Account(req.body);
      await newAccounts.save();

      if (role.quyen === "doctor") {
        await Department.updateOne(
          {
            _id: department_id,
          },
          {
            $push: { doctors: { doctor_id: newAccounts._id } },
          }
        );
      }

      req.flash("thanhcong", " Thêm người dùng mới.");
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
  } catch (error) {
    req.flash("thatbai", "Lỗi khi tạo người dùng");
    res.redirect(`${prefixadmin}/accounts/create`);
  }
};

// [GET] admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const account = await Account.findOne({
      _id: id,
      deleted: false,
    }).select("-password -token");

    const role = await Role.findOne({
      _id: account.Role_id,
    }).select("title");

    res.render("admin/pages/accounts/detail.pug", {
      pageTitle: "Chi tiết người dùng",
      account: account,
      role: role,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

// [GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const account = await Account.findOne({
    _id: req.params.id,
    deleted: false,
  });
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/edit.pug", {
    pageTitle: "Chỉnh sửa người dùng",
    account: account,
    roles: roles,
  });
};

// [PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const emailTonTai = await Account.findOne({
    _id: { $ne: id }, // tìm những bản ghi có id không = id này
    email: req.body.email,
    deleted: false,
  });
  if (emailTonTai) {
    req.flash("thatbai", "Email đã tồn tại");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: id }, req.body);
    req.flash("thanhcong", "Cập nhật tài khoản thành công!");
  }

  res.redirect("back");
};

// [DELETE] admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Account.findByIdAndUpdate(id, {
      deleted: true,
    });
    req.flash("thanhcong", " Xóa người dùng thành công.");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  } catch (error) {
    req.flash("thatbai", " Xóa người dùng thất bại.");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
