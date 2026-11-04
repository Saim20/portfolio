# Upturn Flow — feature inventory

Live product: [flow.upturn.com.bd](https://flow.upturn.com.bd)

Flow is a multi-tenant operations platform for a company. Employees run day-to-day work from one app: tasks and projects, attendance, leave, notices, equipment requests, expense claims, payroll, stakeholders, and tickets. Managers approve requests. Admins configure the company, org structure, workflows, and finance. A separate superadmin console sits above individual companies.

Screenshots below were taken in the logged-in Upturn tenant on 5 November 2026. They show the real product, including colleague names, emails, phone numbers, and salary figures. Crop or replace those before anything goes on a public portfolio.

---

## How the app is organized

Four areas in the main sidebar:

| Area | What it is |
| --- | --- |
| Dashboard | Personal home. Widgets for attendance, tasks, projects, notices, tickets, services, and approvals. |
| Operations | Every employee service, grouped into Workflow, Services, and Operations. |
| Requests | One inbox for items waiting on the current user to approve or reject. |
| Admin | Company configuration and historical logs. Requires admin access. |

Permission is by team, across five modules. Each module is `none`, `employee`, or `admin`:

- **Base operations** — tasks, projects, attendance, leave, notices, requisitions, settlements, complaints
- **Accounts and finance** — expenses, payroll, cash flow, stakeholder billing
- **Stakeholders** — records, sales processes, services, tickets
- **HRIS** — onboarding, offboarding, employee records
- **Administration** — company settings, teams, departments, positions

---

## 1. Dashboard

A customizable home screen. Widgets can be shown, hidden, resized, and rearranged. The layout is saved per user.

Widgets in the registry:

- Attendance, with site selection and check-in
- Notices, filterable by all / unread / urgent
- Task list, ongoing and completed
- Project timeline (Gantt-style) for a chosen project
- Tickets assigned to the user
- Services shortcuts (leave, complaints, requisitions, settlement, payroll, onboarding, offboarding, HRIS)
- Requests waiting for approval, with Details / Approve / Reject on the card

The header is global: create a task, command-palette search (`Ctrl+K`), notification count, dark mode, and the account menu (My Account, Log Out). There is also a “report a problem” entry.

![Dashboard with project timeline and approval cards](screenshots/01-home-dashboard.png)

![Dashboard in customize mode, with hide controls and a services palette](screenshots/04-dashboard-customize.png)

![Account menu](screenshots/05-user-menu.png)

![Same dashboard in dark mode](screenshots/38-dashboard-dark.png)

![Phone layout: hamburger nav, check-in, and task list](screenshots/42-dashboard-mobile.png)

---

## 2. Global search

`Ctrl+K` opens a command palette. It searches operations modules, admin config, company logs, and in-app tutorials. Results are grouped (Operations, Admin Config, Tutorials). Arrow keys move the selection; Enter opens the target.

![Search palette with the operations list](screenshots/02-global-search.png)

![Filtered results for “payroll” across operations, admin, and tutorials](screenshots/03-global-search-results.png)

---

## 3. Notifications

In-app notifications for project and task activity, with an unread count in the header. The page splits **All** and **Action Items**, then All / Unread / Read. Each item has a type, a short message, a date, and a link back to the record. Mark-as-read is available. Email notifications are sent alongside this, and each person can turn categories off from their profile.

![Notification feed](screenshots/06-notifications.png)

---

## 4. Operations hub

The catalog of everything an employee can open. Search, plus filters for All / Workflow / Services / Operations. A tutorials entry on this page tracks progress through guided tours (14 tours in the product).

![Operations and services catalog](screenshots/07-operations-hub.png)

Guided tours cover tasks, projects, attendance, leave, notices, requisitions, settlements, complaints, payroll, stakeholders, tickets, onboarding, offboarding, and HRIS. Progress is remembered.

---

## 5. Tasks

Create, assign, search, filter, and complete work. Status tabs: Ongoing, Completed, Archived. Priority is low, normal, high, or urgent. A task has a title, description, start date, due date, and assignees.

Extra behavior:

- Recurring tasks (multiple instances on an interval)
- Optional link to a project and a milestone
- Comments on the task
- Mark complete, edit, delete
- Also creatable from the global “New Task” button

![Task list with priority badges](screenshots/08-tasks.png)

![Create-task form](screenshots/09-task-create-modal.png)

![Task detail with assignees and comments](screenshots/10-task-detail.png)

---

## 6. Projects and milestones

Projects have a lead, departments, a team, dates, a description, and a progress percent. Tabs: Ongoing, Completed, Drafts, Create New, Archived.

A project page includes:

- Assigned team
- Milestone list with dates, weight, and status
- A Gantt timeline (completed, in progress, not started, overdue)
- Duration and status totals
- Submit for review once every milestone is complete

Milestones have their own detail pages.

![Project list](screenshots/11-projects.png)

![Project detail, team, and completion state](screenshots/12-project-detail.png)

![Milestone timeline](screenshots/13-project-timeline.png)

---

## 7. Attendance

Check in and out against a company site. Today’s card shows hours worked and the site picker. Other tabs: Records, and Request (corrections, including a forgotten checkout).

Admin attendance adds company-wide logs:

- Today, all records, per-person statistics, and attendance requests
- Stats for hours, days, present, late, absent, and wrong location
- CSV export
- Editable cells for admins correcting a record

Sites are geofenced. Each site has coordinates, hours (fixed window or flexible), and an optional remote flag. Check-in uses device location (browser geolocation, and the native app’s geolocation plugin). A check-in outside the site can be flagged as the wrong location.

![Employee attendance for today](screenshots/14-attendance.png)

![Admin statistics across employees](screenshots/36-attendance-logs.png)

![Configured sites: office, remote, and a factory with fixed hours](screenshots/41-attendance-sites.png)

---

## 8. Leave

Apply, see balances, review history, approve team requests, and read policy.

Shown in the live tenant: sick, annual, and casual leave, each with used / allowed days for the year. The application form takes type, from, to, and a reason. Admins configure the holiday and leave calendar, and balances can be reset on a schedule.

![Leave balances and the application form](screenshots/15-leave.png)

---

## 9. Notices

Company announcements. Search by title, filter, create, and open a notice. Empty state is a first-class screen. Admins keep a notice archive. The dashboard widget surfaces unread and urgent notices.

![Notices empty state](screenshots/16-notices.png)

---

## 10. Requisitions

Request equipment or supplies from a configured inventory (categories and items, for example IT devices and office furniture).

- One-off or a dated range
- Quantity, description, file attachments
- Save as draft, then submit
- History, requests waiting on a manager, returns, and policy
- Overdue-for-return state, requester, and asset owner

![Create requisition](screenshots/17-requisition-create.png)

![Requisition history](screenshots/18-requisition-history.png)

---

## 11. Settlements (expense claims)

Employees claim reimbursements. A claim has a category, amount, description, attachments, and later an approver’s feedback. Tabs: Create, History, Requests, Policy. Status runs through approval. The live history shows approved claims with the amount, date, feedback, and receipt files.

![Approved settlement claims](screenshots/19-settlement.png)

---

## 12. Complaints

Workplace complaints with a category (abusive language, bullying, harassment, others, plus whatever an admin adds), the person the complaint is against, a description, and attachments. Anonymous mode is a toggle. Tabs: New, History, Requests, Policy. Requests land in the shared approval inbox.

![Complaint form with anonymous toggle](screenshots/20-complaint.png)

---

## 13. Payroll

Generate a payroll run, then adjust, publish, discard, or mark paid. The employee table shows base salary, adjustments, total, and status. Tabs: Pending, Published, Paid, Discarded. Search by employee. Admins also have a payroll configuration screen (salary setup separate from the run itself).

![Pending payroll run](screenshots/21-payroll.png)

---

## 14. Expenses and cash flow

Personal expenses track inflows and outflows for this month or all time: net amount, entry counts, completed vs pending. Add an expense from the same page.

Company cash flow is the admin ledger:

- Inflows, outflows, net, and entry counts
- Filters for type, status, category, payment method (cash, bank, credit card, mobile banking, check, online transfer), date range, and stakeholder
- New entry
- A cash-flow statement view
- Search

![Employee expense summary](screenshots/22-expenses.png)

![Cash flow filters and totals](screenshots/35-cash-flow.png)

---

## 15. Stakeholders, processes, and billing

Stakeholders are leads and permanent relationships (clients, partners, and custom types). The list shows type, key account manager, the sales process they are on, the current step, and status. Admins and KAMs can create a lead, edit, view, search, filter, and export CSV.

Summary counts: total, active leads, permanent, and “mine”.

**Processes** are configurable workflows. A process is sequential or independent, can allow rollback, and is a list of ordered steps. Each step can be limited to teams and can carry custom fields. Examples in the tenant: a 9-step consultancy sales process (identification through go/no-go and closure) and shorter feasibility and product sales processes.

**Services and billing** sit on top of a stakeholder:

- Reusable service templates (recurring or one-off, incoming or outgoing)
- Invoice settings: prefix, payment terms, currency, default tax
- Outgoing services generate invoices; incoming services record payments
- Line items, pro-rata when a recurring service changes mid-cycle
- Invoice and payment logs

**Tickets** are issues on a stakeholder the user handles. Status counts: pending, in progress, resolved, high priority. Create, search, filter. Admins can see every ticket. Stakeholders can also open a ticket from a public page using an access code, which emails the key account manager and the assigned teams.

![Stakeholder directory and pipeline step](screenshots/23-stakeholders.png)

![Ticket inbox](screenshots/24-tickets.png)

![Process catalog](screenshots/33-stakeholder-processes.png)

![Ordered steps on a sales process](screenshots/34-process-steps.png)

![Service template and invoice defaults](screenshots/39-service-templates.png)

---

## 16. Onboarding and device access

New employees request access. Admins approve them. Separately, the company can require admin approval before a new device is allowed to sign in, and can cap how many devices one person may use at once. The onboarding screen is the queue of pending device approvals, searchable by name, email, or designation.

There is also a self-serve onboarding submission flow (company verification, then submit) for a company joining the product.

![Device approval queue](screenshots/25-onboarding.png)

---

## 17. Offboarding

Pick an active employee and run them through offboarding. The screen lists active vs already offboarded people, with designation, department, contact, and join date, plus a detail panel for the person you select. Offboarded accounts remain available as an archive, and deleted accounts have their own admin log.

![Offboarding roster and detail panel](screenshots/26-offboarding.png)

---

## 18. HRIS (employee finder)

Searchable directory of active and offboarded employees. Columns include email, phone, department, designation, supervisor, and join date. Export to CSV. Open a person for the full record.

The signed-in user’s own profile is separate and editable in sections:

- Basic information (name, email, phone, department, designation, job status, hire date, employee ID, supervisor, salary)
- Personal information
- Education and experience
- Key performance indicators
- Performance evaluation
- Timezone
- Email preferences

![Employee directory](screenshots/27-hris.png)

![Profile sections](screenshots/37-profile.png)

Org structure that feeds HRIS is configured by admins: departments, grades, and positions.

![Departments](screenshots/32-org-structure.png)

Supervisor lineage (who reports to whom) is an advanced setting, so the directory’s supervisor column stays consistent.

---

## 19. Requests inbox

One queue for everything waiting on the current user: attendance corrections, leave, requisitions, settlements, complaints, and similar. Search by name, filter, then Details, Approve, or Reject. The same cards appear as a dashboard widget. The dashboard showed three pending items: two attendance corrections and one anonymous complaint.

![Approval inbox](screenshots/28-requests.png)

---

## 20. Admin: configuration

The admin home is another catalog, split into Company Configurations and Company Logs, with its own search.

![Configuration cards](screenshots/29-admin-hub.png)

![Log cards](screenshots/30-admin-logs.png)

**Basic settings**

- Company name, industry, country
- Device approval required, max devices per user, max users
- Company timezone (with an app default)
- Operations settings and time settings
- Departments, grades, positions

![Company basics and device security](screenshots/31-basic-settings.png)

**Advanced settings** (accordions)

- Supervisor lineage
- Attendance sites and rules
- Holiday and leave calendar
- Inventory / equipment / supplies (the catalog requisitions draw from)
- Settlement categories
- News and notice settings
- Complaint categories
- Stakeholder types
- Ticket categories

![Advanced configuration sections](screenshots/40-advanced-settings.png)

**Other configuration**

- Payroll configuration
- Teams and the permission matrix described above
- Stakeholder processes
- Data export
- Service templates and invoice settings

**Data export** writes CSV for employees, stakeholders, projects, tasks, leave, and attendance. Each export lets you pick which columns to include (for example salary, phone, site coordinates, check-in time).

---

## 21. Admin: logs

Historical and company-wide views, each with search, filters, and in several cases CSV export:

| Log | What it keeps |
| --- | --- |
| Task | Task history |
| Project | Project history |
| Attendance | Today, all records, statistics, requests |
| Leave | Leave history |
| Notice | Notice archive |
| Requisition | Requisition history |
| Complaint | Complaint archive |
| Settlement | Settlement records |
| Stakeholder | Records, plus invoices and payments |
| Tickets | All tickets, not only the ones assigned to you |
| Cash flow | Ledger and statement |
| Deleted accounts | Archived users |

---

## 22. Platform, clients, and security

These are part of the product even where a screenshot is not included above.

**Clients**

- Web app, installable as a PWA
- iOS and Android shells via Capacitor, with safe area, push notifications, and geolocation
- Responsive layout: sidebar on desktop, drawer on a phone
- Light and dark mode

**Accounts**

- Sign up, log in, email verification, forgot password, change password
- Device approval before a new device can sign in, when the company turns that on
- Session tied to an approved employee of a company

**Notifications**

- In-app feed
- Email (with per-user preferences)
- Mobile push

**Public and legal pages**

- Contact
- Privacy policy, terms of service, cookie policy
- Public stakeholder ticket page (`/public-tickets/...`) gated by an access code

**Superadmin console** (`/sa`), for the operator of the product rather than a single company:

- Companies
- Devices
- Company onboarding queue
- Countries and industries (the lists basic settings draw from)
- Teams across companies
- Superadmin users
- Sample templates (including sample requisitions)

**Quality and ops of the app itself**

- Error monitoring
- Scheduled jobs (maintenance, leave-balance reset, notification creation)
- End-to-end tests around auth and main flows
- In-app “report a problem”

---

## 23. Stack (short, for a portfolio blurb)

Next.js and React, TypeScript, Tailwind, Supabase (database, auth, storage, edge functions), TanStack Query, Capacitor for iOS and Android, a PWA service worker, Firebase Cloud Messaging, Resend for email, Leaflet for maps, a rich-text editor on long-form fields, PDF generation for documents such as payroll output, and Playwright for browser tests.

---

## Screenshot index

| File | Screen |
| --- | --- |
| [01-home-dashboard.png](screenshots/01-home-dashboard.png) | Dashboard, timeline and approvals |
| [02-global-search.png](screenshots/02-global-search.png) | Command palette |
| [03-global-search-results.png](screenshots/03-global-search-results.png) | Search results grouped by area |
| [04-dashboard-customize.png](screenshots/04-dashboard-customize.png) | Widget customize mode |
| [05-user-menu.png](screenshots/05-user-menu.png) | Account menu |
| [06-notifications.png](screenshots/06-notifications.png) | Notifications |
| [07-operations-hub.png](screenshots/07-operations-hub.png) | Operations catalog |
| [08-tasks.png](screenshots/08-tasks.png) | Task list |
| [09-task-create-modal.png](screenshots/09-task-create-modal.png) | Create task |
| [10-task-detail.png](screenshots/10-task-detail.png) | Task detail and comments |
| [11-projects.png](screenshots/11-projects.png) | Project list |
| [12-project-detail.png](screenshots/12-project-detail.png) | Project detail |
| [13-project-timeline.png](screenshots/13-project-timeline.png) | Milestone Gantt |
| [14-attendance.png](screenshots/14-attendance.png) | Attendance today |
| [15-leave.png](screenshots/15-leave.png) | Leave balances and application |
| [16-notices.png](screenshots/16-notices.png) | Notices |
| [17-requisition-create.png](screenshots/17-requisition-create.png) | Create requisition |
| [18-requisition-history.png](screenshots/18-requisition-history.png) | Requisition history |
| [19-settlement.png](screenshots/19-settlement.png) | Settlement history |
| [20-complaint.png](screenshots/20-complaint.png) | Complaint form |
| [21-payroll.png](screenshots/21-payroll.png) | Payroll run |
| [22-expenses.png](screenshots/22-expenses.png) | Expenses |
| [23-stakeholders.png](screenshots/23-stakeholders.png) | Stakeholders |
| [24-tickets.png](screenshots/24-tickets.png) | Tickets |
| [25-onboarding.png](screenshots/25-onboarding.png) | Device approval |
| [26-offboarding.png](screenshots/26-offboarding.png) | Offboarding |
| [27-hris.png](screenshots/27-hris.png) | Employee directory |
| [28-requests.png](screenshots/28-requests.png) | Approval inbox |
| [29-admin-hub.png](screenshots/29-admin-hub.png) | Admin configurations |
| [30-admin-logs.png](screenshots/30-admin-logs.png) | Admin logs |
| [31-basic-settings.png](screenshots/31-basic-settings.png) | Company and security settings |
| [32-org-structure.png](screenshots/32-org-structure.png) | Departments |
| [33-stakeholder-processes.png](screenshots/33-stakeholder-processes.png) | Process catalog |
| [34-process-steps.png](screenshots/34-process-steps.png) | Process steps |
| [35-cash-flow.png](screenshots/35-cash-flow.png) | Cash flow |
| [36-attendance-logs.png](screenshots/36-attendance-logs.png) | Attendance statistics |
| [37-profile.png](screenshots/37-profile.png) | Profile |
| [38-dashboard-dark.png](screenshots/38-dashboard-dark.png) | Dark mode |
| [39-service-templates.png](screenshots/39-service-templates.png) | Service templates and invoices |
| [40-advanced-settings.png](screenshots/40-advanced-settings.png) | Advanced settings |
| [41-attendance-sites.png](screenshots/41-attendance-sites.png) | Geofenced attendance sites |
| [42-dashboard-mobile.png](screenshots/42-dashboard-mobile.png) | Mobile dashboard |

Auth screens (login, signup, forgot password, device-approval gate) and the superadmin console were not captured. The session was already signed into the company app, and logging out would have dropped that session.
