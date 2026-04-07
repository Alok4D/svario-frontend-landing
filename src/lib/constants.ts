export const SIDEBAR_ITEMS = [
  // Shared
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    roles: ["STAFF", "CUSTOMER"],
  },

  // ===== STAFF =====
  {
    id: "schedule",
    label: "My Schedule",
    href: "/dashboard/my-schedule",
    icon: "Calendar",
    roles: ["STAFF"],
  },
  {
    id: "clients",
    label: "Clients",
    href: "/dashboard/clients",
    icon: "Users",
    roles: ["STAFF"],
  },
  {
    id: "my-report",
    label: "My Report",
    href: "/dashboard/my-report",
    icon: "FileText",
    roles: ["STAFF"],
  },
  //   {
  //     id: "earnings",
  //     label: "Earnings",
  //     href: "/dashboard/earnings",
  //     icon: "BarChart3",
  //     roles: ["STAFF"],
  //   },
  {
    id: "performance",
    label: "Performance & Ratings",
    href: "/dashboard/performance",
    icon: "TrendingUp",
    roles: ["STAFF"],
  },
  {
    id: "support",
    label: "Support",
    href: "/dashboard/support",
    icon: "AlertCircle",
    roles: ["STAFF"],
  },

  // ===== CUSTOMER =====
  {
    id: "find-stuff",
    label: "Find Staff",
    href: "/dashboard/find-staff",
    icon: "Search",
    roles: ["CUSTOMER"],
  },
  {
    id: "patient",
    label: "Patient",
    href: "/dashboard/patient",
    icon: "Calendar",
    roles: ["CUSTOMER"],
  },
  {
    id: "care-plan",
    label: "Care Plan",
    href: "/dashboard/care-plan",
    icon: "FileText",
    roles: ["CUSTOMER"],
  },
  {
    id: "shifts",
    label: "Shifts",
    href: "/dashboard/shifts",
    icon: "Users",
    roles: ["CUSTOMER"],
  },
  {
    id: "shifts-notes",
    label: "Shift Notes",
    href: "/dashboard/shift-notes",
    icon: "LuNotebookPen",
    roles: ["CUSTOMER"],
  },

  // Shared
  //   {
  //     id: "settings",
  //     label: "Settings",
  //     href: "/dashboard/settings",
  //     icon: "Settings",
  //     roles: ["CUSTOMER"],
  //     // roles: ["STAFF", "CUSTOMER"],
  //   },
  {
    id: "conversations",
    label: "Conversations",
    href: "/dashboard/conversations",
    icon: "LuMessageSquareText",
    roles: ["STAFF", "CUSTOMER"],
  },
  {
    id: "profile",
    label: "Profile",
    href: "/dashboard/profile",
    icon: "User",
    roles: ["STAFF"],
    // roles: ["STAFF", "CUSTOMER"],
  },
];

// Gender
// Expected 'MALE' | 'FEMALE' | 'NOT_PREFERRED' | 'OTHER'

export const GENDERS = [
  { id: "MALE", label: "MALE", value: "MALE" },
  { id: "FEMALE", label: "FEMALE", value: "FEMALE" },
  { id: "NOT_PREFERRED", label: "NOT_PREFERRED", value: "NOT_PREFERRED" },
  { id: "OTHER", label: "OTHER", value: "OTHER" },
];

export const WEBSITE_DETAILS = {
  SITE_NAME: "Svario.is",

  // Brand
  SITE_ONLY_NAME: "Svario.is",
  SITE_DESCRIPTION: "AI Support Hub",
  SITE_DESC:
    "Connecting support workers and providers for smarter faster care, powered by smart AI automation.",

  // Website Titles
  SITE_DASHBOARD_TITLE: "Svario.is Platform",
  SITE_DASHBOARD_SUBTITLE: "AI Support Hub",

  // Assets
  SITE_LOGO: "/logo.png",
  // SITE_FAVICON: "/favicon.ico",

  // Placeholders
  AVATAR1: "/placeholder/avatar1.jpg",
  AVATAR2: "/placeholder/avatar2.jpg",
};

export const paginationLimit = 25;
