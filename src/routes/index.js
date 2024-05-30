const express = require("express");
const router = express.Router();

const catalogRouter = require("./catalog");
const patientRouter = require("./patient");
const patientDataRouter = require("./patientData");
const patientVisitRouter = require("./patientVisit");
const vitalRouter = require("./vital");
const diagnosisRouter = require("./diagnosis");
const inpatientDataRouter = require("./inpatientData");
const eHospitalistRouter = require("./e-hospitalist");
const emrController = require('./e-emr.controller');
const orderController = require('./e-order.controller');
const admissionRouter = require('./admission-process.controller');
const emergencyController = require('./emergency-dashboard');
const ePrescriptionController = require("./e-prescription-data");
const patientHistoryRouter = require("./patientHistory");
const orderdashboardRouter = require('./order-dashboard.controller');
const pointOfSaleRouter = require("./pointOfSale");

router.get("/", (req, res) => res.send("Server it is work!!"));

router.use("/patientData", patientDataRouter);
router.use("/patientVisit", patientVisitRouter);
router.use("/patient", patientRouter);
router.use("/catalog", catalogRouter);
router.use("/vital", vitalRouter);
router.use("/diagnosis", diagnosisRouter);
router.use("/inPatientData", inpatientDataRouter);
router.use("/eHospitalist", eHospitalistRouter);
router.use("/admission", admissionRouter);
router.use("/e-prescription", ePrescriptionController);
router.use("/patientHistory", patientHistoryRouter);
router.use("/orderdashboard", orderdashboardRouter);
router.use("/pointOfSale", pointOfSaleRouter);
router.get("/EMRWidgetConfigSet", (req, res, next) => {
    emrController.EMRWidgetConfigSet(req, res);
});

router.delete("/EMRWidgetConfigSet(:param1)", (req, res, next) => {
    emrController.EMRWidgetConfigSetDelete(req, res);
});

router.post("/EMRWidgetConfigSet", (req, res, next) => {
    emrController.EMRWidgetConfigSetPost(req, res);
});

router.get("/WidgetFieldVHelpSet", (req, res, next) => {
    emrController.WidgetFieldVHelpSet(req, res);
});

router.get("/EMRPATFALAPPSet", (req, res, next) => {
    emrController.EMRPATFALAPPSet(req, res);
});

router.get("/WidgetInfoSet(:param1)", (req, res, next) => {
    emrController.WidgetInfoSet(req, res);
});

router.get("/WidgetFltFldPropSet(:param1,:param2)", (req, res, next) => {
    emrController.WidgetFltFldPropSet(req, res);
});

router.post("/WidgetDataSet", (req, res, next) => {
    emrController.WidgetDataSet(req, res);
});

router.post("/WidgetActionRespSet", (req, res, next) => {
    emrController.WidgetActionRespSet(req, res);
});

router.get("/loginUser", (req, res, next) => {
    emrController.loginUser(req, res);
});

router.get("/getLevelOrderHistory", (req, res, next) => {
    emergencyController.getLevelOrderHistory(req, res);
});

router.post("/changeStatus", (req, res, next) => {
    emrController.changeStatus(req, res);
});
//In patient
router.post("/InPatientList", (req, res, next) => {
    emrController.InPatientList(req, res);
});
router.get("/getWardList", (req, res, next) => {
    emrController.getWardList(req, res);
});

router.post("/getHighDependencyOfPatientList", (req, res, next) => {
    emrController.getHighDependencyOfPatientList(req, res);
});
router.post("/HighDependencyOfPatientList", (req, res, next) => {
    emrController.HighDependencyOfPatientList(req, res);
});
router.post("/getConfigTools", (req, res, next) => {
    emrController.getConfigTools(req, res);
});
router.post("/postConfigTools", (req, res, next) => {
    emrController.postConfigTools(req, res);
});
router.post("/getCountForModules", (req, res, next) => {
    emrController.getCountForModules(req, res);
});

router.post("/getCountForPhOrderModules", (req, res, next) => {
    emrController.getCountForPhOrderModules(req, res);
});

