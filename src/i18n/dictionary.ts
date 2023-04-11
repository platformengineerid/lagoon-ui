export const dictionary = {
  translations: {
    english: {
      projects: {
        title: "Projects",
        project: "Project",
        projects: "Projects",
        noProjects: "No Projects",
        noMatch: "No Projects matching",
      },
      project: {
        environments: "Environments",
        noEnvironments: "No Environments",
        production: "Production",
        type: "Type",
        cluster: "Cluster",
        active: "Active",
        standby: "Standby",
        region: "Region",
        route: "Route",
        sidebar: {
          created: "Created",
          origin: "Origin",
          copied: "Copied",
          branchesEnabled: "Branches enabled",
          prsEnabled: "Pull requests enabled",
          devEnvsInuse: "Development environments in use",
          deployTargets: "Deploy Targets",
          of: "of",
        },
      },
      environment: {
        nav: {
          overview: "Overview",
          deployments: "Deployments",
          backups: "Backups",
          tasks: "Tasks",
          problems: "Problems",
          facts: "Facts",
          insights: "Insights",
        },
        envType: "Environment Type",
        deployType: "Deployment Type",
        created: "Created",
        lastDeploy: "Last Deploy",
        source: "Source",
        routes: "Routes",
        activeRoutes: "Active Environment Routes",
        standbyRoutes: "Standby Environment Routes",
        switching :"Switching Standby Environment to Active...",
        deleteQueued: "Delete queued",
      },
      allDeployments: {
        title: "Deployments",
        project: "Project",
        environment: "Environment",
        cluster: "Cluster",
        name: "Name",
        priority: "Priority",
        created: "Created",
        status: "Status",
        duration: "Duration",
        noDeployments: "No Deployments",
        cancelled: "Cancelled",
        cancel: "Cancel",
      },
      settings: {
        title: "SSH keys",
        name: "Name",
        type: "Type",
        fingerprint: "Fingerprint",
        created: "Created",
        noKeys: "No SSH keys",
        deletingKey: "Deleting SSH Key...",
        addingKey: "Adding SSH Key...",
        delete: "Delete",
        keyName: "SSH Key Name",
        sshKey: "SSH Key",
        enterKey: "Please enter a SSH key name",
        invalidKey: "The SSH Key entered is invalid",
        add: "Add",
      },
      placeholders: {
        search: "Type to search",
        deploymentFilter: "Filter deployments...",
        sshKey:
          "Begins with 'ssh-rsa', 'ssh-ed25519', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521'",
      },
      breadcrumbs: {
        task: "Task",
        project: "Project",
        environment: "Environment",
        deployment: "Deployment",
        bulkDeployment: "Bulk Deployment",
      },
      general:{
        delete: "Delete",
        cancel: "Cancel",
        deleteConfirm: "Type the name of the {{deleteType}} to confirm.",
        deleteConfirmInfo: "This will delete all resources associated with the {{deleteType}} ",
        deleteConfirmUndone: "and cannot be undone. Make sure this is something you really want to do!"
      }
    },
    italian: {
      projects: {
        title: "Projects",
      },
      project: {
        sidebar: {},
      },
      environment: {
        nav: {},
      },
      allDeployments: {},
      settings: {},
      placeholders: {},
      breadcrumbs: {},
    },
  },
};
