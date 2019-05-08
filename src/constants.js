export const UserType = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  PERSONNEL: "PERSONNEL"
};

export const personnel_document_type = {
  GUARD_CARD: {
    id: "GUARD_CARD",
    name: "Guard Card",
    required: true,
    isMultipleAllowed: false
  },
  BATON_PERMIT: {
    id: "BATON_PERMIT",
    name: "Baton Permit",
    required: true,
    isMultipleAllowed: false
  },
  CPR_CERTIFICATE: {
    id: "CPR_CERTIFICATE",
    name: "CPR",
    required: true,
    isMultipleAllowed: false
  },
  RESUME: {
    id: "RESUME",
    name: "Resume",
    required: true,
    isMultipleAllowed: false
  },
  EXPOSED_FIREARM_PERMIT: {
    id: "EXPOSED_FIREARM_PERMIT",
    name: "Exposed Firearm Permit",
    required: false,
    isMultipleAllowed: true
  },
  CCW_PERMIT: {
    id: "CCW_PERMIT",
    name: "Exposed Firearm Permit",
    required: false,
    isMultipleAllowed: true
  },
  POST_CERTIFICATION: {
    id: "POST_CERTIFICATION",
    name: "Post Certification",
    required: false,
    isMultipleAllowed: true
  },
  DD214: {
    id: "DD214",
    name: "DD214",
    required: false,
    isMultipleAllowed: true
  },
  OTHERS: {
    id: "OTHERS",
    name: "Others",
    required: false,
    isMultipleAllowed: true
  }
};

export const personnel_application_status = {
  PENDING: {
    id: "PENDING",
    name: "Pending"
  },
  HIRED: {
    id: "HIRED",
    name: "Hired"
  },
  REJECTED: {
    id: "REJECTED",
    name: "Rejected"
  }
};