router.put("/physicianOrderSet", (req, res, next) => {
    emrController.physicianOrderSet(req, res);
});
router.get("/CancelReasonSet", (req, res, next) => {
    emrController.CancelReasonSet(req, res);
});
router.post("/createPhysicianOrder", (req, res, next) => {
    emrController.createPhysicianOrder(req, res);
});
router.post("/createMultiplePhysicianOrder", (req, res, next) => {
    emrController.createMultiplePhysicianOrder(req, res);
});
router.get("/occupationalGroupList", (req, res, next) => {
    emrController.occupationalGroupList(req, res);
});
router.post("/createProgressEntry", (req, res, next) => {
    emrController.createProgressEntry(req, res);
});
router.post("/consultationCompletion", (req, res, next) => {
    emrController.consultationCompletion(req, res);
});


router.get("/CASESET", (req, res, next) => {
    orderController.CASESET(req, res);
});

router.get("/LocalizationSet", (req, res, next) => {
    orderController.LocalizationSet(req, res);
});

router.get("/OrderSet", (req, res, next) => {
    orderController.OrderSet(req, res);
});

router.post("/OrderSet", (req, res, next) => {
    orderController.OrderSetPost(req, res);
});

router.get("/OrderConfigSet(:param1)", (req, res, next) => {
    orderController.OrderConfigSet(req, res);
});
router.post("/OrderConfigSet", (req, res, next) => {
    orderController.OrderConfigSetPost(req, res);
});

router.get("/SearchSet", (req, res, next) => {
    orderController.SearchSet(req, res);
});

router.get("/SearchMSet", (req, res, next) => {
    orderController.SearchMSet(req, res);
});

router.get("/FeeServiceSearchSet", (req, res, next) => {
    orderController.FeeServiceSearchSet(req, res);
});

router.post("/assignToMe", (req, res, next) => {
    emergencyController.assignToMe(req, res);
});

router.get("/FeesOrderSet", (req, res, next) => {
    orderController.FeesOrderSet(req, res);
});

router.get("/FeesFavouriteSet", (req, res, next) => {
    orderController.FeesFavouriteSet(req, res);
});

router.get("/ClinServiceSet", (req, res, next) => {
    orderController.ClinServiceSet(req, res);
});

router.get("/PATCASEDETSET", (req, res, next) => {
    orderController.PATCASEDETSET(req, res);
});

router.get("/FrequencySet", (req, res, next) => {
    orderController.FrequencySet(req, res);
});

router.get("/DurationUnitSet", (req, res, next) => {
    orderController.DurationUnitSet(req, res);
});

router.get("/DrugPropSet", (req, res, next) => {
    orderController.DrugPropSet(req, res);
});

router.get("/PrescriptionSet", (req, res, next) => {
    orderController.PrescriptionSet(req, res);
});
router.post("/PrescriptionSet", (req, res, next) => {
    orderController.PrescriptionSetpost(req, res);
});


router.get("/loginUser", (req, res, next) => {
    orderController.loginUser(req, res);
});

router.get("/OrderPrintSet(:param1)/$value", (req, res, next) => {
    orderController.OrderPrintSet(req, res);
});
router.get("/EmarSet", (req, res, next) => {
    orderController.EmarSet(req, res);
});

router.post("/ClinFavouriteSet", (req, res, next) => {
    orderController.ClinFavouriteSet(req, res);
});

router.delete("/ClinFavouriteSet(:param1,:param2,:param3)", (req, res, next) => {
    orderController.ClinFavouriteSetDelete(req, res);
});

router.delete("/UserTemplateSet(:param1)", (req, res, next) => {
    orderController.UserTemplateSet(req, res);
});

router.put("/UserTemplateSet(:param1)", (req, res, next) => {
    orderController.UserTemplateUpdate(req, res);
});

router.post("/FeesFavouriteSet", (req, res, next) => {
    orderController.FeesFavouriteSet(req, res);
});
router.delete("/FeesFavouriteSet(:param1,:param2,:param3)", (req, res, next) => {
    orderController.FeesFavouriteSetDelete(req, res);
});

router.post("/FeesOrderSet", (req, res, next) => {
    orderController.FeesOrderSetPost(req, res);
});


router.post("/UserFavSet", (req, res, next) => {
    orderController.UserFavSet(req, res);
});

router.delete("/UserFavSet(:param1,:param2,:param3)", (req, res, next) => {
    orderController.UserFavSetDelete(req, res);
});


// e-prescription-route
router.get("/EmarSet", (req, res, next) => {
    orderController.EmarSet(req, res);
});
router.get("/EmarEventSet", (req, res, next) => {
    orderController.EmarEventSet(req, res);
});

