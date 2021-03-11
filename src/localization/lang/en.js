/*
 * [Vuei18n feature] In vue file, you can refer from like $t('general.auth.email')
 *     - Defined in node_modules/vue-i18n/types/index.d.ts > VueI18n class
 */
const en = {
  localeLabel: "English",
  general: {
    auth: {
      welcome: "Welcome",
      signInMessage: "Sign in to your account",
      email: "Email",
      password: "Password",
      showPassword: "Show Password",
      rememberMe: "Remember Me",
      login: "Login",
      logout: "Logout",
      register: "Register",
      adminLogin: "Admin Login",
      forgotMyPassword: "I forgot my password"
    },
    user: {
      firstName: "First Name",
      lastName: "Last Name",
      fullName: "Fullname",
      profPic: "Profile Picture",
      name: "Name",
      email: "Email",
      created_at: "Created At",
      counselor: "Responsible Counselor",
      owner: "Owner"
    },
    event: {
      eventCreate: "Event Create",
      eventEdit: "Event Edit",
      eventCategory: "Event Category",
      eventName: "Event Name",
      eventParticipating: "Participating in event",
      eventOwningList: "My Event List",
      owner: "Owner",
      openTime: "Open Time",
      date: "Date",
      start: "Start",
      end: "End",
      onlineEvent: "Online Event",
      prefectures: "Prefectures",
      addressAfterCity: "Address After City",
      coverImage: "Cover Image",
      detail: "Detail",
      publicPreference: "Public Preference",
      save: "Save",
      public: "Public",
      private: "Private",
      userName: "User Name",
      userEmail: "User Email",
      appliedAt: "Applied At",
      settlementMethod: "Settlement Method",
      ccClearingStatus: "Credit Card Clearing Status",
      participantNumber: "Participant Number",
      paymentMethods: "Payment Methods",
      total: "Total",
      creditCard: "Credit Card",
      transfer: "Transfer",
      cash: "Cash",
      price: "Price",
      dateTime: "Date and Time"
    },
    eventCategories: {
      eventCategoryGroupName: "Event category group Name",
      eventCategoryName: "Event Category Name",
      price: "Price",
      updateTime: "Update Time",
      categoryEventNumber: "Category Event Number",
      displayOrder: "Display Order",
      displayToList: "Display To List",
      publicPage: "Public Page",
      edit: "Edit",
      delete: "Delete",
      create: "Event Category Create",
      name: "Event Category Name",
      group: "Event Category Group",
      invitationalEvent: "Private invitational event ",
      save:"Save",
      detail: "Detail",
      coverImage: "Cover Image"
    },
    admin: {
      adminCreate: "Admin Create",
      adminEdit: "Admin Edit",
      name: "Name",
      email: "Email",
      password: "Password",
      save: "Save",
      createdAt: "Created At",
      updatedAt: "Updated At",
      edit: "Edit",
      delete: "Delete"
    },
    sales: {
      billingList: "Billing List",
      eventCategory: "Event Category",
      eventName: "Event Name",
      owner: "Owner",
      eventDate: "Event Date",
      user: "User",
      paymentMethods: "Payment Methods",
      creditCardSettled: "Credit Card Settled",
      billingPrice: "Billing Price",
      csvDownload: "CSV Download",
      delete: "Delete",
      create: "Event Category Create",
      name: "Event Category Name",
      group: "Event Category Group",
      invitationalEvent: "Private invitational event ",
      save: "Save",
      detail: "Detail",
      coverImage: "Cover Image"
    },
    eventCategoryGroup: {
      name: "Event category group Name",
      displayOrder: "Display Order"
    },
    role: {
      role: "Role",
      admin: "Administrator",
      user: "User"
    },
    validation: {
      required: "Required",
      optional: "Optional",
      confirm: "Confirm"
    },
    demo: {
      dummyMeetings: "Dummy Meetings"
    },
    crud: {
      createNew: "Create New",
      list: "List",
      add: "Add New",
      edit: "Edit",
      update: "Update",
      change: "Change",
      delete: "Delete",
      search: "Search",
      all: "All",
      createdAt: "Created at",
      updatedAt: "Updated at",
      action: "Action"
    },
    time: {
      date: "Date",
      birthDate: "Birth Date"
    },
    nav: {
      projectName: "Itnav-Aeruba",
      grune: "Grune",
      dashboard: "Dashboard",
      users: "Users",
      events: "Event",
      big_category: "Big Category",
      middle_category: "Middle Category",
      admin: "Admin",
      billing_list: "Billing List"
    },
    placeholder: {
      email: "sample@email.com",
      firstName: "Abdul",
      lastName: "Ali",
      fullName: "Abdul Ali"
    },
    alert: {
      youSure: "Are you sure?",
      confirmDelete: "Once the item is deleted, we cannot get it back for you.",
      cancel: "No",
      confirm: "Yes"
    },
    button: {
      save: "Save",
      csvDownload: "CSV Download",
      delete: "Delete",
      edit: "Edit",
      automaticInputAddress: "Automatic Input Address",
      publicPage: "Public Page",
      details: "Details"
    },
    page: {
      userList: "User List",
      userCreate: "User Create",
      userEdit: "User Edit",
      adminList: "Admin List",
      eventList: "Event List",
      currentUser: "List of Current Users",
      currentBillingStatus: "Current Billing Status",
      eventDetails: "Event Detail",
      eventCategoryGroupList: "Event Category Group List",
      eventCategoryGroupEdit: "Event Category Group Edit",
      eventCategoryGroupCreate: "Event Category Group Create"
    },
    header: {
      events: {
        eventCategoryGroup: "Event category group",
        eventCategory: "Middle Event Category",
        eventName: "Event Name",
        owner: "Owner",
        eventDate: "Event Date",
        startTime: "Start Time"
      },
      categoryGroup: {
        name: "Event category group Name",
        displayOrder: "Display Order"
      }
    },
    form: {
      gender: "Gender",
      phone: "Phone Number",
      postCode: "Postal Code",
      address: "Address",
      profileImage: "Profile Image",
      rating: "Rating",
      review: "Review",
      introduction: "Introduction",
      carrer: "Carrer",
      other: "Other",
      residence: "Residence",
      title: "Title",
      eventOwner: "Event Owner",
      availableEvent: "Available Events",
      characterType: "Character Type",
      diagnosisResult: "Diagnostic Result",
      responsibleCounselor: "Responsible Counselor"
    },
    gender: {
      male: "Male",
      female: "Female"
    },
    appBar: {
      holdingEventList: "Holding Event List",
      ownerList: "Owner List",
      eventCategoryList: "Event Category List",
      myPage: "My Page",
      userInformation: "User Infomation",
      judgmentResult: "Judgment Result",
      appliedEvent: "Applied Event",
      hostEventList: "Host Event List",
      hostEventCreate: "Host Event Create",
      billingList: "Billing List"
    }
  }
};

export default en;
