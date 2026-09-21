interface DatabaseStatus {
  ready: boolean;
  recordCount: number;
}

interface Window {
  gurukrupan?: {
    database: {
      getStatus: () => Promise<DatabaseStatus>;
    };
  };
}
