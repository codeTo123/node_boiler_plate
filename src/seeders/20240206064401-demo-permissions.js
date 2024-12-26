"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          permission: "Users-manage",
        },
        {
          permission: "Users-create",
        },
        {
          permission: "Users-edit",
        },
        {
          permission: "Users-delete",
        },
        {
          permission: "Auth-manage",
        },
        {
          permission: "Auth-create",
        },
        {
          permission: "Auth-edit",
        },
        {
          permission: "Auth-delete",
        },
        {
          permission: "Roles-manage",
        },
        {
          permission: "Roles-create",
        },
        {
          permission: "Roles-edit",
        },
        {
          permission: "Roles-delete",
        },
        {
          permission: "Permissions-manage",
        },
        {
          permission: "Permissions-create",
        },
        {
          permission: "Permissions-edit",
        },
        {
          permission: "Permissions-delete",
        },
        {
          permission: "Apilogs-manage",
        },
        {
          permission: "Apilogs-create",
        },
        {
          permission: "Apilogs-edit",
        },
        {
          permission: "Apilogs-delete",
        },
        {
          permission: "Tenants-delete",
        },
        {
          permission: "Subscriptions-manage",
        },
        {
          permission: "Subscriptions-create",
        },
        {
          permission: "Subscriptions-edit",
        },
        {
          permission: "Subscriptions-delete",
        },
        {
          permission: "Settings-manage",
        },
        {
          permission: "Settings-create",
        },
        {
          permission: "Settings-edit",
        },
        {
          permission: "Settings-delete",
        },
        {
          permission: "Countries-manage",
        },
        {
          permission: "Countries-create",
        },
        {
          permission: "Countries-edit",
        },
        {
          permission: "Countries-delete",
        },
        {
          permission: "CertificateTypes-create",
        },
        {
          permission: "CertificateTypes-edit",
        },
        {
          permission: "CertificateTypes-delete",
        },
        {
          permission: "CertificateTypes-manage",
        },
        {
          permission: "ParentsOccupations-create",
        },
        {
          permission: "ParentsOccupations-edit",
        },
        {
          permission: "ParentsOccupations-delete",
        },
        {
          permission: "ParentsOccupations-manage",
        },
        {
          permission: "Cities-create",
        },
        {
          permission: "Cities-edit",
        },
        {
          permission: "Cities-delete",
        },
        {
          permission: "Cities-manage",
        },
        {
          permission: "States-create",
        },
        {
          permission: "States-edit",
        },
        {
          permission: "States-delete",
        },
        {
          permission: "States-manage",
        },
        {
          permission: "AdmissionQuotas-create",
        },
        {
          permission: "AdmissionQuotas-edit",
        },
        {
          permission: "AdmissionQuotas-delete",
        },
        {
          permission: "AdmissionQuotas-manage",
        },
        {
          permission: "Banks-create",
        },
        {
          permission: "Banks-edit",
        },
        {
          permission: "Banks-delete",
        },
        {
          permission: "Banks-manage",
        },
        {
          permission: "Departments-create",
        },
        {
          permission: "Departments-edit",
        },
        {
          permission: "Departments-delete",
        },
        {
          permission: "Departments-manage",
        },
        {
          permission: "Degrees-create",
        },
        {
          permission: "Degrees-edit",
        },
        {
          permission: "Degrees-delete",
        },
        {
          permission: "Degrees-manage",
        },
        {
          permission: "ProgramTypes-create",
        },
        {
          permission: "ProgramTypes-edit",
        },
        {
          permission: "ProgramTypes-delete",
        },
        {
          permission: "ProgramTypes-manage",
        },
        {
          permission: "Programs-create",
        },
        {
          permission: "Programs-edit",
        },
        {
          permission: "Programs-delete",
        },
        {
          permission: "Programs-manage",
        },
        {
          permission: "AcademicBatches-create",
        },
        {
          permission: "AcademicBatches-edit",
        },
        {
          permission: "AcademicBatches-delete",
        },
        {
          permission: "AcademicBatches-manage",
        },
        {
          permission: "Semesters-create",
        },
        {
          permission: "Semesters-edit",
        },
        {
          permission: "Semesters-delete",
        },
        {
          permission: "Semesters-manage",
        },
        {
          permission: "Castes-create",
        },
        {
          permission: "Castes-edit",
        },
        {
          permission: "Castes-delete",
        },
        {
          permission: "Castes-manage",
        },
        {
          permission: "Qualifications-create",
        },
        {
          permission: "Qualifications-edit",
        },
        {
          permission: "Qualifications-delete",
        },
        {
          permission: "Qualifications-manage",
        },
        {
          permission: "QualificationSubjects-create",
        },
        {
          permission: "QualificationSubjects-edit",
        },
        {
          permission: "QualificationSubjects-delete",
        },
        {
          permission: "QualificationSubjects-manage",
        },
        {
          permission: "MasterCategories-create",
        },
        {
          permission: "MasterCategories-edit",
        },
        {
          permission: "MasterCategories-delete",
        },
        {
          permission: "MasterCategories-manage",
        },
        {
          permission: "ParentsOccupations-create",
        },
        {
          permission: "ParentsOccupations-edit",
        },
        {
          permission: "ParentsOccupations-delete",
        },
        {
          permission: "ParentsOccupations-manage",
        },
        {
          permission: "Districts-create",
        },
        {
          permission: "Districts-edit",
        },
        {
          permission: "Districts-delete",
        },
        {
          permission: "Districts-manage",
        },
        {
          permission: "Religions-create",
        },
        {
          permission: "Religions-edit",
        },
        {
          permission: "Religions-delete",
        },
        {
          permission: "Religions-manage",
        },
        {
          permission: "CandidateTypes-create",
        },
        {
          permission: "CandidateTypes-edit",
        },
        {
          permission: "CandidateTypes-delete",
        },
        {
          permission: "CandidateTypes-manage",
        },
        {
          permission: "Cities-create",
        },
        {
          permission: "Cities-edit",
        },
        {
          permission: "Cities-delete",
        },
        {
          permission: "Cities-manage",
        },
        {
          permission: "BoardOrUniversities-create",
        },
        {
          permission: "BoardOrUniversities-edit",
        },
        {
          permission: "BoardOrUniversities-delete",
        },
        {
          permission: "BoardOrUniversities-manage",
        },
        {
          permission: "Sections-create",
        },
        {
          permission: "Sections-edit",
        },
        {
          permission: "Sections-delete",
        },
        {
          permission: "Sections-manage",
        },
        {
          permission: "Students-create",
        },
        {
          permission: "Students-edit",
        },
        {
          permission: "Students-delete",
        },
        {
          permission: "Students-manage",
        },
        {
          permission: "SeatAllocations-create",
        },
        {
          permission: "SeatAllocations-edit",
        },
        {
          permission: "SeatAllocations-delete",
        },
        {
          permission: "SeatAllocations-manage",
        },
        {
          permission: "Fees-create",
        },
        {
          permission: "Fees-edit",
        },
        {
          permission: "Fees-delete",
        },
        {
          permission: "Fees-manage",
        },
        {
          permission: "FeesCategories-create",
        },
        {
          permission: "FeesCategories-edit",
        },
        {
          permission: "FeesCategories-delete",
        },
        {
          permission: "FeesCategories-manage",
        },
        {
          permission: "FeesHeads-create",
        },
        {
          permission: "FeesHeads-edit",
        },
        {
          permission: "FeesHeads-delete",
        },
        {
          permission: "FeesHeads-manage",
        },
        {
          permission: "Facilities-create",
        },
        {
          permission: "Facilities-edit",
        },
        {
          permission: "Facilities-delete",
        },
        {
          permission: "Facilities-manage",
        },
        {
          permission: "BatchCycles-create",
        },
        {
          permission: "BatchCycles-edit",
        },
        {
          permission: "BatchCycles-delete",
        },
        {
          permission: "BatchCycles-manage",
        },
        {
          permission: "AdmissionTypes-create",
        },
        {
          permission: "AdmissionTypes-edit",
        },
        {
          permission: "AdmissionTypes-delete",
        },
        {
          permission: "AdmissionTypes-manage",
        },
        {
          permission: "AdmissionDetails-create",
        },
        {
          permission: "AdmissionDetails-edit",
        },
        {
          permission: "AdmissionDetails-delete",
        },
        {
          permission: "AdmissionDetails-manage",
        },
        {
          permission: "MasterCategories-create",
        },
        {
          permission: "MasterCategories-edit",
        },
        {
          permission: "MasterCategories-delete",
        },
        {
          permission: "MasterCategories-manage",
        },
        {
          permission: "StudentStatus-create",
        },
        {
          permission: "StudentStatus-edit",
        },
        {
          permission: "StudentStatus-delete",
        },
        {
          permission: "StudentStatus-manage",
        },
        {
          permission: "PhysicallyChallenges-create",
        },
        {
          permission: "PhysicallyChallenges-edit",
        },
        {
          permission: "PhysicallyChallenges-delete",
        },
        {
          permission: "PhysicallyChallenges-manage",
        },
        {
          permission: "BloodGroups-create",
        },
        {
          permission: "BloodGroups-edit",
        },
        {
          permission: "BloodGroups-delete",
        },
        {
          permission: "BloodGroups-manage",
        },
        {
          permission: "EntranceExams-create",
        },
        {
          permission: "EntranceExams-edit",
        },
        {
          permission: "EntranceExams-delete",
        },
        {
          permission: "EntranceExams-manage",
        },
        {
          permission: "ParentDetails-create",
        },
        {
          permission: "ParentDetails-edit",
        },
        {
          permission: "ParentDetails-delete",
        },
        {
          permission: "ParentDetails-manage",
        },
        {
          permission: "PreviousEducations-create",
        },
        {
          permission: "PreviousEducations-edit",
        },
        {
          permission: "PreviousEducations-delete",
        },
        {
          permission: "PreviousEducations-manage",
        },
        {
          permission: "ResultTypes-create",
        },
        {
          permission: "ResultTypes-edit",
        },
        {
          permission: "ResultTypes-delete",
        },
        {
          permission: "ResultTypes-manage",
        },
        {
          permission: "EducationDetails-create",
        },
        {
          permission: "EducationDetails-edit",
        },
        {
          permission: "EducationDetails-delete",
        },
        {
          permission: "EducationDetails-manage",
        },
        {
          permission: "AddressDetails-create",
        },
        {
          permission: "AddressDetails-edit",
        },
        {
          permission: "AddressDetails-delete",
        },
        {
          permission: "AddressDetails-manage",
        },
        {
          permission: "EducationDetails-create",
        },
        {
          permission: "EducationDetails-edit",
        },
        {
          permission: "EducationDetails-delete",
        },
        {
          permission: "EducationDetails-manage",
        },
        {
          permission: "EmployeeDepartments-create",
        },
        {
          permission: "EmployeeDepartments-edit",
        },
        {
          permission: "EmployeeDepartments-delete",
        },
        {
          permission: "EmployeeDepartments-manage",
        },
        {
          permission: "EducationSubjects-create",
        },
        {
          permission: "EducationSubjects-edit",
        },
        {
          permission: "EducationSubjects-delete",
        },
        {
          permission: "EducationSubjects-manage",
        },
        {
          permission: "EducationSubjectWisePercentages-create",
        },
        {
          permission: "EducationSubjectWisePercentages-edit",
        },
        {
          permission: "EducationSubjectWisePercentages-delete",
        },
        {
          permission: "EducationSubjectWisePercentages-manage",
        },
        {
          permission: "SeatReconcileDetails-create",
        },
        {
          permission: "SeatReconcileDetails-edit",
        },
        {
          permission: "SeatReconcileDetails-delete",
        },
        {
          permission: "SeatReconcileDetails-manage",
        },
        {
          permission: "GenerateChallans-create",
        },
        {
          permission: "GenerateChallans-edit",
        },
        {
          permission: "GenerateChallans-delete",
        },
        {
          permission: "GenerateChallans-manage",
        },
        {
          permission: "FeeTemplateMappingDetails-create",
        },
        {
          permission: "FeeTemplateMappingDetails-edit",
        },
        {
          permission: "FeeTemplateMappingDetails-delete",
        },
        {
          permission: "FeeTemplateMappingDetails-manage",
        },
        {
          permission: "FeeTemplatePenalties-create",
        },
        {
          permission: "FeeTemplatePenalties-edit",
        },
        {
          permission: "FeeTemplatePenalties-delete",
        },
        {
          permission: "FeeTemplatePenalties-manage",
        },
        {
          permission: "FeeTemplateInstallments-create",
        },
        {
          permission: "FeeTemplateInstallments-edit",
        },
        {
          permission: "FeeTemplateInstallments-delete",
        },
        {
          permission: "FeeTemplateInstallments-manage",
        },
        {
          permission: "FeeTemplateCategoryWiseDetails-create",
        },
        {
          permission: "FeeTemplateCategoryWiseDetails-edit",
        },
        {
          permission: "FeeTemplateCategoryWiseDetails-delete",
        },
        {
          permission: "FeeTemplateCategoryWiseDetails-manage",
        },
        {
          permission: "FeeTemplateCategories-create",
        },
        {
          permission: "FeeTemplateCategories-edit",
        },
        {
          permission: "FeeTemplateCategories-delete",
        },
        {
          permission: "FeeTemplateCategories-manage",
        },
        {
          permission: "FeeTemplateHeads-create",
        },
        {
          permission: "FeeTemplateHeads-edit",
        },
        {
          permission: "FeeTemplateHeads-delete",
        },
        {
          permission: "FeeTemplateHeads-manage",
        },
        {
          permission: "FeeTemplates-create",
        },
        {
          permission: "FeeTemplates-edit",
        },
        {
          permission: "FeeTemplates-delete",
        },
        {
          permission: "FeeTemplates-manage",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