router.get("/EorderSet", (req, res, next) => {
    orderController.EorderSet(req, res);
});
router.post("/EorderSet", (req, res, next) => {
    orderController.EorderSetPost(req, res);
});
router.get("/PatientMedicationsSet", (req, res, next) => {
    orderController.PatientMedicationsSet(req, res);
});

router.post("/EstdordSet", (req, res, next) => {
    orderController.EstdordSetPost(req, res);
});


//emergency-dashboard
router.post("/getOrderSet", (req, res, next) => {
    emergencyController.getOrderSet(req, res);
});
router.post("/getOrderSetBySubtitles", (req, res, next) => {
    emergencyController.getOrderSetBySubtitles(req, res);
});
router.post("/createOrderSet", (req, res, next) => {
    emergencyController.createOrderSet(req, res);
});
router.get("/getFavSet", (req, res, next) => {
    emergencyController.getFavSet(req, res);
});
router.post("/getOrderSetByFavId", (req, res, next) => {
    emergencyController.getOrderSetByFavId(req, res);
});
router.post("/emergencyListSet", (req, res, next) => {
    emergencyController.emergencyListSet(req, res);
});

router.post("/emergencyListCheckInSet", (req, res, next) => {
    emergencyController.emergencyListCheckInSet(req, res);
});
router.post("/nursingLabListSet", (req, res, next) => {
    emergencyController.nursingLabListSet(req, res);
});
router.get("/nursingLabListPrintSet", (req, res, next) => {
    emergencyController.nursingLabListPrintSet(req, res);
});
router.get("/MedicationAdministrationSet", (req, res, next) => {
    emergencyController.MedicationAdministrationSet(req, res);
});
router.post("/nursingLabSampleCollectedSet", (req, res, next) => {
    emergencyController.nursingLabSampleCollectedSet(req, res);
});
router.get("/MedicationAdministrationCount", (req, res, next) => {
    emergencyController.MedicationAdministrationCount(req, res);
});
router.get("/NoConsumablesSetCount", (req, res, next) => {
    emergencyController.NoConsumablesSetCount(req, res);
});
router.get("/getCountField", (req, res, next) => {
    emergencyController.getCountField(req, res);
});
router.post("/triagePriorityList", (req, res, next) => {
    emergencyController.triagePriorityList(req, res);
});
router.post("/saveTriage", (req, res, next) => {
    emergencyController.saveTriage(req, res);
});
router.get("/patientsListSet", (req, res, next) => {
    emergencyController.patientsListSet(req, res);
});
router.post("/actionlistSet", (req, res, next) => {
    emergencyController.actionlistSet(req, res);
});
router.post("/actionPhysicianSet", (req, res, next) => {
    emergencyController.actionPhysicianSet(req, res);
});
router.post("/getRiskList", (req, res, next) => {
    emergencyController.getRiskList(req, res);
});
router.get("/getRiskValues", (req, res, next) => {
    emergencyController.getRiskValues(req, res);
});
router.post("/saveRiskList", (req, res, next) => {
    emergencyController.saveRiskList(req, res);
});
router.get("/getCancelReasons", (req, res, next) => {
    emergencyController.getCancelReasons(req, res);
});
router.get("/getAllergenValues", (req, res, next) => {
    emergencyController.getAllergenValues(req, res);
});
router.get("/getAllergenGroupValues", (req, res, next) => {
    emergencyController.getAllergenGroupValues(req, res);
});
router.get("/getAllergyCertaintyValues", (req, res, next) => {
    emergencyController.getAllergyCertaintyValues(req, res);
});
router.get("/getAllergyEvaluationValues", (req, res, next) => {
    emergencyController.getAllergyEvaluationValues(req, res);
});
router.get("/getAllergyReactionValues", (req, res, next) => {
    emergencyController.getAllergyReactionValues(req, res);
});
router.get("/getSeverityValues", (req, res, next) => {
    emergencyController.getSeverityValues(req, res);
});
router.get("/getAllergyTypeValues", (req, res, next) => {
    emergencyController.getAllergyTypeValues(req, res);
});
router.post("/getAllergyHistory", (req, res, next) => {
    emergencyController.getAllergyHistory(req, res);
});
router.post("/SaveAllergyHistory", (req, res, next) => {
    emergencyController.SaveAllergyHistory(req, res);
});
router.post("/getPatientLabHistory", (req, res, next) => {
    emergencyController.getPatientLabHistory(req, res);
});
router.post("/getPatientRadHistory", (req, res, next) => {
    emergencyController.getPatientRadHistory(req, res);
});
router.post("/getErRadPdf", (req, res, next) => {
    emergencyController.getErRadPdf(req, res);
});
router.post("/getMedCompletedHistory", (req, res, next) => {
    emergencyController.getMedCompletedHistory(req, res);
});
router.post("/getMedNotCompletedHistory", (req, res, next) => {
    emergencyController.getMedNotCompletedHistory(req, res);
});
router.post("/getVitalList", (req, res, next) => {
    emergencyController.getVitalList(req, res);
});
router.post("/getAllVitalList", (req, res, next) => {
    emergencyController.getAllVitalList(req, res);
});
router.post("/deleteVitalList", (req, res, next) => {
    emergencyController.deleteVitalList(req, res);
});
router.post("/updateVitalSigns", (req, res, next) => {
    emergencyController.updateVitalSigns(req, res);
});
router.post("/createVitalSigns", (req, res, next) => {
    emergencyController.createVitalSigns(req, res);
});
router.get("/deleteReasonsList", (req, res, next) => {
    emergencyController.deleteReasonsList(req, res);
});
router.post("/getLatestAssessment", (req, res, next) => {
    emergencyController.getLatestAssessment(req, res);
});
router.post("/getPhyAssessment", (req, res, next) => {
    emergencyController.getPhyAssessment(req, res);
});
router.post("/createPhyDoc", (req, res, next) => {
    emergencyController.createPhyDoc(req, res);
});
router.post("/updatePhyDoc", (req, res, next) => {
    emergencyController.updatePhyDoc(req, res);
});
router.post("/releasePhyDoc", (req, res, next) => {
    emergencyController.releasePhyDoc(req, res);
});
router.post("/getReleasedPdf", (req, res, next) => {
    emergencyController.getReleasedPdf(req, res);
});
router.post("/deletePhyAssessment", (req, res, next) => {
    emergencyController.deletePhyAssessment(req, res);
});
router.post("/PatientSearchSet", (req, res, next) => {
    emergencyController.PatientSearchSet(req, res);
});
router.post("/getMedLatestAssessment", (req, res, next) => {
    emergencyController.getMedLatestAssessment(req, res);
});
router.post("/getMedReportData", (req, res, next) => {
    emergencyController.getMedReportData(req, res);
});
router.post("/createMedDoc", (req, res, next) => {
    emergencyController.createMedDoc(req, res);
});
router.post("/deleteMedReport", (req, res, next) => {
    emergencyController.deleteMedReport(req, res);
});
router.post("/updateMedDoc", (req, res, next) => {
    emergencyController.updateMedDoc(req, res);
});
router.post("/releaseMedDoc", (req, res, next) => {
    emergencyController.releaseMedDoc(req, res);
});
router.post("/getMedReleasedPdf", (req, res, next) => {
    emergencyController.getMedReleasedPdf(req, res);
});
router.post("/getAnalysisDetails", (req, res, next) => {
    emergencyController.getAnalysisDetails(req, res);
});
router.get("/getErBedList", (req, res, next) => {
    emergencyController.getErBedList(req, res);
});
router.post("/SaveBedForPatient", (req, res, next) => {
    emergencyController.SaveBedForPatient(req, res);
});
router.post("/changePassword", (req, res, next) => {
    emergencyController.changePassword(req, res);
});
router.get("/physicianOrderText", (req, res, next) => {
    emrController.physicianOrderText(req, res);
});
router.get("/getMaterialSet", (req, res, next) => {
    emergencyController.getMaterialSet(req, res);
});
router.get("/getMaterialStockSet", (req, res, next) => {
    emergencyController.getMaterialStockSet(req, res);
});
router.post("/saveConsumableDataSet", (req, res, next) => {
    emergencyController.saveConsumableDataSet(req, res);
});
router.get("/getConsumablesHistory", (req, res, next) => {
    emergencyController.getConsumablesHistory(req, res);
});
router.get("/getNoConsumablesSet", (req, res, next) => {
    emergencyController.getNoConsumablesSet(req, res);
});
router.post("/getFeeServiceSearchSet", (req, res, next) => {
    emergencyController.getFeeServiceSearchSet(req, res);
});

