# Running the environment

#### Running in local

1. Open the terminal / command prompt in your system
1. Clone the repo
   ```
   $ git clone https://github.com/sadanandpai/resume-builder.git
   ```
1. Install the dependencies
   ```
   $ npm install
   ```
1. Run the project
   ```
   $ npm run dev
   ```
1. Visit http://localhost:3000/ on your browser

### Optional: cloud resume storage

Local editing and device downloads do not require Firestore. Saving to the cloud and loading saved resumes require server-side Google Cloud credentials.

1. Create or choose a Google Cloud project with a Firestore database. Use a development project for local testing.
1. Create a service account with permission to read and write Firestore documents (for example, the Cloud Datastore User role), and obtain its JSON key file. The current implementation requires a service account JSON key.
1. Store the key outside this repository and the Docker build context.
1. Create `.env.local` in the repository root:

   ```dotenv
   GOOGLE_CLOUD_PROJECT=your-project-id
   GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/outside-the-repository/service-account.json
   # Optional; defaults to (default).
   FIRESTORE_DATABASE_ID=(default)
   ```

   `GOOGLE_APPLICATION_CREDENTIALS` is the path to the key file, not its JSON contents. These variables are server-only; do not prefix them with `NEXT_PUBLIC_`. `.env.local` is ignored by Git. Never commit the service account key.

1. Restart `npm run dev` after changing the environment variables.

The app stores documents in the `resume` collection, with resume data in the `json` field. No manual collection creation is needed.

To verify the setup:

1. Open the builder and select **Export → Save to cloud**. Keep the returned resume ID.
1. Open `http://localhost:3000/builder/<id>` and confirm the saved resume loads.
1. Change the resume and select **Export → Update in Cloud**, then reload the saved URL to confirm the update.
1. Select **Reset ID** in the Export menu to save a new copy on the next cloud save.

If saving or loading fails, check the development server logs, project/database IDs, key file path, and service account permissions. Missing credentials make cloud operations unavailable; they do not prevent local editing.

### Run via Docker

Prerequisite: Install [Docker](https://docs.docker.com/engine/install/) with Docker Compose.

1. Open the terminal / command prompt in your system
1. Clone the repo
   ```
   $ git clone https://github.com/sadanandpai/resume-builder.git
   ```
1. Run the below command in the terminal from within the cloned project directory

   ```
   $ docker compose up -d --build
   ```

1. Visit http://localhost:3000/ on your browser.

For cloud storage in Docker, mount the service account key from outside the repository into the container as a read-only file using a local Compose override. Set `GOOGLE_APPLICATION_CREDENTIALS` to that container path and pass `GOOGLE_CLOUD_PROJECT` and, if needed, `FIRESTORE_DATABASE_ID` to the service. A host filesystem path in `.env.local` will not work unless the key is also mounted at that path inside the container. Keep the key outside the build context because the Dockerfile copies the project into the image.

Stop the environment with `docker compose down`.
