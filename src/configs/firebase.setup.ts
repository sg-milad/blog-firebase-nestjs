import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';
import { resolve } from 'path';
let app: admin.app.App

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) {
      const filePath = resolve(__dirname, 'firebaseServiceAccountKey.json');
      const firebaseServiceAccountFile = await readFile(filePath, 'utf8');

      const serviceAccount = await JSON.parse(firebaseServiceAccountFile);
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }
  setup() {
    return app;
  }
}
