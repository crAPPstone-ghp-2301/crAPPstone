const fs = require('fs');

const packageJson = fs.readFileSync('./package.json');
const packageLockJson = fs.readFileSync('./package-lock.json');

const { dependencies } = JSON.parse(packageJson);
const { dependencies: lockDependencies } = JSON.parse(packageLockJson);

const resolutions = {};

for (const packageName of Object.keys(lockDependencies)) {
  resolutions[packageName] = lockDependencies[packageName].version;
}

const updatedPackageJson = JSON.parse(packageJson);
updatedPackageJson.resolutions = resolutions;

fs.writeFileSync('./package.json', JSON.stringify(updatedPackageJson, null, 2));
