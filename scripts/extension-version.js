//익스텐션 버전 업그레이드 스크립트
import fs from 'fs';

const manifestPath = 'public/manifest.json';

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const [major, minor, patch] = manifest.version.split('.').map(Number);
const nextPatch = patch + 1;
const today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
const newVersion = `${major}.${minor}.${nextPatch}`;
const versionName = `${newVersion} (${today})`;

manifest.version = newVersion;
manifest.version_name = versionName;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
