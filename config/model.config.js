module.exports = (sequelize, DataTypes) => {
  // Register all the models in here.........

  const db = {};

  db.role = require("../modules/roles/models/role.model.js")(
    sequelize,
    DataTypes
  );
  db.user = require("../modules/users/models/user.model.js")(
    sequelize,
    DataTypes
  );
  // ===== Role & User Relationship ===== //
  db.role.hasMany(db.user, {
    foreignKey: {
      name: "role_id",
    },
  });

  db.user.belongsTo(db.role, {
    foreignKey: {
      name: "role_id",
    },
  });
  // ===== End Role & User ===== //

  db.activity = require("../modules/activities/models/activity.model.js")(
    sequelize,
    DataTypes
  );
  db.module = require("../modules/modules/models/module.model.js")(
    sequelize,
    DataTypes
  );
  db.moduleToActivity =
    require("../modules/moduleToActivity/models/moduleToActivity.model.js")(
      sequelize,
      DataTypes
    );

  // ===== Start Activity & Module Relationship ===== //

  db.activity.belongsToMany(db.module, {
    through: "module_to_activity",
    as: "modules",
    foreignKey: "activity_id",
  });
  db.module.belongsToMany(db.activity, {
    through: "module_to_activity",
    as: "activities",
    foreignKey: "module_id",
  });

  // ===== End Activity & Module Relationship ===== //

  db.systemSetting =
    require("../modules/systemSettings/models/setting.model.js")(
      sequelize,
      DataTypes
    );
  db.rolePermission =
    require("../modules/rolePermission/models/rolepermission.model.js")(
      sequelize,
      DataTypes
    );

  db.gender =
    require("../modules/genderManagement/models/genderManagement.model.js")(
      sequelize,
      DataTypes
    );

  db.profession =
    require("../modules/professionManagement/models/profession.model.js")(
      sequelize,
      DataTypes
    );

  db.merital =
    require("../modules/maritialStatus/models/maritialstatus.model.js")(
      sequelize,
      DataTypes
    );

  db.country = require("../modules/country/models/country.model.js")(
    sequelize,
    DataTypes
  );
  db.state = require("../modules/states/models/state.model.js")(
    sequelize,
    DataTypes
  );
  db.city = require("../modules/cities/models/city.model.js")(
    sequelize,
    DataTypes
  );

  // ===== Start Country & State Relationship ===== //
  db.country.hasMany(db.state, {
    foreignKey: {
      name: "country_id",
    },
  });
  db.state.belongsTo(db.country, {
    foreignKey: {
      name: "country_id",
    },
  });
  // ===== End Country & State Relationship ===== //

  // ===== Start City & State Relationship ===== //
  db.state.hasMany(db.city, {
    foreignKey: {
      name: "state_id",
    },
  });
  db.city.belongsTo(db.state, {
    foreignKey: {
      name: "state_id",
    },
  });
  // ===== End City & State Relationship ===== //

  db.uom = require("../modules/uom/models/uom.model.js")(sequelize, DataTypes);
  db.instrument =
    require("../modules/instrumentManagement/models/instrument.model.js")(
      sequelize,
      DataTypes
    );

  // ===== Start uom & instruments Relationship ===== //
  db.uom.hasMany(db.instrument, {
    foreignKey: {
      name: "unit_id",
    },
  });
  db.instrument.belongsTo(db.uom, {
    foreignKey: {
      name: "unit_id",
    },
  });
  // ===== End uom & instruments Relationship ===== //
  db.room = require("../modules/room/models/room.model.js")(
    sequelize,
    DataTypes
  );

  db.investigationGroup =
    require("../modules/investigationGroup/models/investigationGroup.model.js")(
      sequelize,
      DataTypes
    );
  db.investigationCategory =
    require("../modules/investigationCategory/models/investigationCategory.model.js")(
      sequelize,
      DataTypes
    );

  db.instrumentCategory =
    require("../modules/instrumentsCategory/models/instrumentsCategory.model.js")(
      sequelize,
      DataTypes
    );

  db.investigation =
    require("../modules/investigationManagement/models/investigation.model.js")(
      sequelize,
      DataTypes
    );
  db.investigationInstrument =
    require("../modules/investigationManagement/models/investigationInstrument.model.js")(
      sequelize,
      DataTypes
    );
  db.investigationTest =
    require("../modules/testManagement/models/testManagement.model.js")(
      sequelize,
      DataTypes
    );

  // ____________________ Start Investigation Relationship ____________ //

  // ===== Start room & Investigation Relationship ===== //
  db.room.hasMany(db.investigation, {
    foreignKey: {
      name: "room_id",
    },
  });
  db.investigation.belongsTo(db.room, {
    foreignKey: {
      name: "room_id",
    },
  });
  // ===== End room & Investigation Relationship ===== //

  // ===== Start Investigation & InvestigationGroup Relationship ===== //
  db.investigationGroup.hasMany(db.investigation, {
    foreignKey: {
      name: "investigation_group_id",
    },
  });
  db.investigation.belongsTo(db.investigationGroup, {
    foreignKey: {
      name: "investigation_group_id",
    },
  });

  // ===== End Investigation & InvestigationGroup Relationship ===== //

  // ===== Start Investigation & InvestigationCategory Relationship ===== //
  db.investigationCategory.hasMany(db.investigation, {
    foreignKey: {
      name: "investigation_category_id",
    },
  });
  db.investigation.belongsTo(db.investigationCategory, {
    foreignKey: {
      name: "investigation_category_id",
    },
  });
  // ===== End Investigation & InvestigationCategory Relationship ===== //

  // ===== Start InvestigationGroup & InvestigationCategory Relationship ===== //
  db.investigationGroup.hasMany(db.investigationCategory, {
    foreignKey: {
      name: "investigation_group_id",
    },
  });

  db.investigationCategory.belongsTo(db.investigationGroup, {
    foreignKey: {
      name: "investigation_group_id",
    },
  });
  // ===== End InvestigationGroup & InvestigationCategory Relationship ===== //

  // ===== Start InstrumentCategory & Instrument Relationship ===== //
  db.instrumentCategory.hasMany(db.instrument, {
    foreignKey: {
      name: "cat_id",
    },
  });
  db.instrument.belongsTo(db.instrumentCategory, {
    foreignKey: {
      name: "cat_id",
    },
  });

  // ===== End InstrumentCategory & Instrument Relationship ===== //

  // ===== Start Investigation & Investigation Test Relationship ===== //
  db.investigation.hasMany(db.investigationTest, {
    foreignKey: {
      name: "investigation_id",
    },
  });
  db.investigationTest.belongsTo(db.investigation, {
    foreignKey: {
      name: "investigation_id",
    },
  });

  // ===== End Investigation & Investigation Test Relationship ===== //

  // _________________ End Investigation Relationship _________________ //

  db.staticContentGroup =
    require("../modules/staticContentGroups/models/staticContentGroup.model.js")(
      sequelize,
      DataTypes
    );
  db.staticContent =
    require("../modules/staticContents/models/staticContent.model.js")(
      sequelize,
      DataTypes
    );

  // ======= Start staticContentGroups & staticContents relationships ========= //
  db.staticContentGroup.hasMany(db.staticContent, {
    foreignKey: {
      name: "static_content_group_id",
    },
  });
  db.staticContent.belongsTo(db.staticContentGroup, {
    foreignKey: {
      name: "static_content_group_id",
    },
  });

  // ======= End staticContentGroups & staticContents ========= //

  db.headType = require("../modules/headTypes/models/headType.model.js")(
    sequelize,
    DataTypes
  );
  db.accountHead =
    require("../modules/accountHeads/models/accountHead.model.js")(
      sequelize,
      DataTypes
    );
  // ======= Start accountHead & headType relationships ========= //
  db.headType.hasMany(db.accountHead, {
    foreignKey: {
      name: "head_type_id",
    },
  });
  db.accountHead.belongsTo(db.headType, {
    foreignKey: {
      name: "head_type_id",
    },
  });
  // ======= End accountHead & headType ========= //

  db.drug = require("../modules/drug/models/drug.model.js")(
    sequelize,
    DataTypes
  );
  db.drugGroup = require("../modules/drugGroup/models/drugGroup.model.js")(
    sequelize,
    DataTypes
  );

  // ===== Start Drug & DrugGroup Relationship ===== //

  db.drugGroup.hasMany(db.drug, {
    foreignKey: {
      name: "drug_group_id",
    },
  });

  db.drug.belongsTo(db.drugGroup, {
    foreignKey: {
      name: "drug_group_id",
    },
  });

  // ===== End Drug & DrugGroup ===== //

  db.headIdentifier =
    require("../modules/headIdentifier/models/headIdentifier.model.js")(
      sequelize,
      DataTypes
    );
  db.headClassification =
    require("../modules/headClassification/models/headClassification.model.js")(
      sequelize,
      DataTypes
    );

  db.headGroup = require("../modules/headGroup/models/headGroup.model")(
    sequelize,
    DataTypes
  );

  // ===== Start headIdentifier & headClassification Relationship ===== //

  db.headIdentifier.hasMany(db.headClassification, {
    foreignKey: {
      name: "identifier_id",
    },
  });

  db.headClassification.belongsTo(db.headIdentifier, {
    foreignKey: {
      name: "identifier_id",
    },
  });

  // ===== End headIdentifier & headClassification ===== //

  // ===== Start headIdentifier & headGroup Relationship ===== //
  db.headIdentifier.hasMany(db.headGroup, {
    foreignKey: {
      name: "identifier_id",
    },
  });

  db.headGroup.belongsTo(db.headIdentifier, {
    foreignKey: {
      name: "identifier_id",
    },
  });

  // ===== End headIdentifier & headGroup Relationship ===== //

  // ===== Start headClassification & headGroup Relationship ===== //
  db.headClassification.hasMany(db.headGroup, {
    foreignKey: {
      name: "classification_id",
    },
  });

  db.headGroup.belongsTo(db.headClassification, {
    foreignKey: {
      name: "classification_id",
    },
  });

  // ===== End headClassification & headGroup Relationship ===== //

  db.transectionType =
    require("../modules/transectionType/models/transectionType.model.js")(
      sequelize,
      DataTypes
    );

  db.termConditions =
    require("../modules/termsConditions/models/termsConditions.model.js")(
      sequelize,
      DataTypes
    );

  // ===== Service category start ====//
  db.ServiceCategory =
    require("../modules/serviceCategory/models/serviceCategory.model.js")(
      sequelize,
      DataTypes
    );

  db.role.hasMany(db.ServiceCategory, {
    foreignKey: {
      name: "role_id",
    },
  });
  db.ServiceCategory.belongsTo(db.role, {
    foreignKey: {
      name: "role_id",
    },
  });
  // ===== Service Category End====//

  //==== Service Category List Start====//
  db.serviceCategoryList =
    require("../modules/serviceCategoryList/models/serviceCategoryList.model.js")(
      sequelize,
      DataTypes
    );
  db.role.hasMany(db.serviceCategoryList, {
    foreignKey: {
      name: "role_id",
    },
  });
  db.serviceCategoryList.belongsTo(db.role, {
    foreignKey: { name: "role_id" },
  });

  db.ServiceCategory.hasMany(db.serviceCategoryList, {
    foreignKey: {
      name: "service_category_id",
    },
  });

  db.serviceCategoryList.belongsTo(db.ServiceCategory, {
    foreignKey: {
      name: "service_category_id",
    },
  });

  //==== Service Category List End ====//

  db.UserDetails = require("../modules/users/models/userDetails.model.js")(
    sequelize,
    DataTypes
  );

  // ===== Start UserDetails & Country Relationship ===== //

  db.country.hasMany(db.UserDetails, {
    foreignKey: {
      name: "country_id",
    },
  });

  db.UserDetails.belongsTo(db.country, {
    foreignKey: {
      name: "country_id",
    },
  });

  // ===== End  UserDetails & Country  ===== //
  // ===== Start UserDetails & State Relationship ===== //

  db.state.hasMany(db.UserDetails, {
    foreignKey: {
      name: "state_id",
    },
  });

  db.UserDetails.belongsTo(db.state, {
    foreignKey: {
      name: "state_id",
    },
  });

  // ===== End  UserDetails & State ===== //
  // ===== Start UserDetails & City Relationship ===== //

  db.city.hasMany(db.UserDetails, {
    foreignKey: {
      name: "city_id",
    },
  });

  db.UserDetails.belongsTo(db.city, {
    foreignKey: {
      name: "city_id",
    },
  });

  // ===== End  UserDetails & City ===== //

  // ===== Start UserDetails & User Relationship ===== //

  db.user.hasOne(db.UserDetails, {
    foreignKey: {
      name: "user_id",
    },
  });
  db.UserDetails.belongsTo(db.user, {
    foreignKey: {
      name: "user_id",
    },
  });

  // ===== End UserDetails & City Relationship ===== //

  db.bloodReq =
    require("../modules/serviceRequests/bloodReq/models/bloodReq.model.js")(
      sequelize,
      DataTypes
    );
  // ===== Start BloodRequest & User Relationship ===== //
  db.user.hasMany(db.bloodReq, {
    as: "assigned_donor",
    foreignKey: {
      name: "reached_donor",
    },
  });
  db.bloodReq.belongsTo(db.user, {
    as: "assigned_donor",
    foreignKey: {
      name: "reached_donor",
    },
  });

  // ===== End BloodRequest & User Relationship ===== //
  // ===== Start BloodRequest & CollectionPoint Relationship ===== //
  db.user.hasMany(db.bloodReq, {
    as: "col_point",
    foreignKey: {
      name: "collection_point",
    },
  });
  db.bloodReq.belongsTo(db.user, {
    as: "col_point",
    foreignKey: {
      name: "collection_point",
    },
  });

  // ===== End BloodRequest & CollectionPoint Relationship ===== //
  // ===== Start BloodRequest & RequestUser Relationship ===== //
  db.user.hasMany(db.bloodReq, {
    as: "req_by",
    foreignKey: {
      name: "user_id",
    },
  });
  db.bloodReq.belongsTo(db.user, {
    as: "req_by",
    foreignKey: {
      name: "user_id",
    },
  });

  // ===== End BloodRequest & RequestUser Relationship ===== //

  return db;
};