// Nurising Emergancy Traige Model Face Pain Route
router.post("/nurEmrFaceScaleSetPost", (req, res, next) => {
    emergencyController.nurEmrFaceScaleSetPost(req, res);
});

// Nurising Emergancy Traige Model Glosgow Route
router.post("/nurEmrGlasgowScaleSetPost", (req, res, next) => {
    emergencyController.nurEmrGlasgowScaleSetPost(req, res);
});

// Nurising Emergancy Traige Model Numeric Rating Route
router.post("/nurEmrNumericScaleSetPost", (req, res, next) => {
    emergencyController.nurEmrNumericScaleSetPost(req, res);
});

// Nurising Emergancy Traige Model get Glosgow Route
router.get("/getFacePainScaleDetail", (req, res, next) => {
    emergencyController.getFacePainScaleDetail(req, res);
});

// Nurising Emergancy Traige Model get face pain Route
router.get("/getGlowgosScaleDetail", (req, res, next) => {
    emergencyController.getGlowgosScaleDetail(req, res);
});

// Nurising Emergancy Traige Model get numeric rating Route
router.get("/getNumericScaleDetail", (req, res, next) => {
    emergencyController.getNumericScaleDetail(req, res);
});

// Nurising Emergancy Save Traige Route 
router.post("/saveNurEmrTriage", (req, res, next) => {
    emergencyController.saveNurEmrTriage(req, res);
});

