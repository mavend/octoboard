export class GenericAirbrakeNotifier {
  constructor(Notifier) {
    const {
      REACT_APP_AIRBRAKE_PROJECT_ID: projectId,
      REACT_APP_AIRBRAKE_PROJECT_KEY: projectKey,
      NODE_ENV: environment,
    } = process.env;

    if (projectId && projectKey) {
      this.airbrake = new Notifier({ projectId, projectKey, environment });
    } else {
      this.airbrake = {
        notify: (error) => {
          console.log("[Airbrake not configured]");
          console.error(error);
        },
      };
    }
  }

  notify(error) {
    console.log("[Notifying Airbrake]");
    this.airbrake.notify(error);
  }
}
