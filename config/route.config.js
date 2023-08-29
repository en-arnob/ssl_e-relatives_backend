module.exports = (app) => {
  // Register all the route in here...........

  require("../modules/auth/routes/auth.route.js")(app);
  require("../modules/roles/routes/role.route.js")(app);
  require("../modules/users/routes/user.route.js")(app);
  require("../modules/rolePermission/routes/rolepermission.route.js")(app);

  require("../modules/activities/routes/activity.route.js")(app);
  require("../modules/modules/routes/module.route.js")(app);
  require("../modules/moduleToActivity/routes/moduleToActivity.route.js")(app);

  require("../modules/staticContentGroups/routes/staticContentGroup.route.js")(
    app
  );
  require("../modules/staticContents/routes/staticContent.route.js")(app);

  require("../modules/systemSettings/routes/setting.route.js")(app);
  require("../modules/uom/routes/uom.route.js")(app);
  require("../modules/genderManagement/routes/genderManagement.route.js")(app);
  require("../modules/instrumentManagement/routes/instrument.route.js")(app);
  require("../modules/professionManagement/routes/profession.route.js")(app);
  require("../modules/maritialStatus/routes/maritialstatus.route.js")(app);
  require("../modules/country/routes/country.route.js")(app);
  require("../modules/states/routes/state.route.js")(app);
  require("../modules/cities/routes/city.route.js")(app);
  require("../modules/room/routes/room.route.js")(app);
  require("../modules/investigationGroup/routes/investigationGroup.route.js")(
    app
  );
  require("../modules/investigationCategory/routes/investigationCategory.route.js")(
    app
  );
  require("../modules/instrumentsCategory/routes/instrumentsCategory.route.js")(
    app
  );

  require("../modules/headTypes/routes/headType.route.js")(app);
  require("../modules/accountHeads/routes/accountHead.route.js")(app);

  require("../modules/drug/routes/drug.router.js")(app);
  require("../modules/drugGroup/routes/drugGroup.route.js")(app);

  require("../modules/transectionType/routes/transectionType.route.js")(app);

  require("../modules/headIdentifier/routes/headIdentifier.route.js")(app);
  require("../modules/headClassification/routes/headClassification.route.js")(
    app
  );
  require("../modules/headGroup/routes/headGroup.route.js")(app);

  require("../modules/investigationManagement/routes/investigation.route.js")(
    app
  );
  require("../modules/testManagement/routes/testManagement.route.js")(app);
  require("../modules/termsConditions/routes/termsConditions.route.js")(app);
  require("../modules/serviceCategory/routes/serviceCategory.route.js")(app);
  require("../modules/serviceCategoryList/routes/serviceCategoryList.route.js")(
    app
  );
  require("../modules/serviceRequests/bloodReq/routes/bloodReq.route.js")(app);
  require("../modules/serviceRequests/reqByMe/routes/reqByMe.route.js")(app);
  require("../modules/serviceRequests/reqToMe/routes/reqToMe.route.js")(app);
  require("../modules/serviceRequests/collPointRequest/routes/collPointReq.route.js")(
    app
  );
  require("../modules/serviceRequests/reqForTest/routes/reqForTest.routes.js")(
    app
  );
  require("../modules/serviceRequests/history/routes/history.route.js")(app);
  require("../modules/package/routes/package.route.js")(app);
  require("../modules/serviceRequests/testReq/routes/testReq.route.js")(app);
  require("../modules/serviceRequests/diagnosisReq/routes/diagnosisReq.route.js")(
    app
  );
};