// When click on traige icon first this API call
router.get("/getTriageLatestDocumentSet", (req, res, next) => {
    emergencyController.getTriageLatestDocumentSet(req, res);
});

// When click on traige icon if doc status released open PDF API
router.get("/getTriagePdfUrl", (req, res, next) => {
    emergencyController.getTriagePdfUrl(req, res);
});

// When click on traige icon if doc status draft so get traige model data
router.get("/getTriageDataStatusDraft", (req, res, next) => {
    emergencyController.getTriageDataStatusDraft(req, res);
});

// GET Social Habits List
router.get("/getSocialHabitList", (req, res, next) => {
    emergencyController.getSocialHabitList(req, res);
});

// Nurising Emergancy To Calculate Alcohol Consumption
router.post("/calculateAlcoholConsumption", (req, res, next) => {
    emergencyController.calculateAlcoholConsumption(req, res);
});

// Nurising Emergancy To Post Alcohol Habit with Drink Yes
router.post("/postAlcoholHabitDrinkYes", (req, res, next) => {
    emergencyController.postAlcoholHabitDrinkYes(req, res);
});

// Nurising Emergancy To Post Tabacco Habit with Smoke Yes
router.post("/postTabaccoHabitSmokeYes", (req, res, next) => {
    emergencyController.postTabaccoHabitSmokeYes(req, res);
});

// Nurising Emergancy To Post Drugn Habit
router.post("/postDrugsHabit", (req, res, next) => {
    emergencyController.postDrugsHabit(req, res);
});

// Nurising Emergancy To Post Other Habit
router.post("/postOtherHabit", (req, res, next) => {
    emergencyController.postOtherHabit(req, res);
});

router.get("/getRoomDetails", (req, res, next) => {
    emergencyController.getRoomDetails(req, res);
});
router.get("/getEmployeeId", (req, res, next) => {
    emergencyController.getEmployeeId(req, res);
});
router.post("/saveAssignedRoom", (req, res, next) => {
    emergencyController.saveAssignedRoom(req, res);
});
router.get("/getAssignedRoom", (req, res, next) => {
    emergencyController.getAssignedRoom(req, res);
});
router.post("/getServiceHistorySet", (req, res, next) => {
    emergencyController.getServiceHistorySet(req, res);
});
router.post("/getLatestAssesmentResult", (req, res, next) => {
    emergencyController.getLatestAssesmentResult(req, res);
});
router.put("/putGlasgowScaleSet", (req, res, next) => {
    emergencyController.putGlasgowScaleSet(req, res);
});
router.put("/putFaceScaleSet", (req, res, next) => {
    emergencyController.putFaceScaleSet(req, res);
});
router.put("/putNRSScaleSet", (req, res, next) => {
    emergencyController.putNRSScaleSet(req, res);
});
router.post("/postBradenScaleSet", (req, res, next) => {
    emergencyController.postBradenScaleSet(req, res);
});
router.get("/getBradenScaleDetail", (req, res, next) => {
    emergencyController.getBradenScaleDetail(req, res);
});

router.put("/putBradenScaleSet", (req, res, next) => {
    emergencyController.putBradenScaleSet(req, res);
});

router.get("/getMissedDocsSet", (req, res, next) => {
    emergencyController.getMissedDocsSet(req, res);
});
router.get("/getMissedDocsCount", (req, res, next) => {
    emergencyController.getMissedDocsCount(req, res);
});
router.get("/getNoConsumablesCount", (req, res, next) => {
    emergencyController.getNoConsumablesCount(req, res);
});
router.get("/getTriagePatientNo", (req, res, next) => {
    emergencyController.getTriagePatientNo(req, res);
});
router.get("/getStoragelocationList", (req, res, next) => {
    emergencyController.getStoragelocationList(req, res);
});

router.get("/getSentCartRecesive", (req, res, next) => {
    emergencyController.getSentCartRecesive(req, res);
});
router.post("/addReceiveCart", (req, res, next) => {
    emergencyController.addReceiveCart(req, res);
});
router.get("/getElepsedTime", (req, res, next) => {
    emergencyController.getElepsedTime(req, res);
});
router.post("/getNurseEndsorment", (req, res, next) => {
    emergencyController.getNurseEndsorment(req, res);
});
router.post("/postOfNurseEndsorment", (req, res, next) => {
    emergencyController.postOfNurseEndsorment(req, res);
});
router.get("/getNurseEndsormentDetail", (req, res, next) => {
    emergencyController.getNurseEndsormentDetail(req, res);
});
router.get("/getSurgicalPassPortDetail", (req, res, next) => {
    emergencyController.getSurgicalPassPortDetail(req, res);
});
router.post("/updateNurseEndDetail", (req, res, next) => {
    emergencyController.updateNurseEndDetail(req, res);
});
router.delete("/deleteNurseEndDoc", (req, res, next) => {
    emergencyController.deleteNurseEndDoc(req, res);
});
router.delete("/deleteNurEmrTriage", (req, res, next) => {
    emergencyController.deleteNurEmrTriage(req, res);
});
// dialysis
router.get("/dialysisTAget", (req, res, next) => {
    emergencyController.dialysisTAget(req, res);
});

router.get("/Dialysisget", (req, res, next) => {
    emergencyController.Dialysisget(req, res);
});

router.post("/DailysisSet", (req, res, next) => {
    emergencyController.DailysisSet(req, res);
})
router.delete("/deleteSurgicalPassDoc", (req, res, next) => {
    emergencyController.deleteSurgicalPassDoc(req, res);
});
router.post("/getSurgicalPassportDoc", (req, res, next) => {
    emergencyController.getSurgicalPassportDoc(req, res);
});
router.post("/postOfSurgicalPassp", (req, res, next) => {
    emergencyController.postOfSurgicalPassp(req, res);
});
router.get("/LatestDocSet", (req, res, next) => {
    emergencyController.LatestDocSet(req, res);
});
router.get("/DailysisSet", (req, res, next) => {
    emergencyController.getDailysisSet(req, res);
})
router.post("/postOfPrdiatricWarningScale", (req, res, next) => {
    emergencyController.postOfPrdiatricWarningScale(req, res);
});
router.get("/getPediatricEarlyWarningScore", (req, res, next) => {
    emergencyController.getPediatricEarlyWarningScore(req, res);
})

router.put("/updateSurgicalPassPortDetail", (req, res, next) => {
    emergencyController.updateSurgicalPassPortDetail(req, res);
});
router.put("/copyPediatricWarningScore", (req, res, next) => {
    emergencyController.copyPediatricWarningScore(req, res);
});

// patient document pain assessment create route in nur dashboard
router.post("/savePainAssessment", (req, res, next) => {
    emergencyController.savePainAssessment(req, res);
});

// patient document pain assessment get route in nur dashboard
router.get("/getPainAssessment", (req, res, next) => {
    emergencyController.getPainAssessment(req, res);
});

// patient document pain assessment get route in nur dashboard
router.post("/getPALatestDoc", (req, res, next) => {
    emergencyController.getPALatestDoc(req, res);
});

// Pain Assessment Back Image Get
router.get("/getPABackGroundImage", (req, res, next) => {
    emergencyController.getPABackGroundImage(req, res);
});

// Pain Assessment PDF Get
router.get("/getPainAssessmentPDF", (req, res, next) => {
    emergencyController.getPainAssessmentPDF(req, res);
});

router.delete("/deletePainAssessmentDoc", (req, res, next) => {
    emergencyController.deletePainAssessmentDoc(req, res);
});

module.exports = router;

